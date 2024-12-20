'use client';

import type { ItemGrid as ItemGridType } from '~/shared/types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cn } from '~/lib/utils';
import { PlayfairDisplay } from '~/utils/utils';
import SafeImage from '../widgets/SafeImage';
import { Dialog } from '../ui/dialog';

const ItemGrid = ({
  items,
}: ItemGridType) => {
  const [selectedImage, setSelectedImage] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

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


  const handleClose = () => {
    setModalOpen(false)
    timeoutRef.current = setTimeout(() => {
      setSelectedImage('')
    }, 500)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])


  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {(items || []).map(({ title, description, image, callToAction }, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg group"
            onClick={() => { clearTimeout(timeoutRef.current); setSelectedImage(image as string); setModalOpen(true) }}
          >
            <div className="aspect-w-3 aspect-h-2">
              <SafeImage
                src={image as string}
                alt={title as string}
                className="h-[312px] w-full transition-transform duration-300 ease-in-out group-hover:scale-110 object-cover shadow-lg bg-gray-400 dark:bg-slate-700"
                // placeholder="blur"
                width={312}
                height={312}
                quality={50}
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 ease-in-out" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <h2 className={cn(PlayfairDisplay.className, "text-lg font-semibold")}>{title}</h2>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}
      >
        <Image
          src={selectedImage}
          alt={'Full screen'}
          placeholder="blur"
          width={1000}
          height={1000}
          className="min-h-full min-w-full  object-cover"
          blurDataURL='/bgpic.png'
        />
      </Dialog>
    </div>
  );
};

export default ItemGrid;
