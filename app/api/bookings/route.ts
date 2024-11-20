import { NextResponse } from 'next/server';
import { openDb } from '~/lib/db';
import { verifyToken } from '~/lib/auth';

export async function GET(req: Request) {
  const headers = req.headers;

  try {
    verifyToken(headers);

    const db = await openDb();
    const bookings = await db.all<{
      id: number;
      name: string;
      email: string;
      checkInDate: string;
      checkOutDate: string;
      villaType: string;
    }[]>('SELECT * FROM bookings');

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json({ error: 'Unauthorized or server error' }, { status: 401 });
  }
}