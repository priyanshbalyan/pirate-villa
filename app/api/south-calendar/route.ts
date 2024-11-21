import { NextResponse } from 'next/server';
import { openDb } from '~/lib/db';
import { combineCalendarICS } from '~/utils/calendar-ics';

export const dynamic = 'force-dynamic'

async function fetchSouthVrboCalendarData() {
  const url = 'http://www.vrbo.com/icalendar/da38292e278f4d0dbb2d74b7c2f532b7.ics?nonTentative'
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
      }[]>("SELECT checkInDate, checkOutDate FROM bookings WHERE villaType = ?", ['south']),
      fetchSouthVrboCalendarData()
    ])

    const calendarICS = combineCalendarICS(bookings, vrboData)

    const id = crypto.randomUUID().slice(0, 4)

    return new NextResponse(calendarICS, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain', // Adjust based on file type
        'Content-Disposition': `attachment; filename="south-calendar-${id}.ics"`, // File name for the download
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      },
    });
  } catch (error) {
    console.error('Error while generating file:', error);
    return new NextResponse('Error while generating file', { status: 500 });
  }
}