import { useState } from "react"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion'
import { ScrollArea } from '~/components/ui/scroll-area'

export default function RentalAgreement({ onAcceptClick }: { onAcceptClick: () => void }) {
	const [agreed, setAgreed] = useState(false)

	return (
		<div className="container mx-auto px-4 pb-8 pt-6 max-h-[90%] overflow-y-scroll">
			<h1 className="text-3xl font-bold mb-6">Rental Agreement and Policies</h1>
			<p className="text-gray-600 mb-6">
				Please read through our rental agreement and policies carefully. By agreeing to these terms,
				you acknowledge that you have read, understood, and agree to abide by all the conditions set forth.
			</p>

			<ScrollArea className=" border rounded-md p-4 mb-6">
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="booking">
						<AccordionTrigger>Booking and Payment</AccordionTrigger>
						<AccordionContent>
							<ul className="list-disc pl-6 space-y-2">
								<li>A deposit of 25% of the total rental fee is required to secure your booking.</li>
								<li>The remaining balance is due 30 days prior to your arrival date.</li>
								<li>For bookings made less than 30 days in advance, the full payment is due at the time of booking.</li>
								<li>We accept payment via credit card, PayPal, or bank transfer.</li>
							</ul>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="cancellation">
						<AccordionTrigger>Cancellation Policy</AccordionTrigger>
						<AccordionContent>
							<ul className="list-disc pl-6 space-y-2">
								<li>Cancellations made more than 60 days prior to arrival date: Full refund minus a $50 administrative fee.</li>
								<li>Cancellations made 30-60 days prior to arrival date: 50% refund of the total rental fee.</li>
								<li>Cancellations made less than 30 days prior to arrival date: No refund will be provided.</li>
								<li>We strongly recommend purchasing travel insurance to cover unforeseen circumstances.</li>
							</ul>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="check-in-out">
						<AccordionTrigger>Check-in and Check-out</AccordionTrigger>
						<AccordionContent>
							<ul className="list-disc pl-6 space-y-2">
								<li>Check-in time is 4:00 PM. Early check-in may be available upon request, subject to availability.</li>
								<li>Check-out time is 11:00 AM. Late check-out may be available upon request, subject to availability and additional fees.</li>
								<li>Specific check-in instructions will be provided via email 3 days prior to your arrival.</li>
							</ul>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="house-rules">
						<AccordionTrigger>House Rules</AccordionTrigger>
						<AccordionContent>
							<ul className="list-disc pl-6 space-y-2">
								<li>No smoking inside the property. A fee of $250 will be charged for violations.</li>
								<li>No pets allowed without prior approval. Additional pet fees may apply.</li>
								<li>Quiet hours are from 10:00 PM to 8:00 AM. Please be respectful of neighbors.</li>
								<li>The number of guests must not exceed the maximum occupancy stated in the listing.</li>
								<li>No parties or events without prior written approval from the property manager.</li>
							</ul>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="damages">
						<AccordionTrigger>Damages and Liability</AccordionTrigger>
						<AccordionContent>
							<ul className="list-disc pl-6 space-y-2">
								<li>Guests are responsible for any damage to the property or its contents during their stay.</li>
								<li>A security deposit of $500 will be held and returned within 7 days after check-out, provided no damages are found.</li>
								<li>The property owner and manager are not responsible for any accidents, injuries, or illnesses that occur while on the premises.</li>
								<li>Valuables left behind in the property are not the responsibility of the owner or manager.</li>
							</ul>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="maintenance">
						<AccordionTrigger>Maintenance and Repairs</AccordionTrigger>
						<AccordionContent>
							<ul className="list-disc pl-6 space-y-2">
								<li>Guests must report any issues or needed repairs promptly to the property manager.</li>
								<li>The property manager reserves the right to enter the property for emergency repairs.</li>
								<li>For non-emergency maintenance, the property manager will schedule repairs at a mutually convenient time.</li>
							</ul>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="amenities">
						<AccordionTrigger>Amenities and Services</AccordionTrigger>
						<AccordionContent>
							<ul className="list-disc pl-6 space-y-2">
								<li>Linens and towels are provided for your stay.</li>
								<li>Basic toiletries, cleaning supplies, and paper products are provided.</li>
								<li>Wi-Fi is available free of charge. The network name and password will be provided upon check-in.</li>
								<li>Use of amenities such as the pool, hot tub, or fitness center (if applicable) is at the guest&apos;s own risk.</li>
							</ul>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</ScrollArea>

			<div className="flex items-center space-x-2 mb-6">
				<Checkbox id="agree" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
				<label
					htmlFor="agree"
					className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					I have read and agree to the rental agreement and policies
				</label>
			</div>

			<Button disabled={!agreed} onClick={onAcceptClick}>Accept and Continue</Button>
		</div>
	)
}