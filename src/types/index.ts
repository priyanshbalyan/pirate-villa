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
}