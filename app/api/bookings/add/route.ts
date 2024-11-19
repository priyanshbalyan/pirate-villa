import { NextResponse } from 'next/server';
import { openDb } from '~/lib/db';
import { verifyToken } from '~/lib/auth';

export async function POST(req: Request) {
  const headers = req.headers;
  const { name, email, checkInDate, checkOutDate, villaType }: 
    { name: string; email: string; checkInDate: string; checkOutDate: string; villaType: string } = await req.json();

  try {
    verifyToken(headers);

    const db = await openDb();
    await db.run(
      'INSERT INTO bookings (name, email, checkInDate, checkOutDate, villaType) VALUES (?, ?, ?, ?, ?)',
      name,
      email,
      checkInDate,
      checkOutDate,
      villaType
    );

    return NextResponse.json({ message: 'Booking added successfully' });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Unauthorized or server error' }, { status: 401 });
  }
}