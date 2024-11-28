import { NextRequest, NextResponse } from 'next/server';
import { openDb } from '~/lib/db';
import { ManualAdjustment, Pricing } from '~/types';
import { parse, eachDayOfInterval, isWithinInterval, format } from "date-fns";
import { DATE_FORMAT_STRING } from '~/utils/utils';

export async function POST(request: NextRequest) {
  const { startDate, endDate, villaType } = await request.json();
  const db = await openDb();

  const [pricing, manualAdjustment] = await Promise.all([
    db.all<Pricing[]>('SELECT * FROM pricing WHERE villaType = ?', [villaType]),
    db.all<ManualAdjustment[]>('SELECT * FROM manual_adjustment WHERE villaType = ?', [villaType]),
  ])

  const pricings = getPricing(startDate, endDate, pricing, manualAdjustment)
  return NextResponse.json(pricings);
}

function getPricing(
  startDate: string,
  endDate: string,
  pricingTable: Pricing[],
  manualAdjustments: ManualAdjustment[]
): { date: string, price: number }[] {
  // Parse start and end dates
  const start = parse(startDate, DATE_FORMAT_STRING, new Date());
  const end = parse(endDate, DATE_FORMAT_STRING, new Date());

  // Generate all dates within the range
  const dates = eachDayOfInterval({ start, end });

  let totalPrice = 0;

  const datePrices = []
  for (const date of dates) {
    const dateString = format(date, DATE_FORMAT_STRING);

    // Check for manual adjustments
    const manualPrice = manualAdjustments.find((adjustment) => adjustment.date === dateString)?.nightlyRate;

    if (manualPrice !== undefined) {
      datePrices.push({ date: dateString, price: manualPrice })
      continue;
    }

    // Find the applicable pricing from the pricing table
    const price = pricingTable.find((range) =>
      isWithinInterval(date, {
        start: parse(range.startDate, DATE_FORMAT_STRING, new Date()),
        end: parse(range.endDate, DATE_FORMAT_STRING, new Date()),
      })
    )?.nightlyRate;

    if (price !== undefined) {
      datePrices.push({ date: dateString, price })
    } else {
      throw new Error(`No pricing available for date: ${dateString}`);
    }
  }

  return datePrices;
}
