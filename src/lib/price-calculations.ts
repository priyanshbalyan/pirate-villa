import { parse, eachDayOfInterval, isWithinInterval, format } from "date-fns";
import { DATE_FORMAT_STRING } from '~/utils/utils';
import { FeeAdjustment, ManualAdjustment, Pricing, TotalCalculation } from '~/types';
import { SITE } from "~/config";

type PricePerDate = { date: string, price: number }

export function getPricing(
  startDate: string,
  endDate: string,
  pricingTable: Pricing[],
  manualAdjustments: ManualAdjustment[],
  feeRates: FeeAdjustment
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
    )?.nightlyRate ?? feeRates.defaultPricePerDay;

    datePrices.push({ date: dateString, price })
  }

  return datePrices;
}

// Helper to calculate additional fees
export const calculateTaxAndFees = (pricesPerDate: PricePerDate[], guests: number, feeRates: FeeAdjustment): TotalCalculation => {
  const baseRate = pricesPerDate.reduce((acc, pricePerDate) => acc + pricePerDate.price, 0)
  const nights = pricesPerDate.length

  const tax = baseRate * feeRates.taxRate
  const cleaningFee = feeRates.cleaningFee; // flat cleaning fee
  const processingFee = baseRate * feeRates.processingFeeRate; // 3% processing fee
  const extraGuestsFee = guests > SITE.GUEST_LIMIT ? (guests - SITE.GUEST_LIMIT) * feeRates.extraGuestsPerNightFee * nights : 0;

  return {
    baseRate,
    nights,
    tax,
    taxRate: feeRates.taxRate,
    cleaningFee,
    processingFeeRate: feeRates.processingFeeRate,
    extraGuestsPerNightFee: feeRates.extraGuestsPerNightFee,
    processingFee,
    extraGuestsFee,
    extraGuests: Math.max(0, guests - SITE.GUEST_LIMIT),
    total: baseRate + tax + cleaningFee + processingFee + extraGuestsFee,
  };
};