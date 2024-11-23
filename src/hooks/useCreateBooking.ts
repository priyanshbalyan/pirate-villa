import { startOfDay } from "date-fns";
import { CreditCardData } from "~/components/atoms/CreditCardPaymentForm";

async function createBooking(
    name: string,
    email: string,
    guests: number,
    startDate: Date,
    endDate: Date,
    villaType: 'north' | 'south',
    creditCardData: CreditCardData
) {
    const response = await fetch('/api/bookings/add',
        {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                guests,
                checkInDate: startOfDay(startDate).toISOString(),
                checkOutDate: startOfDay(endDate).toISOString(),
                villaType,
                cardNumber: creditCardData.cardNumber,
                cardName: creditCardData.cardName,
                cvv: creditCardData.cvv,
                expiryDate: creditCardData.expiryDate
            })
        })

    const json = await response.json()
    if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.error || ('Server responded with status ' + response.status))
    }

    return json;
}

export default createBooking