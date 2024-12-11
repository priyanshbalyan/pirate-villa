import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '~/lib/auth';
import { openDb } from '~/lib/db';
import { FeeAdjustment } from '~/types';

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    verifyToken(req.headers)
    const db = await openDb();
    const data = await db.all<{ title: string; value: number; }[]>('SELECT * FROM fee_rates')

    const feeAdjustments = data.reduce((acc, cur) => {
      (acc as any)[cur.title] = cur.value;
      return acc
    }, {}) as FeeAdjustment

    return NextResponse.json(feeAdjustments);
  } catch (error) {
    console.log('Error occured while fetching fee_Rates: ', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}