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

  const classNames = `
          [&>div]:bg-transparent 
          ![background:transparent]
          [&>div]:text-white
          [&>*>*>*>button.rdrDayDisabled]:bg-transparent
          [&>*>*>*>button.rdrDayDisabled>span>span]:text-lg
          [&>*>*>*>button.rdrDayDisabled>span>span]:text-[#999999]
          [&>*>*>*>button.rdrDayDisabled>span>span]:dark:text-gray-500
          [&>*>*>*>button>span>span]:text-lg
          [&>*>*>*>button>span>span]:font-semibold
          [&>*>*>*>button>span>span]:dark:text-white
          [&>*>*>*>button.rdrDayDisabled>span>span]:dark:text-white
          [&>option]:bg-black
          [&>div>div>span.rdrDateInput]:bg-transparent
          [&>div>div>span.rdrDateInput]:dark:bg-black/40
          [&>div>div>span.rdrDateInput]:backdrop-blur-md
          [&>div>div>span.rdrDateInput>input]:text-sm
          [&>div>div>span.rdrDateInput>input]:dark:text-white
          [&>div>div>span.rdrDateInput>input]:text-black
          [&>div.rdrMonthAndYearWrapper>button.rdrNextPrevButton]:bg-white/40
          [&>div.rdrMonthAndYearWrapper>button.rdrNextPrevButton]:dark:bg-white/90
          [&>.rdrMonthAndYearWrapper>button.rdrNextPrevButton]:backdrop-blur-md
          [&>div.rdrMonthAndYearWrapper>span.rdrMonthAndYearPickers>span.rdrYearPicker>select]:text-sm
          [&>div.rdrMonthAndYearWrapper>span.rdrMonthAndYearPickers>span.rdrYearPicker>select]:dark:text-white
          [&>div.rdrMonthAndYearWrapper>span.rdrMonthAndYearPickers>span.rdrMonthPicker>select]:text-sm
          [&>div.rdrMonthAndYearWrapper>span.rdrMonthAndYearPickers>span.rdrMonthPicker>select]:dark:text-white
    `

  return (
    <DateRangePickerComp
      ranges={[selectionRange]}
      onChange={handleSelect}
      minDate={new Date()}
      disabledDates={data}
      className={classNames}
    />
  )
}

export default DateRangePicker