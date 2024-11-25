import type { Metadata } from 'next';

import { SITE } from '~/config.js';

import southExterior from 'public/south-exterior-1.avif'
import northInterior from 'public/north-terrace-patio-2.avif'
import Image from 'next/image';
import ContactUsWidget from '~/components/widgets/ContactUsWidget';
import DateWidget from '~/components/widgets/DateWidget';
import CTA from '~/components/common/CTA';

export const metadata: Metadata = {
  title: SITE.title,
};

export default function Page() {
  return (
    <div className='mx-auto max-w-[1000px]'>
      <h1 className='text-3xl font-bold'>The Pirate Landing North</h1>
      <div className='sm:flex mt-2'>
        <div className='sm:w-6/12'>
          <div className="relative">
            <Image
              className="mx-auto w-full rounded-lg shadow-lg bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01]"
              src={northInterior}
              width={828}
              height={828}
              alt="Scenic mountain landscape with a lake in the foreground"
              sizes="(max-width: 768px) 100vw, 432px"
              priority
              quality={50}
              placeholder="blur"
            />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <CTA callToAction={{ text: 'View Pirate Villa North', href: '/villa?north=true' }} linkClass="btn bg-white/60 backdrop-blur-lg" />
            </div>
          </div>
          <div className='p-4'>
            <DateWidget northVilla={true} />
          </div>
        </div>
        <div className="px-4 sm:w-6/12 text-justify">
          <h2 className='font-bold text-center mt-2 mb-2'>The Pirate&apos;s Landing North 3-bedroom condo with WiFi, AC in enchanting Cruz Bay</h2>
          <p>Pirates Landing North and South are exquisite, luxury duplex villas nestled on the pristine shores of Chocolate Hole Beach in St. John, U.S. Virgin Islands. These beautifully designed, high-end retreats offer breathtaking ocean views and are just a quick 5-minute drive from the vibrant Cruz Bay. Each villa is only steps from the beach.</p>
          <br />
          <p>Both villas boast private jacuzzi, sleek modern kitchens, and air-conditioned interiors, with each spacious bedroom having its own luxurious en-suite bathroom. The open-concept layout creates a seamless indoor-outdoor living experience, ideal for soaking in the island&apos;s natural beauty.</p>
          <br />
          <p>To elevate your stay, Pirates Landing offers personalized concierge services, including seamless transfers, villa provisioning, excursion bookings and organizing exclusive experiences like beachside yoga sessions or indulgent massages. With convenient access to local grocery stores, dining, and shopping, these villas promise a serene, stress-free escape. Guests also enjoy high-speed Wi-Fi, beach chairs, umbrellas, and coolers, ensuring every beach day is effortless and unforgettable.</p>
          <br />
          <p>Perfect for those seeking a luxurious yet relaxed getaway in paradise!</p>
          <div className='w-full flex items-center justify-center h-[150px]'>
            <ContactUsWidget fixed={false} />
          </div>
        </div>
      </div>
      <h1 className='mt-10 text-3xl font-bold'>The Pirate Landing South</h1>
      <div className='sm:flex mt-2'>
        <div className="pr-4 sm:w-6/12 text-justify mt-2">
          <h2 className="font-bold text-center mt-2 mb-2">The Pirate&apos;s Landing South 3-bedroom condo with WiFi, AC in enchanting Cruz Bay</h2>
          <p>Pirates Landing North and South are exquisite, luxury duplex villas nestled on the pristine shores of Chocolate Hole Beach in St. John, U.S. Virgin Islands. These beautifully designed, high-end retreats offer breathtaking ocean views and are just a quick 5-minute drive from the vibrant Cruz Bay. Each villa is only steps from the beach.</p>
          <br />
          <p>Both villas boast private jacuzzi, sleek modern kitchens, and air-conditioned interiors, with each spacious bedroom having its own luxurious en-suite bathroom. The open-concept layout creates a seamless indoor-outdoor living experience, ideal for soaking in the island&apos;s natural beauty.</p>
          <br />
          <p>To elevate your stay, Pirates Landing offers personalized concierge services, including seamless transfers, villa provisioning, excursion bookings and organizing exclusive experiences like beachside yoga sessions or indulgent massages. With convenient access to local grocery stores, dining, and shopping, these villas promise a serene, stress-free escape. Guests also enjoy high-speed Wi-Fi, beach chairs, umbrellas, and coolers, ensuring every beach day is effortless and unforgettable.</p>
          <br />
          <p>Perfect for those seeking a luxurious yet relaxed getaway in paradise!</p>
          <div className='w-full flex items-center justify-center h-[150px]'>
            <ContactUsWidget fixed={false} />
          </div>
        </div>
        <div className='sm:w-6/12'>
          <div className='relative'>
            <Image
              className="mx-auto w-full rounded-lg shadow-lg bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01]"
              src={southExterior}
              width={828}
              height={828}
              alt="Scenic mountain landscape with a lake in the foreground"
              sizes="(max-width: 768px) 100vw, 432px"
              priority
              placeholder='blur'
              quality={50}
            />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <CTA callToAction={{ text: 'View Pirate Villa South', href: '/villa' }} linkClass="btn bg-white/60 backdrop-blur-lg" />
            </div>
          </div>
          <div className='p-4'>
            <DateWidget northVilla={false} />
          </div>
        </div>

      </div>
    </div>
  );
}
