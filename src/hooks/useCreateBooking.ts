import { startOfDay } from "date-fns";

async function createBooking(name: string, email: string, guests: number, startDate: Date, endDate: Date, villaType: 'north' | 'south') {
    const response = await fetch('/api/bookings/add', {
        method: 'POST',
        body: JSON.stringify({ name, email, guests, checkInDate: startOfDay(startDate).toISOString(), checkOutDate: startOfDay(endDate).toISOString(), villaType })
    })

    const json = await response.json()
    if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.error || ('Server responded with status ' + response.status))
    }

    return json;
}

export default createBooking