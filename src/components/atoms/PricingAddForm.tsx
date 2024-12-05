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
import addPrice from '~/hooks/useAddPrice'
import { useQueryClient } from '@tanstack/react-query'
import { getPricingQueryKey } from '~/hooks/useGetPricing'
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"

export default function PricingAddForm({ setModalOpen }: { setModalOpen: Dispatch<SetStateAction<boolean>> }) {
  const [amount, setAmount] = useState('')
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
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
    if (!startDate) {
      newErrors.startDate = 'Start date is required'
    }
    if (!endDate) {
      newErrors.endDate = 'End date is required'
    }

    return newErrors;
  }, [amount, startDate, endDate])

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
      if (startDate && endDate) await addPrice(parseFloat(amount), startDate, endDate, villa)
      queryClient.invalidateQueries({
        queryKey: getPricingQueryKey()
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
  }, [touched, amount, startDate, endDate, villa, validateData])

  return (
    <Card className="w-full max-w-md mx-auto" onClick={(e) => e.stopPropagation()}>
      <CardHeader>
        <CardTitle>Add new pricing</CardTitle>
        <CardDescription>Enter an amount and date range to set-up pricing</CardDescription>
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
              <Label htmlFor="startDate">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                {errors.startDate && <p className="text-xs text-red-500 mt-1">{errors.startDate}</p>}
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    className='z-99 dark:bg-black bg-white'
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="endDate">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                {errors.endDate && <p className="text-xs text-red-500 mt-1">{errors.endDate}</p>}
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    className='dark:bg-black bg-white'
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col space-y-1.5">
              <RadioGroup defaultValue="north" value={villa} onValueChange={(value: VillaType) => setVilla(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="north" id="r1" />
                  <Label htmlFor="r1">North</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="south" id="r2" />
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
                setStartDate(undefined)
                setEndDate(undefined)
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