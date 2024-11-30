import Image from 'next/image';
import logo from 'public/pirate-villa-logo.png'
import { cn } from '~/lib/utils';

import localFont from 'next/font/local'
export const PlayfairDisplay = localFont({ src: '../../../public/PlayfairDisplay-Regular.ttf' })

const Logo = () => (
  <div className="flex items-center ml-2 self-center whitespace-nowrap text-2xl font-bold text-gray-900 dark:text-white md:text-xl">
    <Image
      alt="Pirate Villas"
      src={logo}
      placeholder='blur'
      width={100}
      height={50}
    />
    <span className={cn(PlayfairDisplay.className, 'text-lg md:text-4xl ml-4 text-site leading-10 font-light')}>PIRATE&apos;S LANDING</span>
  </div>
);

export default Logo;
