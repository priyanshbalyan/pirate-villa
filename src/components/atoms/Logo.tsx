'use client';
import Image from 'next/image';
import { cn } from '~/lib/utils';

import LogoText from './LogoText';
import { Suspense } from 'react';
import useTranslation from '~/hooks/useTranslation';
import { PlayfairDisplay } from '~/utils/utils';
import SafeImage from '~/components/widgets/SafeImage';

const Logo = () => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center ml-2 self-center whitespace-nowrap text-2xl font-bold text-gray-900 dark:text-white md:text-xl">
      <SafeImage
        alt="Pirate Villas"
        src={t('header_logo')}
        priority
        width={100}
        height={50}
      />
      <span className={cn(PlayfairDisplay.className, 'text-lg md:text-3xl ml-4 text-site leading-10 font-light')}>
        <Suspense><LogoText /></Suspense>
      </span>
    </div>
  )
};

export default Logo;
