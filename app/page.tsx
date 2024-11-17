import type { Metadata } from 'next';

import { SITE } from '~/config.js';

import southExterior from 'public/south-exterior-1.avif'
import northInterior from 'public/north-terrace-patio-2.avif'

import Image from 'next/image';
import { Button } from '~/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: SITE.title,
};

export default function Page() {
  return (
    <>
      <div className="fixed inset-0 flex flex-col md:flex-row w-full h-full min-h-full">
        <div className="relative w-full h-1/2 md:w-1/2 md:h-full overflow-hidden group">
          <div className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-[1.03]">
            <Image
              src={southExterior}
              alt="Scenic mountain landscape with a lake in the foreground"
              objectFit="cover"
              priority
              className="h-full"
            />
          </div>
          <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-300 ease-in-out group-hover:opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Link href="/villa">
              <Button variant="outline" size="lg" className="bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-300 dark:text-white dark:bg-transparent backdrop-blur-md">
                View Pirate Villa South
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative w-full h-1/2 md:w-1/2 md:h-full overflow-hidden group">
          <div className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-[1.03]">
            <Image
              src={northInterior}
              alt="Serene beach scene with waves crashing on the shore"
              objectFit="cover"
              priority
              className='h-full'
            />
          </div>
          <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-300 ease-in-out group-hover:opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Link href="/villa?north=true">
              <Button variant="outline" size="lg" className="bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-300 dark:text-white dark:bg-transparent backdrop-blur-md">
                View Pirate Villa North
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div id="headlessui-portal-root"></div>
    </>
  );
}
