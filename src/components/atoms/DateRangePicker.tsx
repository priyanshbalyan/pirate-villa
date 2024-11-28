'use client';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange as DateRangePickerComp, RangeKeyDict } from 'react-date-range';
import useGetDisabledDates from '~/hooks/useGetDisabledDates';
import { LoaderCircle } from 'lucide-react';
import useGetDatePricing from '~/hooks/useGetDatePricing';
import { format, getDate, isBefore, startOfDay } from 'date-fns';
import { cn } from '~/lib/utils';
import { useMemo } from 'react';
import { DATE_FORMAT_STRING } from '~/utils/utils';

type Props = {
  handleSelect: (rangesByKey: RangeKeyDict) => void;
  startDate: Date | null;
  endDate: Date | null;
  northVilla: boolean;
}

const DateRangePicker = ({ handleSelect, startDate = null, endDate = null, northVilla }: Props) => {
  const { data: disabledDates, isLoading, error } = useGetDisabledDates(northVilla)
  const { data: datePricing, error: errorDP } = useGetDatePricing(startDate ?? new Date(), endDate ?? new Date(), northVilla,
    { enabled: !!startDate && !!endDate }
  )

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
      [&>*>*>*>button.rdrDayDisabled>span>span]:dark:text-gray
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

  const disabledDatesSet = useMemo(() => {
    return disabledDates?.reduce((acc, cur) => acc.add(format(cur, DATE_FORMAT_STRING)), new Set())
  }, [disabledDates])

  const datePricingSet = useMemo(() => {
    return datePricing?.reduce((acc, cur) => acc.set(cur.date, cur.price), new Map<string, number | undefined>())
  }, [datePricing])


  if (error) return <div className='w-full h-[349px] flex items-center justify-center'>An error occured. Please try again after some time.</div>

  if (isLoading) {
    return <div className="w-full h-[349px] flex items-center justify-center">
      <LoaderCircle className="animate-spin" />
    </div>
  }



  return (
    <DateRangePickerComp
      ranges={[selectionRange]}
      onChange={handleSelect}
      minDate={new Date()}
      disabledDates={disabledDates ?? []}
      className={classNames}
      dayContentRenderer={(date) => {
        const dateString = format(date, DATE_FORMAT_STRING)
        const disabled = disabledDatesSet?.has(dateString) || isBefore(date, startOfDay(new Date()))
        const price = datePricingSet?.get(dateString)
        return (
          <div
            className={cn(
              'text-white text-lg font-bold',
              disabled && 'pointer-events-none disabled text-gray-500 text-center'
            )}
          >
            <div>{getDate(date)}</div>
            {price && <div className='font-semibold text-xs'>${price}</div>}
          </div>
        )
      }}
    />
  )
}

export default DateRangePicker