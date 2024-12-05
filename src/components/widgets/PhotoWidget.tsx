'use client';
import Image from "next/image";
import useTranslation from "~/hooks/useTranslation";

export default function PhotoWidget({ north }: { north: boolean }) {
  const { tArray } = useTranslation()

  return <>
    {tArray(north ? 'main_page_north_villa_image_grid' : 'main_page_south_villa_image_grid').map((text, index) => (
      <Image
        key={index}
        className="shadow-lg h-[231px] w-[154px] md:h-[298px] md:w-[207px] md: bg-gray-400 dark:bg-slate-700 transition-transform ease-in-out duration-300 hover:scale-[1.01] object-cover"
        src={text}
        width={268}
        height={462}
        alt={tArray(north ? 'main_page_north_villa_image_grid_titles' : 'main_page_south_villa_image_grid_titles')[index]}
        sizes="(max-width: 768px) 100vw, 432px"
        quality={50}
      // placeholder="blur"
      />
    ))}
  </>
}