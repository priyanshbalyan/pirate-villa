'use client'
import { Checkbox } from '~/components/ui/checkbox'
import { Input } from '~/components/ui/input'
import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button'
import DateRangePicker from '~/components/atoms/DateRangePicker'
import { RangeKeyDict } from 'react-date-range'
import createBooking from '~/hooks/useCreateBooking';
import { LoaderCircle, Lock } from 'lucide-react'
import { useToast } from '~/hooks/use-toast';
import { differenceInDays, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { PlayfairDisplay, validateBookingData } from '~/utils/utils';
import { TermsDialog } from '~/components/atoms/TermsDialog';
import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utils';
import { PaymentDialog } from '~/components/atoms/PaymentDialog';
import { useQueryClient } from '@tanstack/react-query';
import useGetCalculateTotal from '~/hooks/useGetCalculateTotal';
import NumberFlow from '@number-flow/react';
import { SITE } from '~/config';
import PriceBreakdown from '~/components/atoms/PriceBreakdown';
import useTranslation from '~/hooks/useTranslation';
import CollapseAnimate from './CollapseAnimate';

type Villa = 'north-villa' | 'south-villa';

type Props = {
  north: boolean
}

export default function BookingProperty({ north }: { north: boolean }) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const [modalOpen, setModalOpen] = useState(false)
  const [paymentsModalOpen, setPaymentsModalOpen] = useState(false)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [termsRead, setTermsRead] = useState(false)

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [guests, setGuests] = useState(1)

  const [touched, setTouched] = useState(false)

  const [creditCardData, setCreditCardData] = useState({
    cardNumber: '', expiryDate: '', cvv: '', cardName: ''
  })

  const { data: totalCalculation } = useGetCalculateTotal(
    startDate ?? new Date(),
    endDate ?? new Date(),
    guests, north ? 'north' : 'south',
    { enabled: !!startDate && !!endDate }
  )
  const amount = totalCalculation?.total

  const { toast } = useToast()
  const router = useRouter()

  const handleDateSelect = (value: RangeKeyDict) => {
    const { startDate, endDate } = value.selection
    setStartDate(startDate ? startDate : null)
    setEndDate(endDate ? endDate : null)
  }

  const handleBook = async () => {
    if (startDate && endDate) {
      setLoading(true)

      createBooking(name, email, guests, startDate, endDate, north ? 'north' : 'south', creditCardData).then((data) => {
        const params = new URLSearchParams({
          guests: guests.toString(),
          name,
          email,
          startDate: format(startDate, 'yyyy-MM-dd'),
          endDate: format(endDate, 'yyyy-MM-dd'),
          transactionId: data.transactionId
        })
        router.push(`/complete?${params.toString()}`)
        queryClient.invalidateQueries({
          queryKey: ['getICSData' + north.toString()]
        })
      }).catch(err => {
        toast({ title: 'An unknown error occured.' })
      })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    const errors = validateBookingData(name, email, startDate, endDate)
    setErrors(errors)

    if (Object.keys(errors).length === 0) {
      setPaymentsModalOpen(true)
    }
  }

  useEffect(() => {
    if (endDate && startDate) {
      if (differenceInDays(endDate, startDate) < SITE.MINIMUM_NIGHTS_STAY)
        setErrors({ ...errors, date: 'Minimum 3 night stays can be booked.' })
      else setErrors({})
    }
    if (touched) {
      const errors = validateBookingData(name, email, startDate, endDate)
      setErrors(errors)
    }

  }, [name, email, creditCardData, guests, startDate, endDate, touched])

  const bg = north ? "bg-[url('/north-miscellaneous.avif')]" : "bg-[url('/south-beach.avif')]"


  return (
    <div className="w-full bg-background flex flex-col items-center justify-center px-4 md:px-20 text-site py-4 md:py-16  border-b-site border-[1px]">
      <span className={cn(PlayfairDisplay.className, 'text-3xl md:text-5xl text-site max-w-[90%] text-center mt-8 uppercase')}>
        {t('book_now')}
      </span>
      <div className="w-full mt-8">
        <div className='mb-4'>
          <div className="flex flex-col md:flex-row gap-0 md:gap-16">
            <div className="rounded-md w-full md:w-1/2">
              <Label className='mt-0 px-8 md:px-0'>{t('book_now_select_date_label')}</Label>
              <DateRangePicker
                handleSelect={handleDateSelect}
                startDate={startDate}
                endDate={endDate}
                northVilla={north}
              />
              {errors.date && <p className="text-xs text-red-500 px-8 md:px-0">{errors.date}</p>}
            </div>
            <div className="w-full md:w-1/2">
              <Label className="mb-2 mt-4 ">{t('book_now_name_label')}</Label>
              <div className="mb-4">
                <Input name="name" id="name" className='w-full' placeholder={t('book_now_name_placeholder')} value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
              </div>
              <Label className="mb-2 mt-4">{t('book_now_email_label')}</Label>
              <div className="mb-4">
                <Input name="email" id="email" className='' placeholder={t('book_now_email_placeholder')} value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>
              <Label className="mb-2 mt-4">{t('book_now_number_of_guests_label')}</Label>
              <div className="mb-4">
                <Input name="guests" id="guests" className='' placeholder='Guests' type="number" min={1} value={guests} onChange={(e) => setGuests(e.target.value as unknown as number)} />
                {errors.guests && <p className="text-xs text-red-500">{errors.guests}</p>}
              </div>
              <div className="flex items-center gap-4 mb-2 mt-4" onClick={() => setModalOpen(true)}>
                <Checkbox checked={termsRead} />
                <div className="hover:text-blue-400 cursor-pointer underline">{t('book_now_read_terms')}</div>
              </div>
              <div className='mt-4'>
                <PriceBreakdown
                  startDate={startDate}
                  endDate={endDate}
                  villaType={!!north ? 'north' : 'south'}
                  guests={guests}
                />
              </div>
              <div className="flex justify-between mt-4 pb-8 md:pb-0">
                <Button
                  onClick={handleSubmit}
                  className={cn("w-full bg-site text-white", Object.keys(errors).length > 0 && "border-red-500 border")}
                  disabled={!termsRead || loading}
                >
                  {loading ? <LoaderCircle className='animate-spin' /> : <Lock className="mr-2 h-4 w-4" />}
                  <div>{' '}</div>
                  <div>
                    {t('book_now_pay_button')}
                  </div>
                  <div>{' '}</div>
                  <CollapseAnimate>
                    <NumberFlow value={amount ?? 0} format={{ style: 'currency', currency: 'USD' }} />
                  </CollapseAnimate>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <TermsDialog
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setTermsRead={setTermsRead}
        />

        <PaymentDialog
          modalOpen={paymentsModalOpen}
          setModalOpen={setPaymentsModalOpen}
          creditCardData={creditCardData}
          setCreditCardData={setCreditCardData}
          loading={loading}
          handleBook={handleBook}
          amount={amount!}
        />
      </div>
    </div>

  )
}