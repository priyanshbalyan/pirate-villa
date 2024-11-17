import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { format, isDate, isValid, parseISO } from 'date-fns';

const calendarFilePath = path.resolve('./public/calendar.ics'); // Path to save the .ics file

const generateFormattedDate = (date: Date) => {
    // Format the date as YYYYMMDDTHHmmssZ
    const formattedDate = format(date, "yyyyMMdd'T'HHmmss'Z'");
    return formattedDate;
  };

  
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { startDate, endDate } = body;
    
    // Validate the request body
    if (!isValid(parseISO(startDate)) || !isValid(parseISO(endDate))) {
      return NextResponse.json(
        { error: '"Dates must be provided' },
        { status: 400 }
      );
    }

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