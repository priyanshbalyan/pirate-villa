import { useState } from "react"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion'
import { ScrollArea } from '~/components/ui/scroll-area'
import useTranslation from "~/hooks/useTranslation"
import { cn } from "~/lib/utils"
import { PlayfairDisplay } from "~/utils/utils"
import { Card } from "../ui/card"

export default function RentalAgreement({ onAcceptClick }: { onAcceptClick: () => void }) {
	const [agreed, setAgreed] = useState(false)
	const { t, tArray } = useTranslation()

	return (
		<Card className=" mx-auto px-8 pb-8 pt-6 max-h-[90%] ">
			<h1 className={cn(PlayfairDisplay.className, "text-3xl font-bold mb-6 dark:text-black")}>{t('terms_and_conditions_title')}</h1>
			<p className="text-gray-600 mb-6">
				{t('terms_and_conditions_subtitle')}
			</p>

			<ScrollArea className=" border rounded-md p-4 mb-6 ">
				<Accordion type="single" collapsible className="w-full dark:text-black">
					{tArray('terms_and_conditions_points').map((text, index) =>
						<AccordionItem value={index.toString()} key={index}>
							<AccordionTrigger>{text}</AccordionTrigger>
							<AccordionContent>
								<ul className="list-disc pl-6 space-y-2">
									{tArray('terms_and_conditions_description')?.[index]?.split('<br>').map(description => <li key={description}>{description}</li>)}
								</ul>
							</AccordionContent>
						</AccordionItem>
					)}
				</Accordion>
			</ScrollArea>

			<div className="flex items-center space-x-2 mb-6 dark:text-black">
				<Checkbox id="agree" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
				<label
					htmlFor="agree"
					className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					{t('terms_and_conditions_i_agree')}
				</label>
			</div>

			<Button className="dark:text-black" disabled={!agreed} onClick={onAcceptClick}>{t('terms_accept_button')}</Button>
		</Card>
	)
}