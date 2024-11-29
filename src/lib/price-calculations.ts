import { parse, eachDayOfInterval, isWithinInterval, format } from "date-fns";
import { DATE_FORMAT_STRING } from '~/utils/utils';
import { ManualAdjustment, Pricing, TotalCalculation } from '~/types';
import { SITE } from "~/config";

export type PricePerDate = { date: string, price: number }

export function getPricing(
  startDate: string,
  endDate: string,
  pricingTable: Pricing[],
  manualAdjustments: ManualAdjustment[]
): PricePerDate[] {
  // Parse start and end dates
  const start = parse(startDate, DATE_FORMAT_STRING, new Date());
  const end = parse(endDate, DATE_FORMAT_STRING, new Date());

  // Generate all dates within the range
  const dates = eachDayOfInterval({ start, end });

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
    )?.nightlyRate ?? SITE.DEFAULT_PRICE_PER_DAY_IN_DOLLARS;

    datePrices.push({ date: dateString, price })
  }

  return datePrices;
}

// Helper to calculate additional fees
export const calculateTaxAndFees = (pricesPerDate: PricePerDate[], guests: number): TotalCalculation => {
  const baseRate = pricesPerDate.reduce((acc, pricePerDate) => acc + pricePerDate.price, 0)
  const nights = pricesPerDate.length

  const tax = baseRate * SITE.TAX_RATE; // 12.5% tax on nightly rate only
  const cleaningFee = SITE.CLEANING_FEE; // flat cleaning fee
  const processingFee = baseRate * SITE.PROCESSING_FEE_RATE; // 3% processing fee
  const extraGuestsFee = guests > SITE.GUEST_LIMIT ? (guests - SITE.GUEST_LIMIT) * SITE.EXTRA_GUEST_PER_NIGHT_FEE * nights : 0;

  return {
    baseRate,
    nights,
    tax,
    cleaningFee,
    processingFee,
    extraGuestsFee,
    extraGuests: Math.max(0, guests - SITE.GUEST_LIMIT),
    total: baseRate + tax + cleaningFee + processingFee + extraGuestsFee,
  };
};