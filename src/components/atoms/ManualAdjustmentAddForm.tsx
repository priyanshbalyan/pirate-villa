'use client'

import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { CalendarIcon, DollarSign, LoaderCircle } from 'lucide-react'
import { format } from "date-fns"
import { cn } from "~/lib/utils"
import { Calendar } from "~/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { VillaType } from '~/types'
import { useQueryClient } from '@tanstack/react-query'
import addManualAdjustment from '~/hooks/useAddManualAdjustments'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { getManualAdjustmentQueryKey } from '~/hooks/useGetManualAdjustments'

export default function ManualAdjustmentAddForm({ setModalOpen }: { setModalOpen: Dispatch<SetStateAction<boolean>> }) {
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState<Date>()
  const [villa, setVilla] = useState<VillaType>('north')
  const [touched, setTouched] = useState(false)

  const [formError, setFormError] = useState('')

  const queryClient = useQueryClient()

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [loading, setLoading] = useState(false)

  const validateData = useCallback(() => {
    setTouched(true)
    const newErrors: { [key: string]: string } = {}

    if (!amount || Number.isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      newErrors.amount = 'Amount is required'
    }
    if (!date) {
      newErrors.date = 'Date is required'
    }

    return newErrors;
  }, [amount])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const errors = validateData()
    setErrors(errors)

    if (Object.keys(errors).length === 0) {
      // handle pricing add
      handlePriceAdd()
    }
  }

  const handlePriceAdd = async () => {
    setLoading(true)
    try {
      if (date) await addManualAdjustment(parseFloat(amount), date, villa)
      queryClient.invalidateQueries({
        queryKey: getManualAdjustmentQueryKey()
      })
      setModalOpen(false)
    } catch (error: any) {
      setFormError(error?.message || "")
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (touched) {
      const errors = validateData()
      setErrors(errors)
    }
  }, [touched, amount, date, villa, validateData])

  return (
    <Card className="w-full max-w-md mx-auto" onClick={(e) => e.stopPropagation()}>
      <CardHeader>
        <CardTitle>Add new manual adjustment</CardTitle>
        <CardDescription>Enter an amount and date to set-up manual price adjustment of a day</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  id="amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-9"
                  type="number"
                  step="0.01"
                />
              </div>
              {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="startDate">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    className=' dark:bg-black bg-white'
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className=" space-y-1.5">
              <Label htmlFor="">Select Property</Label>
              <RadioGroup value={villa} onValueChange={(value: VillaType) => setVilla(value)} orientation='horizontal' className="flex ">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="north" id="r1" className='checked:text-white checked:bg-white' />
                  <Label htmlFor="r1">North</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="south" id="r2" className='checked:text-white checked:bg-white' />
                  <Label htmlFor="r2">South</Label>
                </div>
              </RadioGroup>
              {errors.villaType && <p className="text-xs text-red-500 mt-1">{errors.villaType}</p>}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className='w-full'>
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={() => {
                setAmount('')
                setDate(undefined)
                setFormError('')
                setTouched(false)
              }}
              disabled={loading}
            >
              Reset
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>{loading ? <LoaderCircle className='animate-spin' /> : 'Submit'}</Button>
          </div>
          {formError && <p className="text-xs text-red-500 mt-1 w-full text-center">{formError}</p>}
        </div>
      </CardFooter>
    </Card >
  )
}