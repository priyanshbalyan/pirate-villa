'use client';

import { usePathname, useSearchParams } from "next/navigation";

export default function LogoText() {
  const pathname = usePathname()
  const searchParams = useSearchParams()


  if (pathname === '/villa') return !!searchParams.get('north') ? 'North Villa' : 'South Villa'

  return 'PIRATE\'S LANDING'
}