'use client'
import { Card, CardContent, CardTitle } from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import { Input } from '~/components/ui/input'
import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button'
import DateRangePicker from './DateRangePicker'
import { RangeKeyDict } from 'react-date-range'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import createBooking from '~/hooks/useCreateBooking';
import { LoaderCircle, Lock, X } from 'lucide-react'
import { useToast } from '~/hooks/use-toast';
import { Toaster } from '~/components/ui/toaster';
import { eachDayOfInterval, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { validateBookingData } from '~/utils/utils';
import { TermsDialog } from './TermsDialog';
import CreditCardPaymentForm from './CreditCardPaymentForm';
import { Label } from '../ui/label';
import { cn } from '~/lib/utils';
import { SITE } from '~/config';
import { PaymentDialog } from './PaymentDialog';

type Villa = 'north-villa' | 'south-villa';

const queryClient = new QueryClient()

export default function BookingPage({ north }: { north: boolean }) {
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

	const noOfDays = startDate && endDate ? eachDayOfInterval({ start: startDate, end: endDate }).length : 0
	const amount = (noOfDays > 0 ? noOfDays : 0) * SITE.PRICE_PER_DAY

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
		<QueryClientProvider client={queryClient}>
			<div className={`flex justify-center  bg-cover bg-center ${bg}`}>
				<Card className="max-w-[700px] w-full my-36 md:mx-36 bg-o backdrop-blur-lg bg-white/60 dark:bg-[#0f172a]/80">
					<CardTitle className="p-8 text-3xl">Book The Pirates Landing {north ? 'North' : 'South'} 3-bedroom condo in fabulous Cruz Bay with WiFi, AC</CardTitle>
					<CardContent className="p-8 flex flex-col">
						<div className='mb-2'>
							<h2 className='text-md font-bold'>Booking Details</h2>
							<div className='text-xs'>Enter your information</div>
						</div>
						<div className='mb-4'>
							<Label className='mt-0'>Select booking date:</Label>
							<div className="mt-4 rounded-md">
								<DateRangePicker
									handleSelect={handleDateSelect}
									startDate={startDate}
									endDate={endDate}
									northVilla={north}
								/>
							</div>
							{errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
							<Label className="mb-2 mt-4">Name:</Label>
							<div className="mb-4">
								<Input name="name" id="name" className='w-full' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
								{errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
							</div>
							<Label className="mb-2 mt-4">Email:</Label>
							<div className="mb-4">
								<Input name="email" id="email" className='' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
								{errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
							</div>
							<Label className="mb-2 mt-4">Number of Guests:</Label>
							<div className="mb-4">
								<Input name="guests" id="guests" className='' placeholder='Guests' type="number" min={1} value={guests} onChange={(e) => setGuests(e.target.value as unknown as number)} />
								{errors.guests && <p className="text-xs text-red-500">{errors.guests}</p>}
							</div>
						</div>
						<div className="flex items-center gap-4 mb-2 mt-4" onClick={() => setModalOpen(true)}>
							<Checkbox checked={termsRead} />
							<div className="hover:text-blue-400 cursor-pointer underline">Read terms and conditions</div>
						</div>
						<div className="flex justify-between mt-4">
							<Button
								onClick={handleSubmit}
								className={cn("w-full bg-black text-white", Object.keys(errors).length > 0 && "border-red-500 border")}
								disabled={!termsRead || loading}
							>
								{loading ? <LoaderCircle className='animate-spin' /> : <Lock className="mr-2 h-4 w-4" />}
								{' '}Pay Now and Book! {amount > 0 ? `$${amount}` : ''}
							</Button>
						</div>
						<Toaster />
					</CardContent>
				</Card>
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
				amount={amount}
			/>
		</QueryClientProvider>
	);
}
