import { generateFormattedDate } from '~/utils/utils';
import { format, parseISO } from 'date-fns';

export async function generateCalendarICS(data: { checkInDate: string, checkOutDate: string}[]) {
	const calendarTemplateStart = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'CALSCALE:GREGORIAN',
		'PRODID:-//HomeAway.com, Inc.//EN',
	].join('\r\n')

	const calendarTemplateEnd = 'END:VCALENDAR'

	const events: string[] = []
	data.map(({ checkInDate, checkOutDate }) => {
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
	})

	const parsedData = [calendarTemplateStart, events.join('\r\n'), calendarTemplateEnd].join('\r\n')
	return parsedData
}

export function combineCalendarICS(data: { checkInDate: string, checkOutDate: string}[], vrboData: string) {
	const array = vrboData.split('\r\n')
	const lastIndex = array.lastIndexOf('END:VEVENT')

	if (lastIndex === -1) throw new Error('No events found in vrbo ics')

	const events: string[] = []
	for (const { checkInDate, checkOutDate} of data) {
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

	const newArray = [...array.slice(0, lastIndex), events.join('\r\n'), ...array.slice(lastIndex + 1)]

	return newArray.join('\r\n')
}