'use client'

import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { detectCardType } from '~/utils/utils'
import SafeImage from '../widgets/SafeImage'

export type CreditCardData = {
	cardNumber: string;
	cardName: string;
	expiryDate: string;
	cvv: string;
}

type Props = {
	creditCardData: CreditCardData;
	setCreditCardData: Dispatch<SetStateAction<CreditCardData>>;
	errors: { [key: string]: string };
}

export default function CreditCardPaymentForm({ creditCardData, setCreditCardData, errors }: Props) {
	const { cardNumber, cardName, expiryDate, cvv } = creditCardData
	const [expiryMonth, expiryYear] = expiryDate.split('/').length > 1 ? expiryDate.split('/') : ['', '']

	const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCreditCardData({
			...creditCardData,
			cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16)
		})
	}

	const handleCardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCreditCardData({
			...creditCardData,
			cardName: e.target.value
		})
	}

	const handleExpiryMonthChange = (value: string) => {
		setCreditCardData({
			...creditCardData,
			expiryDate: value + '/' + expiryYear
		})
	}

	const handleExpiryYearChange = (value: string) => {
		setCreditCardData({
			...creditCardData,
			expiryDate: expiryMonth + '/' + value
		})
	}

	const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCreditCardData({
			...creditCardData,
			cvv: e.target.value.replace(/\D/g, '').slice(0, 4)
		})
	}

	const cardLogo = detectCardType(cardNumber)

	return (
		<div className="w-full rounded-lg">
			<div className='mb-2'>
				<h2 className='text-md font-bold'>Payment</h2>
				<div className='text-xs'>Enter your credit card details to complete the payment</div>
			</div>
			<div className="mt-4">
				<div className="grid w-full items-center gap-4">
					<div className="flex flex-col space-y-1.5">
						<Label htmlFor="cardNumber">Card Number</Label>
						<div className="relative">
							<Input
								id="cardNumber"
								placeholder="1234 5678 9012 3456"
								value={cardNumber}
								onChange={handleCardNumberChange}
							/>
							{cardLogo && <SafeImage
								src={cardLogo}
								alt={'payment-card-logo'}
								width={30}
								height={30}
								className="absolute right-2 top-[50%] translate-y-[-50%]"
							/>}
						</div>
						{errors.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber}</p>}
					</div>
					<div className="flex flex-col space-y-1.5">
						<Label htmlFor="cardName">Cardholder Name</Label>
						<Input
							id="cardName"
							placeholder="John Doe"
							value={cardName}
							onChange={handleCardNameChange}
						/>
						{errors.cardName && <p className="text-xs text-red-500">{errors.cardName}</p>}
					</div>
					<div className="grid grid-cols-3 gap-4">
						<div className="flex flex-col space-y-1.5 col-span-1">
							<Label htmlFor="expiryMonth" className='whitespace-nowrap'>Expiry Month</Label>
							<Select value={expiryMonth} onValueChange={handleExpiryMonthChange}>
								<SelectTrigger id="expiryMonth">
									<SelectValue placeholder="Month" />
								</SelectTrigger>
								<SelectContent className='z-[99]'>
									{Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
										<SelectItem key={month} value={month.toString().padStart(2, '0')}>
											{month.toString().padStart(2, '0')}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.expiryMonth && <p className="text-xs text-red-500">{errors.expiryMonth}</p>}
						</div>
						<div className="flex flex-col space-y-1.5 col-span-1">
							<Label htmlFor="expiryYear">Expiry Year</Label>
							<Select value={expiryYear} onValueChange={handleExpiryYearChange}>
								<SelectTrigger id="expiryYear">
									<SelectValue placeholder="Year" />
								</SelectTrigger>
								<SelectContent className='z-[99]'>
									{Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
										<SelectItem key={year} value={year.toString().slice(2)}>
											{year}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.expiryYear && <p className="text-xs text-red-500">{errors.expiryYear}</p>}
						</div>
						<div className="flex flex-col space-y-1.5 col-span-1">
							<Label htmlFor="cvv">CVV</Label>
							<Input
								id="cvv"
								placeholder="123"
								type="password"
								value={cvv}
								onChange={handleCvvChange}
							/>
							{errors.cvv && <p className="text-xs text-red-500">{errors.cvv}</p>}
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}