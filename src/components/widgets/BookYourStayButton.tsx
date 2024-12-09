'use client';
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import useTranslation from "~/hooks/useTranslation";

export default function BookingYourStayButton() {
  const [show, setShow] = useState(false)
  const { t } = useTranslation()

  return show ? (
    <div className="gap-4 flex">
      <Link href="/north-villa#booknow">
        <Button className='mt-4 rounded-full py-6 px-10'>{t('book_north_villa')}</Button>
      </Link>
      <Link href="/south-villa#booknow">
        <Button className='mt-4 rounded-full py-6 px-10'>{t('book_south_villa')}</Button>
      </Link>
    </div>
  ) : (
    <div className="gap-4 flex">
      <Button className='mt-4 rounded-full py-6 px-10' onClick={() => setShow(true)}>{t('book_your_stay_button')}</Button>
    </div>
  )
}