'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import DateRangePicker from "~/components/atoms/DateRangePicker";

const queryClient = new QueryClient()

export default function DateWidget({ northVilla }: { northVilla: boolean }) {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  return (
    <QueryClientProvider client={queryClient}>
      <DateRangePicker startDate={startDate} endDate={endDate} handleSelect={() => { }} northVilla={northVilla} />
    </QueryClientProvider>
  )
}