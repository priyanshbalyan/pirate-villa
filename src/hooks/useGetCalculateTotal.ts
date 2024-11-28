import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns";
import { TotalCalculation, VillaType } from "~/types";
import { DATE_FORMAT_STRING } from "~/utils/utils";

async function getCalculateTotal(start: string, end: string, guests: number, villaType: VillaType): Promise<TotalCalculation> {
  const response = await fetch(`/api/calculate-total`, {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify({
      startDate: start,
      endDate: end,
      guests,
      villaType
    })
  });
  if (!response.ok) throw new Error(await response.json())
  const json = await response.json()
  return json
}

export const getCalculateTotalQueryKey = (start: string, end: string, guests: number) => [`getCalculateTotal ${start} ${end} ${guests}`]

const useGetCalculateTotal = (startDate: Date, endDate: Date, guests: number, villaType: VillaType, options?: { enabled?: boolean }) => {
  const start = format(startDate, DATE_FORMAT_STRING)
  const end = format(endDate, DATE_FORMAT_STRING)

  return useQuery({
    queryKey: getCalculateTotalQueryKey(start, end, guests),
    queryFn: () => getCalculateTotal(start, end, guests, villaType),
    ...options
  })
}

export default useGetCalculateTotal