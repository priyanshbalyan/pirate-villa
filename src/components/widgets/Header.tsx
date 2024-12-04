'use client';

import { useRef, useState } from 'react';
import { useOnClickOutside } from '~/hooks/useOnClickOutside';
// import ToggleDarkMode from '~/components/atoms/ToggleDarkMode';
import Link from 'next/link';
import Logo from '~/components/atoms/Logo';
import { headerData } from '~/shared/data/global.data';
import { cn } from '~/lib/utils';
import { usePathname } from 'next/navigation';
import useTranslation from '~/hooks/useTranslation';

const Header = () => {
  const { t } = useTranslation()
  const { links, actions, isSticky, showToggleTheme, showRssFeed, position } = headerData;

  const ref = useRef(null);
  const pathname = usePathname()

  const updatedIsDropdownOpen =
    links &&
    links.map(() => {
      return false;
    });

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean[]>(updatedIsDropdownOpen as boolean[]);
  const [isToggleMenuOpen, setIsToggleMenuOpen] = useState<boolean>(false);

  const handleDropdownOnClick = (index: number) => {
    setIsDropdownOpen((prevValues) => {
      const newValues = [...(prevValues as boolean[])];
      newValues.forEach((value, i) => {
        if (value === true) {
          newValues[i] = false;
        } else {
          newValues[i] = i === index;
        }
      });
      return newValues;
    });
  };

  const handleCloseDropdownOnClick = (index: number) => {
    setIsDropdownOpen((prevValues) => {
      const newValues = [...(prevValues as boolean[])];
      newValues[index] = false;
      return newValues;
    });
  };

  const handleToggleMenuOnClick = () => {
    setIsToggleMenuOpen(!isToggleMenuOpen);
  };

  useOnClickOutside(ref, () => {
    setIsDropdownOpen(updatedIsDropdownOpen as boolean[]);
  });

  return (
    <header
      className={cn(
        "top-0 z-40 mx-auto w-full flex-none transition-all duration-100 ease-in backdrop-blur-lg",
        isSticky ? 'sticky' : 'relative',
        isToggleMenuOpen ? 'h-screen md:h-auto' : 'h-auto',
        'bg-primary'
      )}
      id="header"
    >
      <div className="mx-auto w-full max-w-7xl md:flex md:justify-between md:py-3.5 md:px-4">
        <div
          className={`flex justify-between py-3 px-3 md:py-0 md:px-0 ${isToggleMenuOpen
            ? 'md:bg-transparent md:dark:bg-transparent md:border-none  dark:bg-slate-900 border-b border-gray-200 dark:border-slate-600'
            : ''
            }`}
        >
          <Link
            className="flex items-center"
            href="/"
            onClick={() =>
              isToggleMenuOpen ? handleToggleMenuOnClick() : setIsDropdownOpen(updatedIsDropdownOpen as boolean[])
            }
          >
            <Logo />
          </Link>
          <div className="flex items-center md:hidden">
            {/* <ToggleDarkMode /> */}
          </div>
        </div>
        <div
          className={`${isToggleMenuOpen ? 'block' : 'hidden'
            } fixed bottom-0 left-0 w-full justify-end p-3 md:static md:mb-0 md:flex md:w-auto md:self-center md:p-0 md:bg-transparent md:dark:bg-transparent md:border-none bg-transparent dark:bg-slate-900 border-t border-gray-200 dark:border-slate-600`}
        >
          <div className="flex w-full items-center justify-between md:w-auto">
            {pathname === '/' && <>
              <a href="#northvilla" className="cursor-pointer bg-primary rounded-full px-4 py-2 text-site underline">{t('header_north_villa')}</a>
              <a href="#southvilla" className=" cursor-pointer bg-primary rounded-full px-4 py-2 text-site underline">{t('header_south_villa')}</a>
              <a href="#contactus" className=" cursor-pointer bg-primary rounded-full px-4 py-2 text-site underline">{t('header_contact_us')}</a>
            </>
            }
            {pathname === '/villa' && <>
              <a href="#booknow" className=" cursor-pointer bg-primary rounded-full px-4 py-2 text-site underline">{t('header_book_this_villa')}</a>
              <a href="#amenities" className=" cursor-pointer bg-primary rounded-full px-4 py-2 text-site underline">{t('header_amenities')}</a>
              <a href="#faqs" className=" cursor-pointer bg-primary rounded-full px-4 py-2 text-site underline">{t('header_faqs')}</a>
              <a href="#photos" className=" cursor-pointer bg-primary rounded-full px-4 py-2 text-site underline">{t('header_photos')}</a>
              <a href="#contactus" className=" cursor-pointer bg-primary rounded-full px-4 py-2 text-site underline">{t('header_contact_us')}</a>
            </>
            }

            {/* <ToggleDarkMode /> */}
          </div>
        </div>
      </div>
    </header >
  );
};

export default Header;
