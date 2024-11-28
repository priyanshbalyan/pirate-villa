import { ReactNode, useEffect, useRef } from "react";
import autoAnimate from '@formkit/auto-animate'
import { cn } from "~/lib/utils";

export default function Collapse({ children, className }: { children: ReactNode, className?: string; }) {
  const ref = useRef(null)

  useEffect(() => {
    ref.current && autoAnimate(ref.current)
  })

  return <div ref={ref} className={cn("relative", className)}>
    {children}
  </div>
}