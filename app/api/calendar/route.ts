// app/api/calendar/route.js
import { NextRequest, NextResponse } from 'next/server';
import ical from 'ical';
import { openDb } from '~/lib/db';
import { eachDayOfInterval, parseISO } from 'date-fns';
import { SITE } from '~/config';

async function getVrboCalendarDisabledDates(north: boolean, retries = 1): Promise<Date[]> {
  if (retries >= 5) throw new Error('Error while trying to get vrbo data')
  // Fetch data from the external API
  const response = await fetch(north ? SITE.NORTH_URL : SITE.SOUTH_URL);

  // Check if the response is successful
  if (!response.ok) {
    console.log(`Failed to fetch: ${response.status} ${response.statusText}, Retrying...`);
    await new Promise((resolve) => setTimeout(() => resolve(0), 3000 * retries))
    return await getVrboCalendarDisabledDates(north, retries + 1)
  }

  const data = await response.text();
  const parsedData: ical.FullCalendar = ical.parseICS(data)
  return Object.values(parsedData).flatMap(calendar => {
    if (calendar.start && calendar.end)
      return eachDayOfInterval({ start: calendar.start, end: calendar.end })
    return []
  })
}


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  try {
    const north = searchParams.get('north');

    const calendarType = !!north ? 'north' : 'south'

    const db = await openDb();
    const blockedDates = await db.all<{
      checkInDate: string;
      checkOutDate: string;
    }[]>(`SELECT checkInDate, checkOutDate FROM bookings WHERE villaType = '${calendarType}'`);

    const parsedDates = blockedDates.flatMap(dateRange => {
      const start = parseISO(dateRange.checkInDate)
      const end = parseISO(dateRange.checkOutDate)
      return eachDayOfInterval({ start, end })
    })

    const vrboData = await getVrboCalendarDisabledDates(!!north)
    const combinedDates = [...parsedDates, ...vrboData]

    return new NextResponse(JSON.stringify(combinedDates), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch calendar data' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}