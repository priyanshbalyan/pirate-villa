import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import useGetFeeRates, { getFeeRatesQueryKey } from '~/hooks/useGetFeeRates'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useToast } from '~/hooks/use-toast'
import updateFeeRate from '~/hooks/useUpdateFeeRates'
import { useQueryClient } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'

export function FeeAdjustment() {
  const { data, isLoading } = useGetFeeRates()

  const [cleaningFee, setCleaningFee] = useState<string>('')
  const [defaultPricePerDay, setDefaultPricePerDay] = useState<string>('')
  const [taxRate, setTaxRate] = useState<string>('')
  const [processingFeeRate, setProcessingFeeRate] = useState<string>('')
  const [extraGuestsPerNightFee, setExtraGuestsPerNightFee] = useState<string>('')

  const { toast } = useToast()

  const queryClient = useQueryClient()

  useEffect(() => {
    if (data) {
      setCleaningFee(data.cleaningFee.toString())
      setDefaultPricePerDay(data.defaultPricePerDay.toString())
      setTaxRate(data.taxRate.toString())
      setProcessingFeeRate(data.processingFeeRate.toString())
      setExtraGuestsPerNightFee(data.extraGuestsPerNightFee.toString())
    }
  }, [data])

  const handleChange = (dispatchFn: Dispatch<SetStateAction<string>>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const num = parseFloat(e.target.value)
      if (Number.isNaN(num) || num < 0) return;
      dispatchFn(e.target.value)
    }
  }

  const handleUpdate = async () => {
    try {
      await updateFeeRate({
        cleaningFee: parseFloat(cleaningFee),
        defaultPricePerDay: parseFloat(defaultPricePerDay),
        taxRate: parseFloat(taxRate),
        processingFeeRate: parseFloat(processingFeeRate),
        extraGuestsPerNightFee: parseFloat(extraGuestsPerNightFee)
      })

      queryClient.invalidateQueries({ queryKey: getFeeRatesQueryKey() })
      toast({ title: 'Rates updated' })
    } catch (err) {
      toast({ title: 'An error occured' })
    }
  }

  if (isLoading)
    return <LoaderCircle className='animate-spin mt-16' />

  return (
    <div className="grid grid-cols-2 gap-y-6 max-w-md mt-16">
      <Label>Cleaning fee ($): </Label>
      <Input
        className='border-primary'
        type="number"
        value={cleaningFee} onChange={handleChange(setCleaningFee)}
      />
      <Label>Default price per day ($): </Label>
      <Input
        className='border-primary'
        type="number"
        value={defaultPricePerDay} onChange={handleChange(setDefaultPricePerDay)}
      />
      <Label>Tax Rate (%): </Label>
      <Input
        className='border-primary'
        type="number"
        value={taxRate} onChange={handleChange(setTaxRate)}
      />
      <Label>Processing Fee Rate (%): </Label>
      <Input
        className='border-primary'
        type="number"
        value={processingFeeRate}
        onChange={handleChange(setProcessingFeeRate)}
      />
      <Label>Extra guest per night fee ($): </Label>
      <Input
        className='border-primary'
        type="number"
        value={extraGuestsPerNightFee}
        onChange={handleChange(setExtraGuestsPerNightFee)}
      />
      <Button onClick={handleUpdate}>Update</Button>
    </div>
  )
}