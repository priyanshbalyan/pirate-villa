import { NextRequest, NextResponse } from 'next/server';
import { getPricing } from '~/lib/price-calculations';
import { openDb } from '~/lib/db';
import { FeeAdjustment, ManualAdjustment, Pricing } from '~/types';

export async function POST(request: NextRequest) {
  const { startDate, endDate, villaType } = await request.json();
  if (!startDate) return NextResponse.json({ error: 'Start date not provided' }, { status: 400 })
  if (!endDate) return NextResponse.json({ error: 'End date not provided' }, { status: 400 })
  if (!villaType) return NextResponse.json({ error: 'Villa type not provided' }, { status: 400 })

  const db = await openDb();

  const [pricing, manualAdjustment, feeRatesData] = await Promise.all([
    db.all<Pricing[]>('SELECT * FROM pricing WHERE villaType = ?', [villaType]),
    db.all<ManualAdjustment[]>('SELECT * FROM manual_adjustment WHERE villaType = ?', [villaType]),
    db.all<{ title: string, value: string }[]>('SELECT * FROM fee_rates')
  ])

  const feeAdjustments = feeRatesData.reduce((acc, cur) => {
    (acc as any)[cur.title] = cur.value;
    return acc
  }, {}) as FeeAdjustment

  const pricings = getPricing(startDate, endDate, pricing, manualAdjustment, feeAdjustments)
  return NextResponse.json(pricings);
}
