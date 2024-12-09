'use client'
import Features from '~/components/widgets/Features';
import Testimonials from '~/components/widgets/Testimonials';
import {
	northPictures,
} from '~/shared/data/pages/home.data';
import { southPictures } from '~/shared/data/pages/home.data';
import { Button } from '~/components/ui/button';
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
import { PlayfairDisplay } from '~/utils/utils';
import SafeImage from '../widgets/SafeImage';
import useTranslation from '~/hooks/useTranslation';

export default function VillaPage({ north }: { north: boolean }) {
	const { t, tArray } = useTranslation()
	const villaText = north ? 'North' : 'South'

	const key = !!north ? 'north_villa_page_' : 'south_villa_page_'

	return (
		<>
			<div className="flex flex-col md:flex-row h-fit md:h-[750px]">
				<SafeImage
					className="m-0 p-0 md:w-1/2 w-full shadow-lg bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 object-cover"
					src={t(`${key}image_1`)}
					width={828}
					height={842}
					alt="North villa"
					sizes="(max-width: 768px) 100vw, 432px"
					quality={100}
					placeholder="blur"
					blurDataURL={north ? northPictures[1].image.src : southPictures[0].image.src}
				/>
				<div className="md:w-1/2 w-full bg-site flex flex-col items-center justify-center ">
					<SafeImage
						className="shadow-lg -mt-16 md:mt-0 h-[150px] w-[150px] md:h-[300px] md:w-[300px] rounded-full bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
						src={t(`${key}image_2`)}
						width={350}
						height={350}
						alt="Scenic mountain landscape with a lake in the foreground"
						sizes="(max-width: 768px) 100vw, 432px"
						quality={50}
						placeholder="blur"
						blurDataURL={bgPic.src}
					/>
					<span className={cn(PlayfairDisplay.className, 'text-3xl md:text-4xl text-primary max-w-[90%] text-center mt-8 uppercase')}>{t(`${key}title_1`)}</span>
					<span className='max-w-[90%] text-center text-primary text-sm mt-4 text-[13px]'>{t(`${key}subtitle_1`)}</span>
					<Link href="#booknow">
						<Button className="bg-primary rounded-full px-10 py-6 mt-4 mb-10">{t(`${key}book_now_button`)}</Button>
					</Link>
				</div>
			</div>
			<div className="flex flex-col md:flex-row min-h-[750px] lg:h-fit">
				<div className="md:w-1/2 w-full bg-site flex flex-col items-center justify-center ">
					<span className={cn(PlayfairDisplay.className, 'text-3xl md:text-4xl text-primary max-w-[90%] text-center mt-8 uppercase')}>
						{t(`${key}title_2`)}
					</span>
					<div className="mt-4 flex flex-col justify-center items-center">
						{tArray(`${key}subtitle_2_paragraph`).map(text =>
							<p className='max-w-[90%] text-center text-primary text-[13px] mb-4' key={text}>
								{text}
							</p>
						)}
					</div>
				</div>
				<SafeImage
					className="m-0 p-0 md:w-1/2 w-full shadow-lg bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 object-cover"
					blurDataURL={north ? northPictures[2].image.src : southPictures[1].image.src}
					width={828}
					height={750}
					alt="North villa"
					sizes="(max-width: 768px) 100vw, 432px"
					quality={100}
					placeholder="blur"
					src={t(`${key}image_3`)}
				/>
			</div>
			<div className="flex flex-col-reverse md:flex-row h-fit md:h-[750px]" >
				<SafeImage
					className="m-0 p-0 md:w-1/2 w-full shadow-lg bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 object-cover"
					blurDataURL={north ? northPictures[9].image.src : southPictures[5].image.src}
					width={828}
					height={842}
					alt="North villa"
					sizes="(max-width: 768px) 100vw, 432px"
					placeholder="blur"
					src={t(`${key}image_4`)}
				/>
				<div className="md:w-1/2 w-full bg-background flex flex-col items-center justify-center" id="amenities">
					<span className={cn(PlayfairDisplay.className, 'text-3xl md:text-4xl text-site max-w-[90%] text-center mt-8 uppercase')}>
						{t(`${key}feature_1_title`)}
					</span>
					<div className="grid grid-cols-2 gap-8 mt-4 mx-8 mb-6">
						{tArray(`${key}amenities_titles`).map((text, index) =>
							<>
								<div className='text-right text-[13px]' key={text}>
									{text}
								</div>
								<ul className='text-left text-[13px]' key={text}>
									{tArray(`${key}amenities_descriptions`)?.[index]?.split('<br>')?.map(description => <li key={description}>{description}</li>)}
								</ul>
							</>
						)}
					</div>
				</div>
			</div>
			<Marquee />
			<div className="flex flex-col md:flex-row h-fit md:h-[750px] border-b-site border-[1px]" id="faqs">
				<div className="md:w-1/2 w-full bg-background flex flex-col items-center justify-center">
					<span className={cn(PlayfairDisplay.className, 'text-3xl md:text-4xl text-site max-w-[90%] text-center mt-8 uppercase')}>
						{t(`${key}faq_title`)}
					</span>
					<div className="w-full px-4 md:px-36 mt-8">
						<Accordion type="single" collapsible className="w-full">
							{tArray(`${key}faq_questions`).map((text, index) =>
								<AccordionItem value={index.toString()} key={text}>
									<AccordionTrigger className='text-[13px]'>{text}</AccordionTrigger>
									<AccordionContent className='text-[13px]'>
										{tArray(`${key}faq_answers`)[index]}
									</AccordionContent>
								</AccordionItem>
							)}
						</Accordion>
					</div>
				</div>
				<SafeImage
					className="m-0 p-0 md:w-1/2 w-full shadow-lg bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 object-cover"
					blurDataURL={north ? northPictures[11].image.src : southPictures[4].image.src}
					width={828}
					height={842}
					alt="North villa"
					sizes="(max-width: 768px) 100vw, 432px"
					quality={100}
					placeholder="blur"
					src={t(`${key}image_5`)}
				/>
			</div>
			<div id="booknow">
			</div>

			<BookingProperty north={north} />

			<Features items={tArray(`${key}photo_gallery`).map((text, index) => ({
				title: tArray(`${key}photo_gallery_titles`)[index],
				image: text
			}))} id="photos" />

			<Marquee />
			<div className="bg-[url('/scene.jpg')] bg-cover w-full" id="testimonials">
				<div className="backdrop-brightness-75">
					<Testimonials north={north} />
				</div>
			</div>
			<div className='flex flex-col md:flex-row'>
				<div className='w-full md:w-1/2 flex items-center justify-center flex-col'>
					<SafeImage
						className="shadow-lg mt-8 md:mt-0 h-[150px] w-[150px] md:h-[300px] md:w-[300px] rounded-full bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
						blurDataURL={bgPic.src}
						width={350}
						height={350}
						alt="Scenic mountain landscape with a lake in the foreground"
						sizes="(max-width: 768px) 100vw, 432px"
						quality={50}
						placeholder="blur"
						src={t(`${key}image_6`)}
					/>
					<p className={cn(PlayfairDisplay.className, 'text-3xl mt-8 mb-8')}>{t('contact_property_header')}</p>
					<p className='text-[13px]'>{t('contact_address')}</p>
					<p className="mt-4 text-[13px]">{t('contact_email')}</p>
					<p className="mt-4 text-[13px]">{t('contact_number')}</p>
				</div>
				<div className="w-full md:w-1/2 flex flex-col items-center justify-center h-[750px] px-8 md:px-0" id="contactus">
					<span className={cn(PlayfairDisplay.className, 'uppercase text-5xl mb-4 text-center')}>{t('contact_us_title')}</span>
					<p className="text-center">{t('contact_us_subtitle')}</p>
					<GetInTouch className='flex w-full mt-8 max-w-lg' />
				</div>
			</div>
		</>
	);
}
