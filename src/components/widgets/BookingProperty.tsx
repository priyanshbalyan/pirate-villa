'use client'
import { Checkbox } from '~/components/ui/checkbox'
import { Input } from '~/components/ui/input'
import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button'
import DateRangePicker from '~/components/atoms/DateRangePicker'
import { RangeKeyDict } from 'react-date-range'
import createBooking from '~/hooks/useCreateBooking';
import { LoaderCircle, Lock, X } from 'lucide-react'
import { useToast } from '~/hooks/use-toast';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { validateBookingData } from '~/utils/utils';
import { TermsDialog } from '~/components/atoms/TermsDialog';
import { Label } from '../ui/label';
import { cn } from '~/lib/utils';
import { PaymentDialog } from '~/components/atoms/PaymentDialog';
import { useQueryClient } from '@tanstack/react-query';
import useGetCalculateTotal from '~/hooks/useGetCalculateTotal';
import NumberFlow from '@number-flow/react';
import { PlayfairDisplay } from '../atoms/Logo';
import Image from 'next/image';
import { northPictures, southPictures } from '~/shared/data/pages/home.data';

type Villa = 'north-villa' | 'south-villa';

type Props = {
  north: boolean
}

export default function BookingProperty({ north }: { north: boolean }) {
  const queryClient = useQueryClient()

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
    if (touched) {
      const errors = validateBookingData(name, email, startDate, endDate)
      setErrors(errors)
    }
  }, [name, email, creditCardData, guests, startDate, endDate, touched])

  const bg = north ? "bg-[url('/north-miscellaneous.avif')]" : "bg-[url('/south-beach.avif')]"


  return (
    <div className="flex flex-col md:flex-row h-fit border-t-site border-[1px]" id="booknow">
      <div className="md:w-1/2 w-full bg-background flex flex-col items-center justify-center px-4 md:px-20 text-site pb-8">
        <span className={cn(PlayfairDisplay.className, 'text-3xl md:text-5xl text-site max-w-[90%] text-center mt-8 uppercase')}>
          BOOK NOW
        </span>
        <div className="w-full mt-8">
          <div className='mb-4'>
            <Label className='mt-0 px-8 md:px-0'>Select booking date:</Label>
            <div className="mt-4 rounded-md">
              <DateRangePicker
                handleSelect={handleDateSelect}
                startDate={startDate}
                endDate={endDate}
                northVilla={north}
              />
            </div>
            {errors.date && <p className="text-xs text-red-500 px-8 md:px-0">{errors.date}</p>}
            <Label className="mb-2 mt-4 px-8 md:px-0">Name:</Label>
            <div className="mb-4 px-8 md:px-0">
              <Input name="name" id="name" className='w-full' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>
            <Label className="mb-2 mt-4 px-8 md:px-0">Email:</Label>
            <div className="mb-4 px-8 md:px-0">
              <Input name="email" id="email" className='' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
            <Label className="mb-2 mt-4 px-8 md:px-0">Number of Guests:</Label>
            <div className="mb-4 px-8 md:px-0">
              <Input name="guests" id="guests" className='' placeholder='Guests' type="number" min={1} value={guests} onChange={(e) => setGuests(e.target.value as unknown as number)} />
              {errors.guests && <p className="text-xs text-red-500">{errors.guests}</p>}
            </div>
          </div>
          <div className="flex items-center gap-4 mb-2 mt-4 px-8 md:px-0" onClick={() => setModalOpen(true)}>
            <Checkbox checked={termsRead} />
            <div className="hover:text-blue-400 cursor-pointer underline">Read terms and conditions</div>
          </div>
          <div className="flex justify-between mt-4 px-8 md:px-0 pb-8 md:pb-0">
            <Button
              onClick={handleSubmit}
              className={cn("w-full bg-site text-white", Object.keys(errors).length > 0 && "border-red-500 border")}
              disabled={!termsRead || loading}
            >
              {loading ? <LoaderCircle className='animate-spin' /> : <Lock className="mr-2 h-4 w-4" />}
              {' '}Pay Now and Book! {amount && <NumberFlow value={amount} format={{ style: 'currency', currency: 'USD' }} />}
            </Button>
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
      <Image
        className="m-0 p-0 md:w-1/2 w-full shadow-lg bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 object-cover"
        src={north ? northPictures[11].image : southPictures[16].image}
        width={828}
        height={842}
        alt="North villa"
        sizes="(max-width: 768px) 100vw, 432px"
        quality={100}
        placeholder="blur"
      />

    </div>

  )
}