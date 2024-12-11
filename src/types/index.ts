export type VillaType = 'north' | 'south'

export type Pricing = {
  id: number
  nightlyRate: number
  startDate: string
  endDate: string;
  villaType: VillaType;
}

export type ManualAdjustment = {
  id: number
  nightlyRate: number
  date: string;
  villaType: VillaType;
}

export type TotalCalculation = {
  baseRate: number;
  tax: number;
  cleaningFee: number;
  processingFee: number;
  extraGuestsFee: number;
  total: number;
  extraGuests: number;
  nights: number;
  taxRate: number,
  processingFeeRate: number;
  extraGuestsPerNightFee: number;
}

export type Text = {
  id: number;
  text_key: string;
  content: string;
}

export type TextMap = { [key: string]: string | string[] }

export type Review = {
  id: number;
  name: string;
  title: string;
  content: string;
  isApproved: boolean;
  createdAt: string;
  rating: number;
  villaType: VillaType;
}

export type FeeAdjustment = {
  cleaningFee: number;
  defaultPricePerDay: number;
  taxRate: number;
  processingFeeRate: number;
  extraGuestsPerNightFee: number;
}