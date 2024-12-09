'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CreditCardPaymentForm, { CreditCardData } from './CreditCardPaymentForm';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { cn } from '~/lib/utils';
import { LoaderCircle, Lock } from 'lucide-react';
import { validateCardData } from '~/utils/utils';
import { Dialog } from '../ui/dialog';

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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // Update the scroll position
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures this runs once on mount

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
    <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
      <Card className='rounded-lg  text-site backdrop-blur-lg px-4'>
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
    </Dialog>
  )
}