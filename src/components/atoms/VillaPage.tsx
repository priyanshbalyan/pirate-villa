import Features from '~/components/widgets/Features';
import Testimonials from '~/components/widgets/Testimonials';
import {
	northPictures,
	testimonialsHome,
} from '~/shared/data/pages/home.data';
import { southPictures } from '~/shared/data/pages/home.data';
import { ContactProps } from '~/shared/types';
import Image from 'next/image';
import { Button } from '~/components/ui/button';
import { PlayfairDisplay } from './Logo';
import { cn } from '~/lib/utils';
import bgPic from 'public/bgpic.jpeg'
import Marquee from '~/components/widgets/Marquee';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion"
import Link from 'next/link';
import BookingProperty from '~/components/widgets/BookingProperty';



export default function VillaPage({ north }: { north: boolean }) {
	const villaText = north ? 'North' : 'South'

	const contactHome: ContactProps = {
		hasBackground: true,
		header: {
			title: 'Important Information',
			subtitle: 'You need to know',
		},
		content:
			'',
		items: [
			{
				description: ['Extra-person charges may apply and vary depending on property policy']
			},
			{
				description: ['Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges'],
			},
			{
				description: ['Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed'],
			},
			{
				description: ['Onsite parties or group events are strictly prohibited'],
			},
			{
				description: ['Host has indicated there are no carbon monoxide detectors or gas appliances on the property'],
			},
			{
				description: ['Host has indicated there is a smoke detector on the property'],
			},
		],
		form: {
			title: 'Amenities',
			inputs: [
				{
					type: 'text',
					name: 'name',
					autocomplete: 'off',
					placeholder: 'Your name',
				},
				{
					type: 'email',
					name: 'email',
					autocomplete: 'on',
					placeholder: 'Your email address',
				},
			],
			textarea: {
				cols: 30,
				rows: 5,
				name: 'textarea',
				placeholder: 'Write your message...',
			},
			btn: {
				title: 'Send Message',
				type: 'submit',
			},
		},
	};

	return (
		<>
			<div className="flex flex-col md:flex-row h-fit md:h-[842px]">
				<Image
					className="m-0 p-0 md:w-1/2 w-full shadow-lg bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 object-cover"
					src={north ? northPictures[1].image : southPictures[0].image}
					width={828}
					height={842}
					alt="North villa"
					sizes="(max-width: 768px) 100vw, 432px"
					quality={100}
					placeholder="blur"
				/>
				<div className="md:w-1/2 w-full bg-site flex flex-col items-center justify-center ">
					<Image
						className="shadow-lg -mt-16 md:mt-0 h-[150px] w-[150px] md:h-[350px] md:w-[350px] rounded-full bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
						src={bgPic}
						width={350}
						height={350}
						alt="Scenic mountain landscape with a lake in the foreground"
						sizes="(max-width: 768px) 100vw, 432px"
						quality={50}
						placeholder="blur"
					/>
					<span className={cn(PlayfairDisplay.className, 'text-3xl md:text-5xl text-primary max-w-[90%] text-center mt-8 uppercase')}>BOOK {villaText} VILLA TODAY</span>
					<span className='max-w-[90%] text-center text-primary text-sm mt-4'>Enjoy the ultimate home away from home experience, with every comfort and convenience thoughtfully provided. Relax in style, savor your surroundings, and enjoy a memorable stay.</span>
					<Link href="/book">
						<Button className="bg-primary rounded-full px-10 py-6 mt-4 mb-10">BOOK NOW</Button>
					</Link>
				</div>
			</div>
			<div className="flex flex-col md:flex-row h-fit md:h-[842px]" >
				<div className="md:w-1/2 w-full bg-site flex flex-col items-center justify-center ">
					<span className={cn(PlayfairDisplay.className, 'text-3xl md:text-5xl text-primary max-w-[90%] text-center mt-8 uppercase')}>
						The Pirates Landing {villaText}3-bedroom condo in fabulous Cruz Bay with WiFi, AC
					</span>
					<p className='max-w-[90%] text-center text-primary text-sm mt-4'>
						Pirates Landing {villaText} is exquisite, luxury duplex villas nestled on the pristine shores of Chocolate Hole Beach in St. John, U.S. Virgin Islands. These beautifully designed, high-end retreats offer breathtaking ocean views and are just a quick 5-minute drive from the vibrant Cruz Bay. Each villa is only steps from the beach.
					</p>
					<p className='max-w-[90%] text-center text-primary text-sm mt-4'>
						Both villas boast private jacuzzi, sleek modern kitchens, and air-conditioned interiors, with each spacious bedroom having its own luxurious en-suite bathroom. The open-concept layout creates a seamless indoor-outdoor living experience, ideal for soaking in the island&apos;s natural beauty.
					</p>
					<p className='max-w-[90%] text-center text-primary text-sm mt-4'>
						To elevate your stay, Pirates Landing offers personalized concierge services, including seamless transfers, villa provisioning, excursion bookings and organizing exclusive experiences like beachside yoga sessions or indulgent massages. With convenient access to local grocery stores, dining, and shopping, these villas promise a serene, stress-free escape. Guests also enjoy high-speed Wi-Fi, beach chairs, umbrellas, and coolers, ensuring every beach day is effortless and unforgettable.
					</p>
					<p className='max-w-[90%] text-center text-primary text-sm mt-4'>
						Perfect for those seeking a luxurious yet relaxed getaway in paradise!
					</p>
				</div>
				<Image
					className="m-0 p-0 md:w-1/2 w-full shadow-lg bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 object-cover"
					src={north ? northPictures[2].image : southPictures[1].image}
					width={828}
					height={842}
					alt="North villa"
					sizes="(max-width: 768px) 100vw, 432px"
					quality={100}
					placeholder="blur"
				/>
			</div>
			<div className="flex flex-col md:flex-row h-fit md:h-[842px]" >
				<Image
					className="m-0 p-0 md:w-1/2 w-full shadow-lg bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 object-cover"
					src={north ? northPictures[9].image : southPictures[5].image}
					width={828}
					height={842}
					alt="North villa"
					sizes="(max-width: 768px) 100vw, 432px"
					placeholder="blur"
				/>
				<div className="md:w-1/2 w-full bg-background flex flex-col items-center justify-center" id="amenities">
					<span className={cn(PlayfairDisplay.className, 'text-3xl md:text-5xl text-site max-w-[90%] text-center mt-8 uppercase')}>
						AMENITIES
					</span>
					<div className="grid grid-cols-2 gap-8 mt-4 mx-8 mb-6">
						<div className=' text-right'>
							Essentials
						</div>
						<ul className=' text-left'>
							<li>Wireless Internet</li>
							<li>WiFi</li>
							<li>Towels provided</li>
							<li>Linens provided</li>
						</ul>
						<div className=' text-right'>
							Laundry
						</div>
						<ul className='text-left'>
							<li>Dryer</li>
						</ul>
						<div className='text-right'>
							Safety
						</div>
						<ul className=''>
							<li>No carbon monoxide detector or gas appliances (host has indicated there are no carbon monoxide detectors or gas appliances on the property)</li>
							<li>Smoke detector (host has indicated there is a smoke detector on the property)</li>
						</ul>
						<div className='text-right'>
							Suitability
						</div>
						<ul className=''>
							<li>Minimum age limit of renters</li>
						</ul>
						<div className='text-right'>
							Pets
						</div>
						<ul className=''>
							<li>No pets allowed</li>
						</ul>
					</div>
				</div>
			</div>
			<Marquee />
			<div className="flex flex-col md:flex-row h-fit md:h-[842px] border-b-site border-[1px]" id="faqs">
				<div className="md:w-1/2 w-full bg-background flex flex-col items-center justify-center">
					<span className={cn(PlayfairDisplay.className, 'text-3xl md:text-5xl text-site max-w-[90%] text-center mt-8 uppercase')}>
						FREQUENTLY ASKED QUESTIONS
					</span>
					<div className="w-full px-4 md:px-36 mt-8">
						<Accordion type="single" collapsible className="w-full">
							<AccordionItem value="item-1">
								<AccordionTrigger>Is The Pirates Landing {villaText} 3-bedroom condo in fabulous Cruz Bay with WiFi, AC pet-friendly?</AccordionTrigger>
								<AccordionContent>
									No, pets are not allowed at this property.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger>Where is The Pirates Landing {villaText} 3-bedroom condo in fabulous Cruz Bay with WiFi, AC located?</AccordionTrigger>
								<AccordionContent>
									Situated in St. John, this condo building is steps from Chocolate Hole and 1.9 mi (3.1 km) from Virgin Islands National Park. Chocolate Hole Beach and Sunset Beach are also within 1 mi (2 km).
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
				<Image
					className="m-0 p-0 md:w-1/2 w-full shadow-lg bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 object-cover"
					src={north ? northPictures[11].image : southPictures[4].image}
					width={828}
					height={842}
					alt="North villa"
					sizes="(max-width: 768px) 100vw, 432px"
					quality={100}
					placeholder="blur"
				/>
			</div>

			<Features items={north ? northPictures : southPictures} id="photos" />
			<div id="booknow">
			</div>

			<BookingProperty north={north} />
			<Marquee />
			<div className="bg-site" id="testimonials">
				<Testimonials {...testimonialsHome} />
			</div>
		</>
	);
}
