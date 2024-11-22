import type { Metadata } from 'next';

import { SITE } from '~/config.js';

import southExterior from 'public/south-exterior-1.avif'
import northInterior from 'public/north-terrace-patio-2.avif'

import Image from 'next/image';
import { Button } from '~/components/ui/button';
import Link from 'next/link';
import CTA from '~/components/common/CTA';

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
              priority
              className="h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black opacity-10 transition-opacity duration-300 ease-in-out group-hover:opacity-5" />
          <div className="absolute inset-0 flex items-center justify-center">
            <CTA callToAction={{ text: 'View Pirate Villa South', href: '/villa' }} linkClass="btn bg-white/60 backdrop-blur-lg" />
          </div>
        </div>
        <div className="relative w-full h-1/2 md:w-1/2 md:h-full overflow-hidden group">
          <div className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-[1.03]">
            <Image
              src={northInterior}
              alt="Serene beach scene with waves crashing on the shore"
              priority
              className='h-full object-cover'
            />
          </div>
          <div className="absolute inset-0 bg-black opacity-10 transition-opacity duration-300 ease-in-out group-hover:opacity-5" />
          <div className="absolute inset-0 flex items-center justify-center">
            <CTA callToAction={{ text: 'View Pirate Villa North', href: '/villa?north=true' }} linkClass="btn bg-white/60 backdrop-blur-lg" />
          </div>
        </div>
      </div>
    </>
  );
}
