'use client';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CreditCardPaymentForm, { CreditCardData } from './CreditCardPaymentForm';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { cn } from '~/lib/utils';
import { LoaderCircle, Lock } from 'lucide-react';
import { validateCardData } from '~/utils/utils';

type Props = {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  creditCardData: CreditCardData;
  setCreditCardData: Dispatch<SetStateAction<CreditCardData>>;
  amount: number;
  handleBook: () => void;
  loading: boolean;
}

export function PaymentDialog({ 
  modalOpen,
  setModalOpen,
  creditCardData,
  setCreditCardData,
  amount,
  handleBook,
  loading
}: Props) {
	const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [touched, setTouched] = useState(false)

  const handlePayClick = () => {
    setTouched(true)
    const errors = validateCardData(creditCardData)
    setErrors(errors)
    if (Object.keys(errors).length === 0) {
      handleBook()
    }
  }

  useEffect(() => {
		if (touched) {
			const errors = validateCardData(creditCardData)
			setErrors(errors)
		}
	}, [creditCardData, touched])

  return (
    <Dialog open={modalOpen} onClose={() => setModalOpen(false)}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center  p-4 transition duration-300 ease-out data-[closed]:opacity-0 z-[90]"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/40" />
      <div className="fixed inset-0 w-screen overflow-y-auto p-4 backdrop-blur-lg">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel className="max-w-lg space-y-4">
            <Card className='rounded-lg bg-transparent backdrop-blur-lg px-4'>
              <CardContent className='mt-10'>
                <CreditCardPaymentForm
                  creditCardData={creditCardData}
                  setCreditCardData={setCreditCardData}
                  errors={errors}
                />
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handlePayClick}
                  className={cn("mt-2.5 mb-4 w-full bg-black text-white", Object.keys(errors).length > 0 && "border-red-500 border")}
                  disabled={loading}
                >
                  {loading ? <LoaderCircle className='animate-spin' /> : <Lock className="mr-2 h-4 w-4" />}
                  {' '}Pay {amount > 0 ? `$${amount}` : ''}
                </Button>
                </CardFooter>
            </Card>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}