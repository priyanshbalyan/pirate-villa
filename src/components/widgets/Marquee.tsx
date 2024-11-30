import { cn } from "~/lib/utils";
import { PlayfairDisplay } from "../atoms/Logo";

export default function Marquee() {
  return (
    <div className={cn(PlayfairDisplay.className, 'h-[60px] bg-primary flex items-center justify-center  border-[#10100f] border-t-[1px] border-b-[1px]')}>
      <div className="relative flex overflow-x-hidden w-full items-center">
        <div className="py-12 animate-marquee whitespace-nowrap">
          <span className="text-2xl mx-4">* YOUR COZY HOME AWAY FROM HOME</span>
          <span className="text-2xl mx-4 ">* YOUR COZY HOME AWAY FROM HOME</span>
        </div>
        <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap">
          <span className="text-2xl mx-4 invisible md:visible">* YOUR COZY HOME AWAY FROM HOME</span>
          <span className="text-2xl mx-4 invisible md:visible">* YOUR COZY HOME AWAY FROM HOME</span>
        </div>
      </div>
    </div>
  )
}