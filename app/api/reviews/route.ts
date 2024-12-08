import { NextResponse } from 'next/server';
import { openDb } from '~/lib/db';
import { Review } from '~/types';

export async function GET(req: Request) {
  try {
    const db = await openDb();
    const reviews = await db.all<Review[]>('SELECT * FROM reviews');

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Fetch reviews error:', error);
    return NextResponse.json({ error: 'Unauthorized or server error' }, { status: 401 });
  }
}