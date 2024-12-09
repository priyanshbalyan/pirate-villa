'use client';
import { Dialog as HeadlessDialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

type DialogProps = {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  children: ReactNode
}

export function Dialog({
  open,
  onClose,
  children,
}: DialogProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // Update the scroll position
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <HeadlessDialog open={open} onClose={() => onClose(false)}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center  p-4 transition duration-300 ease-out data-[closed]:opacity-0 z-[90]"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/40" />
      <div className="fixed inset-0 w-screen overflow-y-auto h-screen p-4 backdrop-blur-lg" style={{ top: scrollY }}>
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel className="max-w-lg space-y-4">
            {children}
          </DialogPanel>
        </div>
      </div>
    </HeadlessDialog>
  )
}