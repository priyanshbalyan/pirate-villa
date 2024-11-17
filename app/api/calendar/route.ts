// app/api/calendar/route.js
import { NextResponse } from 'next/server';
import ical from 'ical';

// API route to fetch data from an external endpoint
export async function GET() {
  const externalApiUrl =
    'http://www.vrbo.com/icalendar/4a9db9f3e66344f985b32da8cfa5a60c.ics?nonTentative';

  try {
    // Fetch data from the external API
    const response = await fetch(externalApiUrl);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    // Parse the data (assuming it's text, e.g., an iCal file)
    const data = await response.text();
    const parsedData = ical.parseICS(data)

    // Return the fetched data as a response
    return new NextResponse(JSON.stringify(parsedData), {
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