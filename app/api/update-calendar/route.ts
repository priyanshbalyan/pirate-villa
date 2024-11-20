import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { format, isValid, parseISO } from 'date-fns';
import { generateFormattedDate } from '~/utils/utils';


export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { startDate, endDate, calendar } = body;
    
    // Validate the request body
    if (!['north', 'south'].includes(calendar)) {
      return NextResponse.json(
        { error: 'calendar type should be provided' },
        { status: 400 }
      );
    }
    if (!isValid(parseISO(startDate)) || !isValid(parseISO(endDate))) {
      return NextResponse.json(
        { error: 'Dates must be provided' },
        { status: 400 }
      );
    }

    const calendarFilePath = path.resolve(`./public/${calendar}-calendar.ics`); // Path to save the .ics file

    const startDateParam = format(startDate, 'yyyyMMdd')
    const endDateParam = format(endDate, 'yyyyMMdd')
    const data = fs.readFileSync(calendarFilePath).toString()
    const array = data.split('\r\n')
    const lastEventIndex = array.lastIndexOf('END:VEVENT')
    const newData = [
        'BEGIN:VEVENT',
        'UID:' + crypto.randomUUID(),
        'DTSTAMP:' + generateFormattedDate(new Date()),
        'DTSTART;VALUE=DATE:' + startDateParam,
        'DTEND;VALUE=DATE:' + endDateParam,
        'SUMMARY:Blocked',
        'END:VEVENT',
    ]

    array.splice(lastEventIndex + 1, 0, newData.join('\r\n'))
    fs.writeFileSync(calendarFilePath, array.join('\r\n'))

    return NextResponse.json({ message: 'Calendar updated successfully.' }, { status: 200 });
  } catch (err) {
    console.error('Error handling request:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}