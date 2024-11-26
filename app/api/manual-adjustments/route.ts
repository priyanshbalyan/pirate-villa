import { NextResponse } from 'next/server';
import { openDb } from '~/lib/db';
import { ManualAdjustment } from '~/types';

export async function GET(request: Request) {
  const db = await openDb();

  // Find pricing for the range
  const manualAdjustments = await db.all<ManualAdjustment[]>('SELECT * FROM manual_adjustment');

  return NextResponse.json(manualAdjustments);
}