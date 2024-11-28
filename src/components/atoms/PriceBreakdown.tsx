import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { SITE } from "~/config"
import useGetCalculateTotal from "~/hooks/useGetCalculateTotal"
import { VillaType } from "~/types"
import { DATE_FORMAT_STRING } from "~/utils/utils"

export default function PriceBreakdown(startDate: Date, endDate: Date, guests: number, villaType: VillaType) {
  const { data: totalCalculation } = useGetCalculateTotal(startDate, endDate, guests, villaType)

  if (!totalCalculation) return null

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Price Breakdown</CardTitle>
        <CardDescription>Detailed cost breakdown for your stay</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <span>Base Rate</span>
              <p className="text-xs text-muted-foreground">({totalCalculation.nights} nights)</p>
            </div>
            <span>${totalCalculation.baseRate.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span>Tax</span>
              <p className="text-xs text-muted-foreground">({SITE.TAX_RATE}% on nightly rate)</p>
            </div>
            <span>${totalCalculation.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Cleaning Fee</span>
            <span>${totalCalculation.cleaningFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span>Processing Fee</span>
              <p className="text-xs text-muted-foreground">({SITE.PROCESSING_FEE_RATE}% of subtotal)</p>
            </div>
            <span>${totalCalculation.processingFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span>Extra Guests Fee</span>
              <p className="text-xs text-muted-foreground">({totalCalculation.extraGuests} guests @ ${SITE.EXTRA_GUEST_PER_NIGHT_FEE}/night)</p>
            </div>
            <span>${totalCalculation.extraGuestsFee.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between items-center">
          <span className="text-lg font-bold">Total</span>
          <span className="text-lg font-bold">${totalCalculation.total.toFixed(2)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}