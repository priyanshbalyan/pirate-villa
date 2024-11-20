'use client'
import { Card, CardContent, CardTitle } from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import { Input } from '~/components/ui/input'
import { useState } from 'react';
import { Button } from '~/components/ui/button'
import DateRangePicker from './DateRangePicker'
import { RangeKeyDict } from 'react-date-range'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import TermsAndConditions from './TermsAndConditions'
import createBooking from '~/hooks/useCreateBooking';
import { LoaderCircle, X } from 'lucide-react'
import { useToast } from '~/hooks/use-toast';
import { Toaster } from '~/components/ui/toaster';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

type Villa = 'north-villa' | 'south-villa';

const queryClient = new QueryClient()

export default function BookingPage({ north }: { north: boolean }) {
	const [modalOpen, setModalOpen] = useState(false)
	const [startDate, setStartDate] = useState<Date | null>(null)
	const [endDate, setEndDate] = useState<Date | null>(null)
	const [termsRead, setTermsRead] = useState(false)

	const [loading, setLoading] = useState(false);

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [guests, setGuests] = useState(1)

	const { toast } = useToast()
	const router = useRouter()

	const handleDateSelect = (value: RangeKeyDict) => {
		const { startDate, endDate } = value.selection
		setStartDate(startDate ? startDate : null)
		setEndDate(endDate ? endDate : null)
	}

	const handleBook = async () => {
		setLoading(true)
		if (startDate && endDate) {
				createBooking(name, email, guests, startDate, endDate, north ? 'north' : 'south').then(() => {
					const params = new URLSearchParams({
						guests: guests.toString(),
						name,
						email,
						startDate: format(startDate, 'yyyy-MM-dd'),
						endDate: format(endDate, 'yyyy-MM-dd')
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

	const bg = north ? "bg-[url('/north-miscellaneous.avif')]" : "bg-[url('/south-beach.avif')]"

	return (
		<QueryClientProvider client={queryClient}>
			<div className={`flex justify-center  bg-cover bg-center ${bg}`}>
				<Card className="max-w-[700px] w-full my-36 md:mx-36 bg-o backdrop-blur-lg bg-white/60 dark:bg-[#0f172a]/80">
					<CardTitle className="p-8 text-3xl">Book The Pirates Landing {north ? 'North' : 'South'} 3-bedroom condo in fabulous Cruz Bay with WiFi, AC</CardTitle>
					<CardContent className="p-8 flex flex-col">
						<div className='mb-4'>
							<div className='mt-0'>Select booking date:</div>
							<div className="mt-4 rounded-md">
								<DateRangePicker
									handleSelect={handleDateSelect}
									startDate={startDate}
									endDate={endDate}
									northVilla={north}
								/>
							</div>
							<div className="mb-2 mt-4">Name:</div>
							<div className="mb-4">
								<Input name="name" className='w-full' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
							</div>
							<div className="mb-2 mt-4">Email:</div>
							<div className="mb-4">
								<Input name="email" className='' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
							</div>
							<div className="mb-2 mt-4">Number of Guests:</div>
							<div className="mb-4">
								<Input name="guests" className='' placeholder='Guests' type="number" min={1} value={guests} onChange={(e) => setGuests(e.target.value as unknown as number)} />
							</div>
						</div>

						<div className="flex items-center gap-4 mb-6" onClick={() => setModalOpen(true)}>
							<Checkbox checked={termsRead} />
							<div className="hover:text-blue-400 cursor-pointer underline">Read terms and conditions</div>
						</div>
						<Button
							className="bg-black text-white"
							disabled={!termsRead || loading}
							onClick={handleBook}
						>
							{loading ? <LoaderCircle className='animate-spin' /> : 'Book!'}
						</Button>
						<Toaster />

					</CardContent>
				</Card>
			</div>
			<Dialog open={modalOpen} onClose={() => setModalOpen(false)}
				transition
				className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0 z-[90]"
			>
				<DialogBackdrop className="fixed inset-0 bg-black/30" />
				<div className="fixed inset-0 w-screen overflow-y-auto p-4">
					<div className="flex min-h-full items-center justify-center">
						<DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
							<TermsAndConditions onAcceptClick={() => { setTermsRead(true); setModalOpen(false) }} />
						</DialogPanel>
					</div>
				</div>
			</Dialog>

		</QueryClientProvider>
	);
}
