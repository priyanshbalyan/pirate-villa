'use client'

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { CreditCard, Lock } from 'lucide-react'

export default function CreditCardPaymentForm() {
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiryMonth, setExpiryMonth] = useState('')
  const [expiryYear, setExpiryYear] = useState('')
  const [cvv, setCvv] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}

    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = 'Card number must be 16 digits'
    }
    if (cardName.trim() === '') {
      newErrors.cardName = 'Cardholder name is required'
    }
    if (!expiryMonth) {
      newErrors.expiryMonth = 'Expiry month is required'
    }
    if (!expiryYear) {
      newErrors.expiryYear = 'Expiry year is required'
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Here you would typically send the data to your payment processor
      console.log('Payment submitted:', { cardNumber, cardName, expiryMonth, expiryYear, cvv })
      // Reset form or show success message
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Credit Card Payment</CardTitle>
        <CardDescription>Enter your credit card details to complete the payment</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
              />
              {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              {errors.cardName && <p className="text-sm text-red-500">{errors.cardName}</p>}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col space-y-1.5 col-span-1">
                <Label htmlFor="expiryMonth">Expiry Month</Label>
                <Select value={expiryMonth} onValueChange={setExpiryMonth}>
                  <SelectTrigger id="expiryMonth">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <SelectItem key={month} value={month.toString().padStart(2, '0')}>
                        {month.toString().padStart(2, '0')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.expiryMonth && <p className="text-sm text-red-500">{errors.expiryMonth}</p>}
              </div>
              <div className="flex flex-col space-y-1.5 col-span-1">
                <Label htmlFor="expiryYear">Expiry Year</Label>
                <Select value={expiryYear} onValueChange={setExpiryYear}>
                  <SelectTrigger id="expiryYear">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.expiryYear && <p className="text-sm text-red-500">{errors.expiryYear}</p>}
              </div>
              <div className="flex flex-col space-y-1.5 col-span-1">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                />
                {errors.cvv && <p className="text-sm text-red-500">{errors.cvv}</p>}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSubmit} className="w-32">
          <Lock className="mr-2 h-4 w-4" /> Pay Now
        </Button>
      </CardFooter>
    </Card>
  )
}