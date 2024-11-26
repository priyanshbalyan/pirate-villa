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

