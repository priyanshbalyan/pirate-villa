import { useQuery } from "@tanstack/react-query"


async function getDisabledDates(northVilla: boolean): Promise<Date[]> {
    const response = await fetch(`/api/calendar${northVilla ? '?north=true' : ''}`);
    const json = await response.json()
    return json as Date[]
}

const useGetDisabledDates = (northVilla = true) => {
    return useQuery({ queryKey: [`getDisabledDates north=${northVilla.toString()}`], queryFn: () => getDisabledDates(northVilla) })
}

export default useGetDisabledDates