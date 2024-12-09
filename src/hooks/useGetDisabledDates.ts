import { useQuery } from "@tanstack/react-query"


async function getDisabledDates(northVilla: boolean): Promise<Date[]> {
    const response = await fetch(`/api/calendar${northVilla ? '?north=true' : ''}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(await response.json())
    const json = await response.json()
    return json as Date[]
}

export const getDisabledDatesQueryKey = (northVilla: boolean) => [`getDisabledDates north=${northVilla.toString()}`]

const useGetDisabledDates = (northVilla = true) => {
    return useQuery({ queryKey: getDisabledDatesQueryKey(northVilla), queryFn: () => getDisabledDates(northVilla) })
}

export default useGetDisabledDates