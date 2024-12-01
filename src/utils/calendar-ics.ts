import { generateFormattedDate } from '~/utils/utils';
import { format, parseISO } from 'date-fns';

export function combineCalendarICS(data: { checkInDate: string, checkOutDate: string }[], vrboData: string) {
	const array = vrboData.split('\r\n')
	const lastIndex = array.lastIndexOf('END:VEVENT')

	if (lastIndex === -1) throw new Error('No events found in vrbo ics')

	const events: string[] = []
	for (const { checkInDate, checkOutDate } of data) {
		const startDateParam = format(parseISO(checkInDate), 'yyyyMMdd')
		const endDateParam = format(parseISO(checkOutDate), 'yyyyMMdd')

		const newData = [
			'BEGIN:VEVENT',
			'UID:' + crypto.randomUUID(),
			'DTSTAMP:' + generateFormattedDate(new Date()),
			'DTSTART;VALUE=DATE:' + startDateParam,
			'DTEND;VALUE=DATE:' + endDateParam,
			'SUMMARY:Blocked',
			'END:VEVENT',
		]

		events.push(newData.join('\r\n'))
	}

	const newArray = [...array.slice(0, lastIndex + 1), events.join('\r\n'), ...array.slice(lastIndex + 1)].filter(Boolean)
	return newArray.join('\r\n')
}