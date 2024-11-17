'use client';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange as DateRangePickerComp, RangeKeyDict } from 'react-date-range';
import useGetICSData from '~/hooks/useGetICSData';

type Props = {
    handleSelect: (rangesByKey: RangeKeyDict) => void;
    startDate: Date | null;
    endDate: Date | null;
    northVilla: boolean;
}

const DateRangePicker = ({ handleSelect, startDate = null, endDate = null, northVilla }: Props) => {
    const { data } = useGetICSData(northVilla)

    const selectionRange = {
        startDate: startDate ?? new Date(),
        endDate: endDate ?? new Date(),
        key: 'selection',
    }
    return (
      <DateRangePickerComp
        ranges={[selectionRange]}
        onChange={handleSelect}
        minDate={new Date()}
        disabledDates={data}
      />
    ) 
}

export default DateRangePicker