'use client';

import { usePathname, useSearchParams } from "next/navigation";
import useTranslation from "~/hooks/useTranslation";

export default function LogoText() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const searchParams = useSearchParams()


  if (pathname === '/villa') return !!searchParams.get('north') ? (
    <>
      <div>{t('header_north_villa_title')}</div>
      <div className="text-xs whitespace-pre-wrap">{t('header_north_villa_subtitle')}</div>
    </>
  ) : (
    <>
      <div>{t('header_south_villa_title')}</div>
      <div className="text-xs whitespace-pre-wrap">{t('header_south_villa_subtitle')}</div>
    </>
  )

  return t('header_main_title')
}