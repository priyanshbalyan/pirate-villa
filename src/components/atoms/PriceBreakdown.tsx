import { SITE } from "~/config"
import useGetCalculateTotal from "~/hooks/useGetCalculateTotal"
import { cn } from "~/lib/utils"
import { VillaType } from "~/types"
import NumberFlow from "@number-flow/react"
import useTranslation from "~/hooks/useTranslation"
import CollapseAnimate from "../widgets/CollapseAnimate"

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  guests: number;
  villaType: VillaType;
  className?: string
}

export default function PriceBreakdown({ startDate, endDate, guests, villaType, className }: Props) {
  const { data: totalCalculation } = useGetCalculateTotal(startDate ?? new Date(), endDate ?? new Date(), guests, villaType, { enabled: !!startDate && !!endDate })
  const { t } = useTranslation()

  return (
    <div className={cn("text-[13px] mt-8 mx-auto", className)}>
      {t('book_now_price_breakdown_title')}
      <p className="text-xs mb-2 text-gray-700">{t('book_now_price_breakdown_subtitle')}</p>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div>
            <span>{t('book_now_base_rate')}</span>
            <p className="text-xs text-muted-foreground">(<NumberFlow value={totalCalculation?.nights ?? 0} /> nights)</p>
          </div>
          <NumberFlow value={totalCalculation?.baseRate ?? 0} format={{ style: 'currency', currency: 'USD' }}></NumberFlow>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span>{t('book_now_tax')}</span>
            {totalCalculation && <p className="text-xs text-muted-foreground">({totalCalculation?.taxRate * 100}% on nightly rate)</p>}
          </div>
          <NumberFlow value={totalCalculation?.tax ?? 0} format={{ style: 'currency', currency: 'USD' }}></NumberFlow>
        </div>
        <div className="flex justify-between items-center">
          <span>{t('book_now_cleaning_fee')}</span>
          <NumberFlow value={totalCalculation?.cleaningFee ?? 0} format={{ style: 'currency', currency: 'USD' }}></NumberFlow>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span>{t('book_now_processing_fee')}</span>
            {totalCalculation && <p className="text-xs text-muted-foreground">({totalCalculation?.processingFeeRate * 100}% of subtotal)</p>}
          </div>
          <NumberFlow value={totalCalculation?.processingFee ?? 0} format={{ style: 'currency', currency: 'USD' }}></NumberFlow>
        </div>
        <CollapseAnimate>
          {totalCalculation?.extraGuests ? totalCalculation.extraGuests > 0 && <div className="flex justify-between items-center">
            <div>
              <span>{t('book_now_extra_guests_fee')}</span>
              <p className="text-xs text-muted-foreground">(<NumberFlow value={totalCalculation.extraGuests} /> guests @ ${totalCalculation.extraGuestsPerNightFee}/night)</p>
            </div>
            <NumberFlow value={totalCalculation?.extraGuestsFee ?? 0} format={{ style: 'currency', currency: 'USD' }}></NumberFlow>
          </div> : null}
        </CollapseAnimate>
      </div>
      <div className="w-full flex justify-between items-center">
        <span className="text-lg font-bold">{t('book_now_total')}</span>
        <NumberFlow value={totalCalculation?.total ?? 0} format={{ style: 'currency', currency: 'USD' }}></NumberFlow>
      </div>
    </div>
  )
}