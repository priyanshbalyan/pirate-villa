import { NextResponse } from 'next/server';
import { openDb } from '~/lib/db';
import { Pricing } from '~/types';

// Helper to calculate additional fees
const calculateFees = (nightlyRate: number, guests: number, nights: number) => {
  const baseRate = nightlyRate * nights;
  const tax = baseRate * 0.125; // 12.5% tax on nightly rate only
  const cleaningFee = 400; // flat cleaning fee
  const processingFee = baseRate * 0.03; // 3% processing fee
  const extraGuestsFee = guests > 6 ? (guests - 6) * 25 * nights : 0;

  return {
    baseRate,
    tax,
    cleaningFee,
    processingFee,
    extraGuestsFee,
    total: baseRate + tax + cleaningFee + processingFee + extraGuestsFee,
  };
};

export async function GET(request: Request) {
  // const { startDate, endDate, guestCount } = await request.json();
  // const nights = Math.ceil(
  //   (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
  // );

  const db = await openDb();

  // Find pricing for the range
  const pricing = await db.all<Pricing[]>('SELECT * FROM pricing');

  // const fees = calculateFees(pricing.nightlyRate, guestCount, nights);
  return NextResponse.json(pricing);
}