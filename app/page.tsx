import type { Metadata } from 'next';

import { SITE } from '~/config.js';

import southExterior from 'public/south-exterior-1.avif'
import northInterior from 'public/north-terrace-patio-2.avif'
import northMiscellaneous from 'public/north-miscellaneous.avif'
import Image from 'next/image';

import { PlayfairDisplay } from '~/components/atoms/Logo';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { CarouselWidget } from '~/components/widgets/CarouselWidget';
import CalendarWidget from '~/components/widgets/CalendarWidget';
import { northPictures, southPictures } from '~/shared/data/pages/home.data';
import GetInTouch from '~/components/widgets/GetInTouch';
import bgPic from 'public/bgpic.jpeg';
import Marquee from '~/components/widgets/Marquee';
import Link from 'next/link';
import BookingYourStayButton from '~/components/widgets/BookYourStayButton';
import { getServerTranslation } from '~/lib/serverTranslation';


export const metadata: Metadata = {
  title: SITE.title,
};

export default async function Page() {
  const { t } = await getServerTranslation()

  return (
    <div>
      <div className="flex flex-col md:flex-row h-fit md:h-[842px]" id="northvilla">
        <Image
          className="m-0 p-0 md:w-1/2 w-full shadow-lg bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 object-cover"
          src={northMiscellaneous}
          width={828}
          height={842}
          alt="North villa"
          sizes="(max-width: 768px) 100vw, 432px"
          priority
          quality={100}
          placeholder="blur"
        />
        <div className="md:w-1/2 w-full bg-site flex flex-col items-center justify-center ">
          <Image
            className="shadow-lg -mt-16 md:mt-0 h-[150px] w-[150px] md:h-[350px] md:w-[350px] rounded-full bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
            src={northInterior}
            width={350}
            height={350}
            alt="Scenic mountain landscape with a lake in the foreground"
            sizes="(max-width: 768px) 100vw, 432px"
            priority
            quality={50}
            placeholder="blur"
          />
          <span className={cn(PlayfairDisplay.className, 'text-3xl md:text-5xl text-primary max-w-[90%] text-center mt-8')}>{t('north_villa_title_1')}</span>
          <span className='max-w-[90%] text-center text-primary text-sm mt-4'>{t('north_villa_subtitle_1')}</span>
          <Link href="/villa?north=true">
            <Button className="bg-primary rounded-full px-10 py-6 mt-4 mb-10">{t('north_villa_button_1')}</Button>
          </Link>
        </div>
      </div>
      <div className='flex flex-col md:flex-row h-fit md:h-[842px]'>
        <div className='md:w-1/2 w-full flex flex-col items-center justify-center border-[#10100f] border-r-[0.5px]'>
          <div className={cn(PlayfairDisplay.className, 'text-3xl md:text-5xl text-site text-center mt-8')}>{t('north_villa_title_2')}</div>
          <div className='mx-8 text-center text-site text-sm mt-4 mb-4'>
            {t('north_villa_subtitle_2')}
          </div>
          <div className='text-xs uppercase mb-4'>{t('check_availability')}</div>
          <CalendarWidget className='mb-6' northVilla={true} />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center border-l-[0.5px]">
          <div className='mb-4 md:hidden'>PICTURES</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <Image
              className="shadow-lg h-[231px] w-[154px] md:h-[298px] md:w-[207px] md: bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
              src={northPictures[2].image}
              width={268}
              height={462}
              alt="Scenic mountain landscape with a lake in the foreground"
              sizes="(max-width: 768px) 100vw, 432px"
              quality={50}
              placeholder="blur"
            />
            <Image
              className="shadow-lg h-[231px] w-[154px] md:h-[298px] md:w-[207px] md: bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
              src={northPictures[4].image}
              width={268}
              height={462}
              alt="Scenic mountain landscape with a lake in the foreground"
              sizes="(max-width: 768px) 100vw, 432px"
              quality={50}
              placeholder="blur"
            />
            <Image
              className="shadow-lg h-[231px] w-[154px] md:h-[298px] md:w-[207px] md: bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
              src={northPictures[9].image}
              width={268}
              height={462}
              alt="Scenic mountain landscape with a lake in the foreground"
              sizes="(max-width: 768px) 100vw, 432px"
              quality={50}
              placeholder="blur"
            />
            <Image
              className="shadow-lg h-[231px] w-[154px] md:h-[298px] md:w-[207px] md: bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
              src={northPictures[3].image}
              width={268}
              height={462}
              alt="Scenic mountain landscape with a lake in the foreground"
              sizes="(max-width: 768px) 100vw, 432px"
              quality={50}
              placeholder="blur"
            />
            <Image
              className="shadow-lg h-[231px] w-[154px] md:h-[298px] md:w-[207px] md: bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
              src={northPictures[4].image}
              width={268}
              height={462}
              alt="Scenic mountain landscape with a lake in the foreground"
              sizes="(max-width: 768px) 100vw, 432px"
              quality={50}
              placeholder="blur"
            />
            <Image
              className="shadow-lg h-[231px] w-[154px] md:h-[298px] md:w-[207px] md: bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
              src={northPictures[11].image}
              width={268}
              height={462}
              alt="Scenic mountain landscape with a lake in the foreground"
              sizes="(max-width: 768px) 100vw, 432px"
              quality={50}
              placeholder="blur"
            />
          </div>
        </div>
      </div>
      <Marquee />
      <div className='w-full flex justify-center'>
        <CarouselWidget />
      </div>


      <div className="flex flex-col-reverse md:flex-row h-fit md:h-[842px]" id="southvilla">
        <div className="w-full md:w-1/2 bg-site flex flex-col items-center justify-center ">
          <Image
            className="z-10 -mt-16 md:mt-0 shadow-lg h-[150px] w-[150px] md:h-[350px] md:w-[350px] rounded-full bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
            src={southPictures[7].image}
            width={350}
            height={350}
            alt="South picture"
            sizes="(max-width: 768px) 100vw, 432px"
            priority
            quality={50}
            placeholder="blur"
          />
          <span className={cn(PlayfairDisplay.className, 'text-3xl md:text-5xl text-primary max-w-[90%] text-center mt-8')}>{t('south_villa_title_1')}</span>
          <span className='max-w-[90%] text-center text-primary text-sm mt-4'>{t('south_villa_subtitle_1')}</span>
          <Link href="/villa">
            <Button className="bg-primary rounded-full px-10 py-6 mt-4 mb-8">{t('south_villa_button_1')}</Button>
          </Link>
        </div>
        <Image
          className="m-0 p-0 w-full md:w-1/2 shadow-lg bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 object-cover"
          src={southExterior}
          width={828}
          height={842}
          alt="South villa"
          sizes="(max-width: 768px) 100vw, 432px"
          priority
          quality={100}
          placeholder="blur"
        />
      </div>
      <div className='flex flex-col-reverse md:flex-row h-fit md:h-[842px]'>
        <div className="md:w-1/2 w-full flex flex-col justify-center items-center border-r-[0.5px] mt-8">
          <div className='mb-4 md:hidden'>{t('pictures')}</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 md:mb-0">
            <Image
              className="shadow-lg h-[231px] w-[154px] md:h-[298px] md:w-[207px] md: bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
              src={southPictures[0].image}
              width={268}
              height={462}
              alt="Scenic mountain landscape with a lake in the foreground"
              sizes="(max-width: 768px) 100vw, 432px"
              quality={50}
              placeholder="blur"
            />
            <Image
              className="shadow-lg h-[231px] w-[154px] md:h-[298px] md:w-[207px] md: bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
              src={southPictures[1].image}
              width={268}
              height={462}
              alt="Scenic mountain landscape with a lake in the foreground"
              sizes="(max-width: 768px) 100vw, 432px"
              quality={50}
              placeholder="blur"
            />
            <Image
              className="shadow-lg h-[231px] w-[154px] md:h-[298px] md:w-[207px] md: bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
              src={southPictures[2].image}
              width={268}
              height={462}
              alt="Scenic mountain landscape with a lake in the foreground"
              sizes="(max-width: 768px) 100vw, 432px"
              quality={50}
              placeholder="blur"
            />
            <Image
              className="shadow-lg h-[231px] w-[154px] md:h-[298px] md:w-[207px] md: bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
              src={southPictures[3].image}
              width={268}
              height={462}
              alt="Scenic mountain landscape with a lake in the foreground"
              sizes="(max-width: 768px) 100vw, 432px"
              quality={50}
              placeholder="blur"
            />
            <Image
              className="shadow-lg h-[231px] w-[154px] md:h-[298px] md:w-[207px] md: bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
              src={southPictures[4].image}
              width={268}
              height={462}
              alt="Scenic mountain landscape with a lake in the foreground"
              sizes="(max-width: 768px) 100vw, 432px"
              quality={50}
              placeholder="blur"
            />
            <Image
              className="shadow-lg h-[231px] w-[154px] md:h-[298px] md:w-[207px] md: bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
              src={southPictures[5].image}
              width={268}
              height={462}
              alt="Scenic mountain landscape with a lake in the foreground"
              sizes="(max-width: 768px) 100vw, 432px"
              quality={50}
              placeholder="blur"
            />
          </div>
        </div>
        <div className='md:w-1/2 w-full flex flex-col items-center justify-center border-[#10100f] border-l-[0.5px]'>
          <div className={cn(PlayfairDisplay.className, 'text-3xl md:text-5xl text-site text-center mt-8 md:mx-4')}>
            {t('south_villa_title_2')}
          </div>
          <div className='mx-8 text-center text-site text-sm mt-4 mb-4'>
            {t('south_villa_subtitle_2')}
          </div>
          <div className='text-xs uppercase mb-4'>{t('check_availability')}</div>
          <CalendarWidget northVilla={false} className='mb-6' />
        </div>
      </div>
      <Marquee />
      <div className='w-full flex justify-center px-4'>
        <CarouselWidget />
      </div>
      <div className='flex flex-col justify-center items-center bg-primary border-[1px] border-line py-10'>
        <div className={cn(PlayfairDisplay.className, 'text-site uppercase text-5xl max-w-lg text-center')}>
          {t('attraction_title_1')}
        </div>
        <p className={cn('text-site max-w-lg text-center mt-4')}>
          {t('attraction_subtitle_1')}
        </p>
      </div>
      <div className={cn(`flex flex-col justify-center items-center border-b-[1px] border-line py-40`, "bg-[url('/scene.jpg')] bg-cover")}>
        <div className="p-10 bg-background rounded-3xl px-4 md:px-36 py-24 flex items-center justify-center flex-col">
          <div className={cn(PlayfairDisplay.className, 'text-site uppercase text-5xl text-center max-w-[690px]')}>
            {t('attraction_title_2')}
          </div>
          <p className={cn('text-site max-w-lg text-center mt-4')}>
            {t('attraction_subtitle_2')}
          </p>
          <BookingYourStayButton />
        </div>
      </div>
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-1/2 flex items-center justify-center flex-col'>
          <Image
            className="shadow-lg -mt-16 md:mt-0 h-[150px] w-[150px] md:h-[300px] md:w-[300px] rounded-full bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
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
    </div>
  );
}
