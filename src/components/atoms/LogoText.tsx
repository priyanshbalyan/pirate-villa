'use client';

import { usePathname, useSearchParams } from "next/navigation";

export default function LogoText() {
  const pathname = usePathname()
  const searchParams = useSearchParams()


  if (pathname === '/villa') return !!searchParams.get('north') ? (
    <>
      <div>North Villa</div>
      <div className="text-xs whitespace-pre-wrap">Welcome to Pirates Landing Villa North, your perfect Caribbean Getaway</div>
    </>
  ) : (
    <>
      <div>South Villa</div>
      <div className="text-xs whitespace-pre-wrap">Welcome to Pirates Landing Villa South, your perfect Caribbean Getaway</div>
    </>
  )

  return 'PIRATE\'S LANDING'
}