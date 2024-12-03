import Features from '~/components/widgets/Features';
import Testimonials from '~/components/widgets/Testimonials';
import {
	northPictures,
} from '~/shared/data/pages/home.data';
import { southPictures } from '~/shared/data/pages/home.data';
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
import GetInTouch from '~/components/widgets/GetInTouch';
import { getServerTranslation } from '~/lib/serverTranslation';

export default async function VillaPage({ north }: { north: boolean }) {
	const { t, tArray } = await getServerTranslation()
	const villaText = north ? 'North' : 'South'

	const key = !!north ? 'north_villa_page_' : 'south_villa_page_'

	const testimonialsHome = {
		id: 'testimonials-on-home',
		hasBackground: true,
		header: {
			title: 'What our guests say about us',
			subtitle:
				'',
		},
		testimonials: tArray(`${key}testimonial_header_name`).map((text, index) => ({
			name: text,
			job: tArray(`${key}testimonial_header_subtitle`)[index],
			testimonial: tArray(`${key}testimonial_message`)[index],
			image: {
				src: tArray(`${key}testimonial_image`)[index],
				alt: text
			},
			href: '/'
		}))
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
					<span className={cn(PlayfairDisplay.className, 'text-3xl md:text-5xl text-primary max-w-[90%] text-center mt-8 uppercase')}>{t(!!north ? 'north_villa_page_title_1' : 'south_villa_page_title_1')}</span>
					<span className='max-w-[90%] text-center text-primary text-sm mt-4'>{t(`${key}subtitle_1`)}</span>
					<Link href="#booknow">
						<Button className="bg-primary rounded-full px-10 py-6 mt-4 mb-10">{t(`${key}book_now_button`)}</Button>
					</Link>
				</div>
			</div>
			<div className="flex flex-col md:flex-row min-h-[942px] lg:h-fit">
				<div className="md:w-1/2 w-full bg-site flex flex-col items-center justify-center ">
					<span className={cn(PlayfairDisplay.className, 'text-3xl md:text-5xl text-primary max-w-[90%] text-center mt-8 uppercase')}>
						{t(`${key}title_2`)}
					</span>
					<div className="mt-4 flex flex-col justify-center items-center">
						{tArray(`${key}subtitle_2_paragraph_1`).map(text =>
							<p className='max-w-[90%] text-center text-primary text-sm mb-4' key={text}>
								{text}
							</p>
						)}
					</div>
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
			<div className="flex flex-col-reverse md:flex-row h-fit md:h-[842px]" >
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
						{t(`${key}feature_1_title`)}
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
						{t(!!north ? 'north_villa_page_faq_title' : 'south_villa_page_faq_title')}
					</span>
					<div className="w-full px-4 md:px-36 mt-8">
						<Accordion type="single" collapsible className="w-full">
							{tArray(`${key}faq_questions`).map((text, index) =>
								<AccordionItem value={index.toString()} key={text}>
									<AccordionTrigger>{text}</AccordionTrigger>
									<AccordionContent>
										{tArray(`${key}faq_answers`)[index]}
									</AccordionContent>
								</AccordionItem>
							)}
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
			<div id="booknow">
			</div>

			<BookingProperty north={north} />

			<Features items={north ? northPictures : southPictures} id="photos" />

			<Marquee />
			<div className="bg-[url('/scene.jpg')] bg-cover w-full" id="testimonials">
				<Testimonials {...testimonialsHome} />
			</div>
			<div className='flex flex-col md:flex-row'>
				<div className='w-full md:w-1/2 flex items-center justify-center flex-col'>
					<Image
						className="shadow-lg mt-8 md:mt-0 h-[150px] w-[150px] md:h-[300px] md:w-[300px] rounded-full bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
						src={bgPic}
						width={350}
						height={350}
						alt="Scenic mountain landscape with a lake in the foreground"
						sizes="(max-width: 768px) 100vw, 432px"
						quality={50}
						placeholder="blur"
					/>
					<p className={cn(PlayfairDisplay.className, 'text-3xl mt-8 mb-8')}>{t('contact_property_header')}</p>
					<p>{t('contact_address')}</p>
					<p className="mt-4">{t('contact_email')}</p>
					<p className="mt-4">{t('contact_number')}</p>
				</div>
				<div className="w-full md:w-1/2 flex flex-col items-center justify-center h-[842px] px-8 md:px-0" id="contactus">
					<span className={cn(PlayfairDisplay.className, 'uppercase text-5xl mb-4 text-center')}>{t('contact_us_title')}</span>
					<p className="text-center">{t('contact_us_subtitle')}</p>
					<GetInTouch className='flex w-full mt-8 max-w-lg' />
				</div>
			</div>
		</>
	);
}
