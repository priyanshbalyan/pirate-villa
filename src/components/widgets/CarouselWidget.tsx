'use client';
import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"
import useTranslation from "~/hooks/useTranslation";
import SafeImage from "./SafeImage";
import { cn } from "~/lib/utils";
import { PlayfairDisplay } from "~/utils/utils";
import { Dialog } from "../ui/dialog";

const DialogContent = ({ selectedImage, onClose }: { selectedImage: string | null, onClose: () => void }) => {
  return <div className="max-w-[100%]">
    <SafeImage
      src={selectedImage!}
      alt={'Full screen'}
      className="object-cover"
      quality={100}
      width={1000}
      height={1000}
    />
  </div>
}

export function CarouselWidget({ north }: { north: boolean }) {
  const { tArray } = useTranslation()
  const timeoutRef = React.useRef<NodeJS.Timeout>()
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null)
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
          {tArray(north ? 'main_page_north_villa_carousel' : 'main_page_south_villa_carousel').map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex justify-center">
              <div
                key={index}
                className="relative overflow-hidden rounded-lg  group"
                onClick={() => { clearTimeout(timeoutRef.current); setSelectedImage(image); setModalOpen(true) }}
              >
                <SafeImage
                  className="mx-2 shadow-lg w-[410px] h-[300px] rounded-lg dark:bg-slate-700 transition-transform ease-in-out duration-300 object-cover hover:scale-[1.01]"
                  src={image}
                  height={300}
                  width={400}
                  alt={tArray(north ? 'main_page_north_villa_carousel_titles' : 'main_page_south_villa_carousel_titles')[index]}
                  sizes="(max-width: 768px) 100vw, 432px"
                  quality={50}
                // placeholder="blur"
                />
                <div className="ml-[10px] mr-[10px] rounded-lg absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 ease-in-out" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <h2 className={cn(PlayfairDisplay.className, "text-lg font-semibold")}>{tArray(north ? 'main_page_north_villa_carousel_titles' : 'main_page_south_villa_carousel_titles')[index]}</h2>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-10" />
        <CarouselNext className="absolute top-1/2 right-10" />
      </Carousel>


      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}
      >
        <DialogContent selectedImage={selectedImage} onClose={handleClose} />
      </Dialog>

    </div>
  )
}
