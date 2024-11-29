import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { SITE } from "~/config"
import useGetCalculateTotal from "~/hooks/useGetCalculateTotal"
import { cn } from "~/lib/utils"
import { VillaType } from "~/types"

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  guests: number;
  villaType: VillaType;
  className?: string
}

export default function PriceBreakdown({ startDate, endDate, guests, villaType, className }: Props) {
  const { data: totalCalculation } = useGetCalculateTotal(startDate ?? new Date(), endDate ?? new Date(), guests, villaType, { enabled: !!startDate && !!endDate })

  return (
    <Card className={cn("max-w-md mx-auto", className)}>
      <CardHeader>
        <CardTitle>Price Breakdown</CardTitle>
        <CardDescription>Detailed cost breakdown for your stay</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <span>Base Rate</span>
              <p className="text-xs text-muted-foreground">({totalCalculation ? totalCalculation.nights : '...'} nights)</p>
            </div>
            <span>{totalCalculation ? '$' + totalCalculation.baseRate.toFixed(2) : '...'}</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span>Tax</span>
              <p className="text-xs text-muted-foreground">({SITE.TAX_RATE * 100}% on nightly rate)</p>
            </div>
            <span>{totalCalculation ? '$' + totalCalculation.tax.toFixed(2) : '...'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Cleaning Fee</span>
            <span>{totalCalculation ? '$' + totalCalculation.cleaningFee.toFixed(2) : '...'}</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span>Processing Fee</span>
              <p className="text-xs text-muted-foreground">({SITE.PROCESSING_FEE_RATE * 100}% of subtotal)</p>
            </div>
            <span>{totalCalculation ? '$' + totalCalculation.processingFee.toFixed(2) : '...'}</span>
          </div>
          {totalCalculation?.extraGuests && totalCalculation.extraGuests > 0 && <div className="flex justify-between items-center">
            <div>
              <span>Extra Guests Fee</span>
              <p className="text-xs text-muted-foreground">({totalCalculation.extraGuests} guests @ ${SITE.EXTRA_GUEST_PER_NIGHT_FEE}/night)</p>
            </div>
            <span>{totalCalculation ? '$' + totalCalculation.extraGuestsFee.toFixed(2) : '...'}</span>
          </div>}
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between items-center">
          <span className="text-lg font-bold">Total</span>
          <span className="text-lg font-bold">{totalCalculation ? '$' + totalCalculation.total.toFixed(2) : '...'}</span>
        </div>
      </CardFooter>
    </Card>
  )
}