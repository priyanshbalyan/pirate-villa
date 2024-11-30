'use client';
import Image, { StaticImageData } from "next/image";
import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"
import { northPictures } from "~/shared/data/pages/home.data";
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

const DialogContent = ({ selectedImage, onClose }: { selectedImage: StaticImageData | null, onClose: () => void }) => {
  return <div>
    <Image
      src={selectedImage as StaticImageData}
      alt={'Full screen'}
      className="object-cover"
      quality={100}
    />
  </div>
}

export function CarouselWidget() {
  const timeoutRef = React.useRef<NodeJS.Timeout>()
  const [selectedImage, setSelectedImage] = React.useState<StaticImageData | null>(null)
  const [modalOpen, setModalOpen] = React.useState(false)

  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
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
      setSelectedImage(null)
    }, 500)
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div>
      <Carousel
        opts={{
          align: "start",
          loop: true
        }}
        className="w-full relative py-10 "
      >
        <CarouselContent>
          {northPictures.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex justify-center">
              <div
                key={index}
                className="relative overflow-hidden rounded-lg  group"
                onClick={() => { clearTimeout(timeoutRef.current); setSelectedImage(item.image); setModalOpen(true) }}
              >
                <Image
                  className="mx-2 shadow-lg w-[100%] rounded-lg h-[100%] dark:bg-slate-700 transition-transform ease-in-out duration-300 object-cover hover:scale-[1.01]"
                  src={item.image}
                  height={200}
                  alt={item.title}
                  sizes="(max-width: 768px) 100vw, 432px"
                  quality={50}
                  placeholder="blur"
                />
                <div className="ml-[10px] rounded-lg absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 ease-in-out" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-10" />
        <CarouselNext className="absolute top-1/2 right-10" />
      </Carousel>


      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}
        transition
        className="fixed inset-0 flex w-screen items-center justify-center  p-4 transition duration-300 ease-out data-[closed]:opacity-0 z-[90]"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 w-screen overflow-y-auto h-screen p-4 backdrop-blur-lg" style={{ top: scrollY }}>
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel className="max-w-lg space-y-4">
              <DialogContent selectedImage={selectedImage} onClose={handleClose} />
            </DialogPanel>
          </div>
        </div>
      </Dialog>

    </div>
  )
}
