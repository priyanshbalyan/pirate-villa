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


export const metadata: Metadata = {
  title: SITE.title,
};

export default function Page() {
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
          <span className={cn(PlayfairDisplay.className, 'text-3xl md:text-5xl text-primary max-w-[90%] text-center mt-8')}>YOUR PERFECT COASTAL GETAWAY</span>
          <span className='max-w-[90%] text-center text-primary text-sm mt-4'>Enjoy the ultimate home away from home experience, with every comfort and convenience thoughtfully provided. Relax in style, savor your surroundings, and enjoy a memorable stay.</span>
          <Link href="/villa?north=true">
            <Button className="bg-primary rounded-full px-10 py-6 mt-4 mb-10">VIEW PROPERTY</Button>
          </Link>
        </div>
      </div>
      <div className='flex flex-col md:flex-row h-fit md:h-[842px]'>
        <div className='md:w-1/2 w-full flex flex-col items-center justify-center border-[#10100f] border-r-[0.5px]'>
          <div className={cn(PlayfairDisplay.className, 'text-3xl md:text-5xl text-site text-center mt-8')}>WELCOME TO NORTH VILLA</div>
          <div className='mx-8 text-center text-site text-sm mt-4 mb-4'>
            Hosted by Kim Poss and located in the picturesque coastal town of Cruz Bay, St. John Virgin Islands, Pirate&apos;s Landing is committed to providing you with a memorable stay. Our mission is to ensure every guest experiences the perfect blend of comfort and relaxation. Pirate Villa combines historic charm with modern amenities. Our villa offers a unique and tranquil escape, making it the ideal home away from home for both couples and families.
          </div>
          <div className='text-xs uppercase mb-4'>Check availability</div>
          <CalendarWidget className='mb-6' northVilla={true} />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center border-l-[0.5px]">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <Image
              className="shadow-lg h-[231px] w-[154px] md:h-[298px] md:w-[207px] md: bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
              src={northPictures[0].image}
              width={268}
              height={462}
              alt="Scenic mountain landscape with a lake in the foreground"
              sizes="(max-width: 768px) 100vw, 432px"
              quality={50}
              placeholder="blur"
            />
            <Image
              className="shadow-lg h-[231px] w-[154px] md:h-[298px] md:w-[207px] md: bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
              src={northPictures[1].image}
              width={268}
              height={462}
              alt="Scenic mountain landscape with a lake in the foreground"
              sizes="(max-width: 768px) 100vw, 432px"
              quality={50}
              placeholder="blur"
            />
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
              src={northPictures[5].image}
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
          <span className={cn(PlayfairDisplay.className, 'text-3xl md:text-5xl text-primary max-w-[90%] text-center mt-8')}>YOUR PERFECT COASTAL GETAWAY</span>
          <span className='max-w-[90%] text-center text-primary text-sm mt-4'>Enjoy the ultimate home away from home experience, with every comfort and convenience thoughtfully provided. Relax in style, savor your surroundings, and enjoy a memorable stay.</span>
          <Link href="/villa">
            <Button className="bg-primary rounded-full px-10 py-6 mt-4 mb-8">VIEW PROPERTY</Button>
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
      <div className='flex flex-col md:flex-row h-fit md:h-[842px]'>
        <div className="md:w-1/2 w-full flex flex-col justify-center items-center border-r-[0.5px] mt-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
          <div className={cn(PlayfairDisplay.className, 'text-3xl md:text-5xl text-site text-center mt-8')}>
            WELCOME TO SOUTH VILLA
          </div>
          <div className='mx-8 text-center text-site text-sm mt-4 mb-4'>
            Hosted by Kim Poss and located in the picturesque coastal town of Cruz Bay, St. John Virgin Islands, Pirate&apos;s Landing is committed to providing you with a memorable stay. Our mission is to ensure every guest experiences the perfect blend of comfort and relaxation. Pirate Villa combines historic charm with modern amenities. Our villa offers a unique and tranquil escape, making it the ideal home away from home for both couples and families.
          </div>
          <div className='text-xs uppercase mb-4'>Check availability</div>
          <CalendarWidget northVilla={false} className='mb-6' />
        </div>
      </div>
      <Marquee />
      <div className='w-full flex justify-center px-4'>
        <CarouselWidget />
      </div>
      <div className='flex flex-col justify-center items-center bg-primary border-[1px] border-line py-10'>
        <div className={cn(PlayfairDisplay.className, 'text-site uppercase text-5xl max-w-lg text-center')}>
          Committed to Your Perfect Stay
        </div>
        <p className={cn('text-site max-w-lg text-center mt-4')}>
          At Pirate Villa, our mission is to provide you with an exceptional experience. We are dedicated to ensuring that every aspect of your stay is perfect, from our high-end amenities to our personalized service.
        </p>
      </div>
      <div className={cn(`flex flex-col justify-center items-center border-b-[1px] border-line py-40`, "bg-[url('/scene.jpg')] bg-cover")}>
        <div className="p-10 bg-background rounded-3xl px-4 md:px-36 py-24 flex items-center justify-center flex-col">
          <div className={cn(PlayfairDisplay.className, 'text-site uppercase text-5xl text-center ')}>
            Experience Tranquility<br />and Luxury
          </div>
          <p className={cn('text-site max-w-lg text-center mt-4')}>
            Escape to Pirate Villa, your sanctuary by the sea. Immerse yourself in the comfort and elegance of our fully self-contained accommodation. Reserve your spot today and start your journey to relaxation.
          </p>
          <Button className='mt-4 rounded-full py-6 px-10'>Book Your Stay</Button>
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
          <p className={cn(PlayfairDisplay.className, 'text-3xl mt-8 mb-8')}>PIRATE&apos;S LANDING</p>
          <p>Cruz Bay, St. John Virgin Islands</p>
          <p className="mt-4">email@example.com</p>
          <p className="mt-4">+105 123 4567</p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center h-[842px] px-8 md:px-0" id="contactus">
          <span className={cn(PlayfairDisplay.className, 'uppercase text-5xl mb-4 text-center')}>GET IN TOUCH</span>
          <p className="text-center">Send us a message and we&apos;ll get back to you as soon as possible.</p>
          <GetInTouch className='flex w-full mt-8 max-w-lg' />
        </div>
      </div>
    </div>
  );
}
