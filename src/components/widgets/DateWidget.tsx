'use client';

import { useState } from "react";
import DateRangePicker from "~/components/atoms/DateRangePicker";

export default function DateWidget({ northVilla }: { northVilla: boolean }) {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  return (
    <DateRangePicker startDate={startDate} endDate={endDate} handleSelect={() => { }} northVilla={northVilla} />
  )
}