import { NextRequest, NextResponse } from 'next/server';
import { openDb } from '~/lib/db';
import { Resend } from 'resend';
import BookingCompleteEmail from 'emails/booking-complete-email';
import { eachDayOfInterval, parseISO } from 'date-fns';
import { APIContracts, APIControllers } from 'authorizenet';
import { isDateRangeOverlappingStrings, isDevEnv, validateEmail } from '~/utils/utils';
import { SITE } from '~/config';
import { calculateTaxAndFees, getPricing } from '~/lib/price-calculations';
import { FeeAdjustment, ManualAdjustment, Pricing } from '~/types';

const resend = new Resend(process.env.RESEND_API_KEY);

type RequestBody = {
  name: string;
  email: string;
  checkInDate: string;
  checkOutDate: string;
  villaType: string;
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  amount: number;
  guests: number;
}

export async function POST(req: NextRequest) {
  const headers = req.headers;
  const data: RequestBody = await req.json();
  const {
    name,
    email,
    checkInDate,
    checkOutDate,
    villaType,
    cardName,
    cardNumber,
    expiryDate,
    cvv,
    guests
  }: RequestBody = data

  if (!validateEmail(email)) return NextResponse.json({ error: 'Email Validation Error' }, { status: 400 })
  if (!cardNumber) return NextResponse.json({ error: 'Missing required fields: Card number' }, { status: 400 });
  if (!expiryDate) return NextResponse.json({ error: 'Missing required fields: Expiration date' }, { status: 400 });
  if (!cvv) return NextResponse.json({ error: 'Missing required fields: Cvv' }, { status: 400 });
  if (!cardName) return NextResponse.json({ error: 'Missing required fields: Card Name' }, { status: 400 });
  if (!name) return NextResponse.json({ error: 'Missing required fields: Name' }, { status: 400 });
  if (!email) return NextResponse.json({ error: 'Missing required fields: Email' }, { status: 400 });
  if (!checkInDate) return NextResponse.json({ error: 'Missing required fields: Check-in Date' }, { status: 400 });
  if (!checkOutDate) return NextResponse.json({ error: 'Missing required fields: Check-out Date' }, { status: 400 });
  if (!villaType) return NextResponse.json({ error: 'Missing required fields: Villa Type' }, { status: 400 });
  if (!guests) return NextResponse.json({ error: 'Missing required fields: Guests' }, { status: 400 });

  try {
    const noOfDays = eachDayOfInterval({ start: parseISO(checkInDate), end: parseISO(checkOutDate) }).length
    if (noOfDays < SITE.MINIMUM_NIGHTS_STAY) return NextResponse.json({ error: 'No. of days is less than minimum night stays allowed' }, { status: 400 });

    const db = await openDb();
    const [pricing, manualAdjustment, feeRatesData, bookingDates] = await Promise.all([
      db.all<Pricing[]>('SELECT * FROM pricing WHERE villaType = ?', [villaType]),
      db.all<ManualAdjustment[]>('SELECT * FROM manual_adjustment WHERE villaType = ?', [villaType]),
      db.all<{ title: string; value: number; }[]>('SELECT * FROM fee_rates'),
      db.all<{ checkInDate: string; checkOutDate: string }[]>('SELECT * FROM bookings')
    ])

    if (isDateRangeOverlappingStrings(checkInDate, checkOutDate, bookingDates.map(date => ({ startDate: checkInDate, endDate: checkOutDate })))) {
      return NextResponse.json({ error: 'Booking dates conflict with existing bookings ' }, { status: 400 })
    }

    const feeAdjustments = feeRatesData.reduce((acc, cur) => {
      (acc as any)[cur.title] = cur.value;
      return acc
    }, {}) as FeeAdjustment

    const pricings = getPricing(checkInDate, checkOutDate, pricing, manualAdjustment, feeAdjustments)
    const total = calculateTaxAndFees(pricings, guests, feeAdjustments)
    const transactionResponse = await makePayment(data, total.total)
    const transId = transactionResponse.getTransactionResponse().transId

    await db.run(
      `INSERT INTO bookings (
        name, 
        email, 
        checkInDate, 
        checkOutDate, 
        villaType, 
        transactionId, 
        createdAt,
        baseRate,
        tax,
        cleaningFee,
        processingFee,
        extraGuestsFee,
        total,
        extraGuests,
        nights
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      name,
      email,
      checkInDate,
      checkOutDate,
      villaType,
      transId,
      new Date().toISOString(),
      total.baseRate,
      total.tax,
      total.cleaningFee,
      total.processingFee,
      total.extraGuestsFee,
      total,
      total.extraGuests,
      total.nights
    );

    if (!isDevEnv) {
      await sendEmail(email, name, checkInDate, checkOutDate, villaType)
    }

    return NextResponse.json({ message: 'Booking added successfully', transactionId: transId });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function sendEmail(email: string, name: string, checkInDate: string, checkOutDate: string, villaType: string) {
  const { data, error } = await resend.emails.send({
    from: 'Pirate\'s Landing <booking@pirateslandingvi.com>',
    to: [email],
    subject: 'Booking complete',
    react: BookingCompleteEmail({
      name,
      email,
      checkInDate: parseISO(checkInDate).toDateString(),
      checkOutDate: parseISO(checkOutDate).toDateString(),
      property: villaType === 'north' ? 'North' : 'South'
    }),
    cc: [SITE.NOTIFY_EMAIL]
  });

  if (error) {
    console.error('Error while sending email: ', error)
  }

}

async function makePayment(data: RequestBody, amount: number): Promise<APIContracts.CreateTransactionResponse> {
  try {
    const {
      name,
      email,
      cardNumber,
      expiryDate,
      cvv,
    } = data


    // Merchant authentication
    const merchantAuth = new APIContracts.MerchantAuthenticationType();
    merchantAuth.setName(process.env.AUTH_NET_API_LOGIN_ID!);
    merchantAuth.setTransactionKey(process.env.AUTH_NET_TRANSACTION_KEY!);

    // Payment data
    const creditCard = new APIContracts.CreditCardType();
    creditCard.setCardNumber(cardNumber);
    creditCard.setExpirationDate(expiryDate);
    creditCard.setCardCode(cvv);

    const paymentType = new APIContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    const billTo = new APIContracts.CustomerAddressType();
    billTo.setFirstName(name);
    billTo.setEmail(email)

    const orderDetails = new APIContracts.OrderType();
    orderDetails.setDescription('Property rental booking')

    // Transaction request
    const transactionRequest = new APIContracts.TransactionRequestType();
    transactionRequest.setTransactionType(APIContracts.TransactionTypeEnum.AUTHONLYTRANSACTION);
    transactionRequest.setPayment(paymentType);
    transactionRequest.setAmount(amount);
    transactionRequest.setBillTo(billTo)
    transactionRequest.setOrder(orderDetails)

    // Create request
    const createRequest = new APIContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuth);
    createRequest.setTransactionRequest(transactionRequest);

    const controller = new APIControllers.CreateTransactionController(createRequest.getJSON());

    return await new Promise((resolve, reject) => {
      controller.execute(() => {
        const apiResponse = controller.getResponse();
        const transactionResponse = new APIContracts.CreateTransactionResponse(apiResponse);

        if (transactionResponse && transactionResponse.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
          return resolve(transactionResponse);
        } else {
          let errorMessage = ''
          if (transactionResponse.getTransactionResponse() != null && transactionResponse.getTransactionResponse().getErrors() != null) {
            errorMessage = transactionResponse.getTransactionResponse()?.getErrors()?.getError()?.[0]?.getErrorText();
          } else {
            errorMessage = transactionResponse.getMessages()?.getMessage()?.[0]?.getText()
          }
          return reject(new Error(`Transaction failed: ${errorMessage}`))
        }
      });
    })
  } catch (error) {
    console.error('Payment error:', error);
    throw new Error('Payment error: ' + error)
  }
}