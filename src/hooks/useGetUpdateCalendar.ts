import { useQuery } from "@tanstack/react-query"

async function getUpdateCalendar(startDate: Date, endDate: Date) {
    const response = await fetch('/api/update-calendar', {
        method: 'POST',
        body: JSON.stringify({ startDate, endDate })
    })

    return await response.json();
}

export default getUpdateCalendar