async function getUpdateCalendar(startDate: Date, endDate: Date, calendar: 'north' | 'south') {
    const response = await fetch('/api/update-calendar', {
        method: 'POST',
        body: JSON.stringify({ startDate, endDate, calendar })
    })

    const json = await response.json()
    if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.error || ('Server responded with status ' + response.status))
    }

    return json;
}

export default getUpdateCalendar