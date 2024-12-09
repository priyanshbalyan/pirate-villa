import { ReactNode, useEffect, useRef, useState } from "react";
import autoAnimate from '@formkit/auto-animate'
import { cn } from "~/lib/utils";
import debounce from 'lodash.debounce';

type Props = { children: ReactNode, className?: string; disableDebounce?: boolean }

const delay = 300;

export default function CollapseAnimate({ children, className, disableDebounce }: Props) {
  const ref = useRef(null)
  const [debouncedValue, setDebouncedValue] = useState(children);

  useEffect(() => {
    ref.current && autoAnimate(ref.current)
  }, [])

  useEffect(() => {
    if (disableDebounce) return

    // avoid UI jumping due to too many frequent updates
    // Create a debounced function
    const debouncedUpdate = debounce((newValue: ReactNode) => {
      setDebouncedValue(newValue);
    }, delay);

    // Call the debounced function with the current value
    debouncedUpdate(children);

    // Cleanup to cancel pending debounced calls when the component unmounts
    return () => {
      if (disableDebounce) return
      debouncedUpdate.cancel();
    };
  }, [children, delay]);


  return <div ref={ref} className={cn("relative", className)}>
    {disableDebounce ? children : debouncedValue}
  </div>
}