import { NextRequest, NextResponse } from 'next/server';
import { openDb } from '~/lib/db';
import { Resend } from 'resend';
import { DATE_FORMAT_STRING, isDateRangeOverlappingStrings, isDevEnv, isValidDateFormat, validateEmail } from '~/utils/utils';
import { verifyToken } from '~/lib/auth';
import { isBefore, parse } from 'date-fns';

const resend = new Resend(process.env.RESEND_API_KEY);

type RequestBody = {
  startDate: string;
  endDate: string;
  nightlyRate: number;
  villaType: 'north' | 'south';
}

export async function POST(req: NextRequest) {
  const headers = req.headers;
  const data: RequestBody = await req.json();
  const {
    startDate,
    endDate,
    nightlyRate,
    villaType
  }: RequestBody = data

  try {
    verifyToken(headers);

    if (nightlyRate < 0) return NextResponse.json({ error: 'Rate can not be negative' }, { status: 400 })
    if (!isValidDateFormat(startDate)) return NextResponse.json({ error: 'Start date is invalid' }, { status: 400 })
    if (!isValidDateFormat(endDate)) return NextResponse.json({ error: 'End date is invalid' }, { status: 400 })
    const start = parse(startDate, DATE_FORMAT_STRING, new Date())
    const end = parse(endDate, DATE_FORMAT_STRING, new Date())
    if (isBefore(start, new Date())) return NextResponse.json({ error: 'Start date is in the past' }, { status: 400 })
    if (isBefore(end, start)) return NextResponse.json({ error: 'Start date should be before end date' }, { status: 400 })


    const db = await openDb();
    const dateRanges = await db.all<{ startDate: string, endDate: string }[]>('SELECT startDate, endDate FROM pricing WHERE villaType = ?', [villaType])

    if (isDateRangeOverlappingStrings(startDate, endDate, dateRanges)) return NextResponse.json({ error: 'Dates are overlapping with existing ranges' }, { status: 400 })

    await db.run(
      'INSERT INTO pricing (nightlyRate, startDate, endDate, villaType) VALUES (?, ?, ?, ?)',
      nightlyRate,
      startDate,
      endDate,
      villaType
    );

    return NextResponse.json({ message: 'Pricing added successfully' });
  } catch (error) {
    console.error('Pricing add error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}