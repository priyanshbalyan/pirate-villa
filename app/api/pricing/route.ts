import { NextResponse } from 'next/server';
import { verifyToken } from '~/lib/auth';
import { openDb } from '~/lib/db';
import { Pricing } from '~/types';


export async function GET(request: Request) {
  try {
    verifyToken(request.headers)

    const db = await openDb();
    const pricing = await db.all<Pricing[]>('SELECT * FROM pricing');
    return NextResponse.json(pricing);
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}