'use client';

import { usePathname, useSearchParams } from "next/navigation";
import useTranslation from "~/hooks/useTranslation";

export default function LogoText() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const searchParams = useSearchParams()


  if (pathname === '/north-villa') {
    return (
      <>
        <div>{t('header_north_villa_title')}</div>
        <div className="text-xs whitespace-pre-wrap hidden md:block">{t('header_north_villa_subtitle')}</div>
      </>
    )
  }
  if (pathname === '/south-villa') {
    return (
      <>
        <div>{t('header_south_villa_title')}</div>
        <div className="text-xs whitespace-pre-wrap hidden md:block">{t('header_south_villa_subtitle')}</div>
      </>
    )
  }

  return t('header_main_title')
}