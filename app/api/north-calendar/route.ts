import { NextResponse } from 'next/server';
import { openDb } from '~/lib/db';
import { combineCalendarICS, generateCalendarICS } from '~/utils/calendar-ics';

async function fetchVrboCalendarData(): Promise<string> {
  const url = 'http://www.vrbo.com/icalendar/4a9db9f3e66344f985b32da8cfa5a60c.ics?nonTentative'
  const response = await fetch(url)
  const text = await response.text()
  return text
}

export async function GET() {
  try {
    const db = await openDb();

    const [bookings, vrboData] = await Promise.all([
      db.all<{
        checkInDate: string;
        checkOutDate: string;
      }[]>("SELECT checkInDate, checkOutDate FROM bookings WHERE villaType = ?", ['north']),
      fetchVrboCalendarData()
    ])

    const calendarICS = combineCalendarICS(bookings, vrboData)

    return new NextResponse(JSON.stringify({ bookings, vrboData, calendarICS}), {
      status: 200,
      headers: {
        'Content-Type': 'text/plain', // Adjust based on file type
        'Content-Disposition': 'attachment; filename="north-calendar.ics"', // File name for the download
      },
    });

  } catch (error) {
    console.error('Error while generating file:', error);
    return new NextResponse('Error while generating file', { status: 500 });
  }
}