import { NextRequest, NextResponse } from 'next/server';
import { openDb } from '~/lib/db';
import { ManualAdjustment, Pricing } from '~/types';
import { calculateTaxAndFees, getPricing } from '~/lib/price-calculations';

export async function POST(request: NextRequest) {
  const { startDate, endDate, guests, villaType } = await request.json();

  if (!startDate) return NextResponse.json({ error: 'Start date not provided' }, { status: 400 })
  if (!endDate) return NextResponse.json({ error: 'End date not provided' }, { status: 400 })
  if (!villaType) return NextResponse.json({ error: 'Villa type not provided' }, { status: 400 })
  if (!guests) return NextResponse.json({ error: 'Guests not provided' }, { status: 400 })

  try {
    const db = await openDb();

    const [pricing, manualAdjustment] = await Promise.all([
      db.all<Pricing[]>('SELECT * FROM pricing WHERE villaType = ?', [villaType]),
      db.all<ManualAdjustment[]>('SELECT * FROM manual_adjustment WHERE villaType = ?', [villaType]),
    ])

    const pricings = getPricing(startDate, endDate, pricing, manualAdjustment)
    const total = calculateTaxAndFees(pricings, guests)

    return NextResponse.json(total);
  } catch (error) {
    console.error('Error occured while calculating total: ', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}


