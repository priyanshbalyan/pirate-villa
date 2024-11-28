import { NextResponse } from 'next/server';
import { verifyToken } from '~/lib/auth';
import { openDb } from '~/lib/db';
import { ManualAdjustment } from '~/types';

export async function GET(request: Request) {

  try {
    verifyToken(request.headers)
    const db = await openDb();
    const manualAdjustments = await db.all<ManualAdjustment[]>('SELECT * FROM manual_adjustment');

    return NextResponse.json(manualAdjustments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}