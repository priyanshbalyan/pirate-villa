'use client'
import { Card, CardContent, CardTitle } from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Input } from '~/components/ui/input'
import { useState } from 'react';
import { Button } from '../ui/button'
import DateRangePicker from './DateRangePicker'
import { RangeKeyDict } from 'react-date-range'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CloseButton, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import TermsAndConditions from './TermsAndConditions'
import getUpdateCalendar from '~/hooks/useGetUpdateCalendar';

type Villa = 'north-villa' | 'south-villa';

const queryClient = new QueryClient()

export default function BookingPage() {
	const [property, setPropertyValue] = useState<Villa | ''>('')
	const [modalOpen, setModalOpen] = useState(false)
	const [startDate, setStartDate] = useState<Date | null>(null)
	const [endDate, setEndDate] = useState<Date | null>(null)
	const [termsRead, setTermsRead] = useState(false)

	const [loading, setLoading] = useState(false);

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [guests, setGuests] = useState(1)

	const handleDateSelect = (value: RangeKeyDict) => {
		const { startDate, endDate } = value.selection
		setStartDate(startDate ? startDate : null)
		setEndDate(endDate ? endDate : null)
	}

	const handleBook = async () => {
		setLoading(true)
		if (startDate && endDate) {
			await getUpdateCalendar(startDate, endDate)
		}
		setLoading(false)
	}

	return (
		<QueryClientProvider client={queryClient}>
			<div className="bg-gray-300 flex justify-center bg-[url('/south-beach.avif')] bg-cover bg-center">
				<Card className="max-w-[700px] w-full my-36 md:mx-36">
					<CardTitle className="p-8 text-3xl">Book Private Villas</CardTitle>
					<CardContent className="p-8 flex flex-col">
						<div className="mb-2">Select property:</div>
						<div className='mb-4'>
							<Select value={property} onValueChange={(value: Villa) => setPropertyValue(value)} >
								<SelectTrigger className="">
									<SelectValue placeholder="North/South Villa" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem className='cursor-pointer' value='north-villa'>North Villa</SelectItem>
										<SelectItem className="cursor-pointer" value="south-villa">South Villa</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
							<div className='mt-4'>Select booking date:</div>
							<div className="mt-4">
								<DateRangePicker
									handleSelect={handleDateSelect}
									startDate={startDate}
									endDate={endDate}
									northVilla={property === 'north-villa'}
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
						<Button className="bg-black text-white" disabled={!termsRead}>Book!</Button>
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
