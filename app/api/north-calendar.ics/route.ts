import { NextResponse } from 'next/server';
import { openDb } from '~/lib/db';
import { combineCalendarICS } from '~/utils/calendar-ics';

export const dynamic = 'force-dynamic'

async function fetchNorthVrboCalendarData(retries = 1): Promise<string> {
  if (retries >= 5) throw new Error('Error while trying to get vrbo data')
  const url = 'http://www.vrbo.com/icalendar/4a9db9f3e66344f985b32da8cfa5a60c.ics?nonTentative'
  const response = await fetch(url, { cache: 'no-store' })

  if (!response.ok) {
    console.log('Got non 200 response from vrbo, Retrying...')
    await new Promise((resolve) => setTimeout(() => resolve(0), 3000 * retries))
    return await fetchNorthVrboCalendarData(retries + 1)
  }

  const text = await response.text()
  return text
}

export async function GET() {
  try {
    const db = await openDb();
    const [bookings, vrboData] = await Promise.all([db.all<{
      checkInDate: string;
      checkOutDate: string;
    }[]>('SELECT checkInDate, checkOutDate FROM bookings WHERE villaType = ?', ['north']),
    fetchNorthVrboCalendarData()
    ])

    const calendarICS = combineCalendarICS(bookings, vrboData)

    const id = crypto.randomUUID()

    return new NextResponse(calendarICS, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar;charset=UTF-8', // Adjust based on file type
        'Content-Disposition': `attachment; filename="north-calendar-${id}.ics"`, // File name for the download
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      },
    });

  } catch (error) {
    console.error('Error while generating file:', error);
    return new NextResponse('Error while generating file', { status: 500 });
  }
}