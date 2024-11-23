import { NextRequest, NextResponse } from 'next/server';
import { openDb } from '~/lib/db';
import { Resend } from 'resend';
import BookingCompleteEmail from 'emails/booking-complete-email';
import { parseISO } from 'date-fns';
import { APIContracts, APIControllers } from 'authorizenet';
import { validateEmail } from '~/utils/utils';

const resend = new Resend(process.env.RESEND_API_KEY);

async function makePayment(req: NextRequest) {
  try {
    const body = await req.json();
    const { cardNumber, expirationDate, cvv, amount } = body;

    if (!cardNumber || !expirationDate || !cvv || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Merchant authentication
    const merchantAuth = new APIContracts.MerchantAuthenticationType();
    merchantAuth.setName(process.env.AUTH_NET_API_LOGIN_ID!);
    merchantAuth.setTransactionKey(process.env.AUTH_NET_TRANSACTION_KEY!);

    // Payment data
    const creditCard = new APIContracts.CreditCardType();
    creditCard.setCardNumber(cardNumber);
    creditCard.setExpirationDate(expirationDate);
    creditCard.setCardCode(cvv);

    const paymentType = new APIContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    // Transaction request
    const transactionRequest = new APIContracts.TransactionRequestType();
    transactionRequest.setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequest.setPayment(paymentType);
    transactionRequest.setAmount(amount);

    // Create request
    const createRequest = new APIContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuth);
    createRequest.setTransactionRequest(transactionRequest);

    const controller = new APIControllers.CreateTransactionController(createRequest);
    await controller.execute(() => {
      console.log('execute callback')
    });

    const apiResponse = controller.getResponse();
    const transactionResponse = apiResponse.getTransactionResponse();

    if (transactionResponse && transactionResponse.getResponseCode() === '1') {
      return NextResponse.json({ success: true, transactionId: transactionResponse.getTransId() });
    } else {
      const error = transactionResponse.getErrors()?.[0];
      return NextResponse.json(
        { error: error ? error.getErrorText() : 'Transaction failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const headers = req.headers;
  const { name, email, checkInDate, checkOutDate, villaType }:
    { name: string; email: string; checkInDate: string; checkOutDate: string; villaType: string } = await req.json();

  try {
    if (!validateEmail(email)) return NextResponse.json({ error: 'Emaili Validation Error' }, { status: 400 })
      
    const db = await openDb();
    await db.run(
      'INSERT INTO bookings (name, email, checkInDate, checkOutDate, villaType) VALUES (?, ?, ?, ?, ?)',
      name,
      email,
      checkInDate,
      checkOutDate,
      villaType
    );

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
    });

    if (error) {
      console.error('Error while sending email: ', error)
    }

    return NextResponse.json({ message: 'Booking added successfully' });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Unauthorized or server error' }, { status: 401 });
  }
}