'use client';
import { cn } from "~/lib/utils";
import { Calendar } from "../ui/calendar";
import useGetDisabledDates from "~/hooks/useGetDisabledDates";
import { useState } from "react";
import { addDays, parse } from "date-fns";

export default function CalendarWidget({ className, northVilla }: { className?: string, northVilla: boolean }) {
  const { data: disabledDates, isLoading, error } = useGetDisabledDates(northVilla)

  const [selected, setSelected] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      disabled={disabledDates?.map(date => new Date(date))}
      selected={selected}
      onSelect={(value) => setSelected(value)}
      className={cn("rounded-md border ", className)}
    />
  )
}