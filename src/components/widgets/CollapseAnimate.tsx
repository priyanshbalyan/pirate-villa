import { ReactNode, useEffect, useRef, useState } from "react";
import autoAnimate from '@formkit/auto-animate'
import { cn } from "~/lib/utils";
import debounce from 'lodash.debounce';

const delay = 300;
export default function CollapseAnimate({ children, className }: { children: ReactNode, className?: string; }) {
  const ref = useRef(null)
  const [debouncedValue, setDebouncedValue] = useState(children);

  useEffect(() => {
    ref.current && autoAnimate(ref.current)
  }, [])

  useEffect(() => {
    // Create a debounced function
    const debouncedUpdate = debounce((newValue: ReactNode) => {
      setDebouncedValue(newValue);
    }, delay);

    // Call the debounced function with the current value
    debouncedUpdate(children);

    // Cleanup to cancel pending debounced calls when the component unmounts
    return () => {
      debouncedUpdate.cancel();
    };
  }, [children, delay]);


  return <div ref={ref} className={cn("relative", className)}>
    {debouncedValue}
  </div>
}