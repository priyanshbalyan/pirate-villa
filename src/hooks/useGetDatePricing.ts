import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns";
import { DATE_FORMAT_STRING } from "~/utils/utils";

type DatePricing = {
  date: string;
  price: number
}

async function getDatePricing(startDate: string, endDate: string, northVilla: boolean): Promise<DatePricing[]> {
  const response = await fetch('/api/date-pricings', {
    cache: 'no-store',
    body: JSON.stringify({
      startDate,
      endDate,
      villaType: northVilla ? 'north' : 'south'
    }),
    method: 'POST'
  });

  if (!response.ok) throw new Error(await response.json())

  const json = await response.json()
  return json
}

const useGetDatePricing = (startDate: Date, endDate: Date, northVilla: boolean, options: { enabled: boolean }) => {
  const start = format(startDate, DATE_FORMAT_STRING)
  const end = format(endDate, DATE_FORMAT_STRING)

  return useQuery({
    queryKey: [`getDatePricing ${start} ${end} ${northVilla.toString()}`],
    queryFn: () => getDatePricing(start, end, northVilla),
    ...options
  })
}

export default useGetDatePricing