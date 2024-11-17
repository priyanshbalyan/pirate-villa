import { useQuery } from '@tanstack/react-query';
import { eachDayOfInterval } from 'date-fns';

const NORTH_VILLA_ICS = '/api/calendar?north=true'

const SOUTH_VILLA_ICS = '/api/calendar'

type CalendarICSData = {
    [key: string]: {
        type: string;
        params: [];
        uid: string;
        dtstamp: Date;
        start: Date;
        end: Date;
        summary: string
    }
}

async function getICSData(northVilla = true): Promise<Date[]> {
    const response = await fetch(northVilla ? NORTH_VILLA_ICS : SOUTH_VILLA_ICS)
    const data = await response.json() as CalendarICSData;
    const dates = Object.values(data).map(d => eachDayOfInterval({ start: d.start, end: d.end })).flat()
    return dates
}

const useGetICSData = (northVilla = true) => {
    return useQuery({ queryKey: ['getICSData' + northVilla.toString()], queryFn: () => getICSData(northVilla)})
}

export default useGetICSData