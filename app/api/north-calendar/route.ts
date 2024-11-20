import { NextResponse } from 'next/server';
import { openDb } from '~/lib/db';
import { combineCalendarICS } from '~/utils/calendar-ics';

export const dynamic = 'force-dynamic' 

async function fetchVrboCalendarData(): Promise<string> {
  const url = 'http://www.vrbo.com/icalendar/4a9db9f3e66344f985b32da8cfa5a60c.ics?nonTentative'
  const response = await fetch(url)
  const text = await response.text()
  return text
}

export async function GET() {
  try {
    const db = await openDb();
    const bookings = await db.all<{
      checkInDate: string;
      checkOutDate: string;
    }[]>('SELECT checkInDate, checkOutDate FROM bookings WHERE villaType = ?', ['north']);

    const vrboData = await fetchVrboCalendarData()

    const calendarICS = combineCalendarICS(bookings, vrboData)

    const id = crypto.randomUUID().slice(0, 4)

    return new NextResponse(calendarICS, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain', // Adjust based on file type
        'Content-Disposition': `attachment; filename="north-calendar-${id}.ics"`, // File name for the download
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      },
    });

  } catch (error) {
    console.error('Error while generating file:', error);
    return new NextResponse('Error while generating file', { status: 500 });
  }
}