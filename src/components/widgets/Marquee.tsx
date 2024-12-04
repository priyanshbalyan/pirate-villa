import { cn } from "~/lib/utils";
import { getServerTranslation } from "~/lib/serverTranslation";
import localFont from "next/font/local";
const PlayfairDisplay = localFont({ src: '../../../public/PlayfairDisplay-Regular.ttf' })

export default async function Marquee() {
  const { t } = await getServerTranslation()

  return (
    <div className={cn(PlayfairDisplay.className, 'h-[60px] bg-primary flex items-center justify-center  border-[#10100f] border-t-[1px] border-b-[1px]')}>
      <div className="relative flex overflow-x-hidden w-full items-center">
        <div className="py-12 animate-marquee whitespace-nowrap">
          <span className={cn(PlayfairDisplay.className, "text-2xl mx-4")}>{t('marquee_text')}</span>
          <span className={cn(PlayfairDisplay.className, "text-2xl mx-4 ")}>{t('marquee_text')}</span>
        </div>
        <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap">
          <span className={cn(PlayfairDisplay.className, "text-2xl mx-4 invisible md:visible")}>{t('marquee_text')}</span>
          <span className={cn(PlayfairDisplay.className, "text-2xl mx-4 invisible md:visible")}>{t('marquee_text')}</span>
        </div>
      </div>
    </div>
  )
}