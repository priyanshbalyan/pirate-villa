import { NextRequest, NextResponse } from 'next/server';
import { openDb } from '~/lib/db';
import { Resend } from 'resend';
import { isValidDateFormat } from '~/utils/utils';
import { verifyToken } from '~/lib/auth';
import { ManualAdjustment, VillaType } from '~/types';

const resend = new Resend(process.env.RESEND_API_KEY);

type RequestBody = {
  date: string;
  nightlyRate: number;
  villaType: VillaType;
}

export async function POST(req: NextRequest) {
  const headers = req.headers;
  const data: RequestBody = await req.json();
  const {
    date,
    nightlyRate,
    villaType
  }: RequestBody = data

  try {
    verifyToken(headers);

    if (nightlyRate < 0) return NextResponse.json({ error: 'Rate can not be negative' }, { status: 400 })
    if (!isValidDateFormat(date)) return NextResponse.json({ error: 'Date is invalid' }, { status: 400 })

    const db = await openDb();
    const existingRow = await db.all<ManualAdjustment[]>('SELECT * FROM manual_adjustment WHERE date = ? AND villaType = ?', [date, villaType])

    if (existingRow && existingRow.length > 0) {
      return NextResponse.json({ error: 'Manual adjustment is already available for this date' }, { status: 400 })
    }

    await db.run(
      'INSERT INTO manual_adjustment (nightlyRate, date, villaType) VALUES (?, ?, ?)',
      nightlyRate,
      date,
      villaType
    );

    return NextResponse.json({ message: 'Manual adjustment added successfully' });
  } catch (error) {
    console.error('Manual adjustment add error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}