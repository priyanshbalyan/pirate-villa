// app/api/calendar/route.js
import { NextRequest, NextResponse } from 'next/server';
import ical from 'ical';
import fs from 'fs';
import { openDb } from '~/lib/db';
import { eachDayOfInterval, parseISO } from 'date-fns';

const externalApiUrl =
  'http://www.vrbo.com/icalendar/4a9db9f3e66344f985b32da8cfa5a60c.ics?nonTentative';

async function getData() {
  // Fetch data from the external API
  const response = await fetch(externalApiUrl);

  // Check if the response is successful
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }

  // Parse the data (assuming it's text, e.g., an iCal file)
  const data = await response.text();
  const parsedData = ical.parseICS(data)
  return parsedData
}


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  try {
    const north = searchParams.get('north');

    const calendarType = !!north ? 'north' : 'south'
    // const icsData = fs.readFileSync(`./public/${calendarType}-calendar.ics`).toString()

    // const parsedData = ical.parseICS(icsData)

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

    // Return the fetched data as a response
    return new NextResponse(JSON.stringify(parsedDates), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }, // Adjust as needed
    });
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch calendar data' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}