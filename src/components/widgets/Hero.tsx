'use client';
import { HeroProps } from '~/shared/types';
import CTA from '../common/CTA';
import { useState } from 'react';

// Create a client


const Hero = ({ title, subtitle, tagline, callToAction2, image, north }: HeroProps) => {
  const className = north ? "bg-[url('/north-miscellaneous.avif')]" : "bg-[url('/south-beach.avif')]"
  return (
    <section id="heroOne" className={`${className} bg-cover bg-center`}>
      <div className='backdrop-blur backdrop-brightness-75  pt-20'>
        <div className="px-4 sm:px-6">
          <div className="py-12 md:py-20">
            <div className="mx-auto max-w-4xl pb-10 text-center md:pb-16">
              {tagline && (
                <p className="text-base font-semibold uppercase tracking-wide text-primary-200">
                  {tagline}
                </p>
              )}
              {title && (
                <h1 className="leading-tighter font-heading mb-6 text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl text-white">
                  {title}
                </h1>
              )}
              <div className="mx-auto max-w-3xl text-white">
                {subtitle && <p className="mb-6 text-xl font-normal">{subtitle}</p>}
                <div className="flex max-w-none flex-col flex-nowrap gap-4 px-4 sm:flex-row sm:justify-center">
                  {callToAction2 && <CTA callToAction={callToAction2} linkClass="btn" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
