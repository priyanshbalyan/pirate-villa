'use client';
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function BookingYourStayButton() {
  const [show, setShow] = useState(false)

  return show ? (
    <div className="gap-4 flex">
      <Link href="/villa?north=true#booknow">
        <Button className='mt-4 rounded-full py-6 px-10'>Book North Villa</Button>
      </Link>
      <Link href="/villa#booknow">
        <Button className='mt-4 rounded-full py-6 px-10'>Book South Villa</Button>
      </Link>
    </div>
  ) : (
    <div className="gap-4 flex">
      <Button className='mt-4 rounded-full py-6 px-10' onClick={() => setShow(true)}>Book Your Stay</Button>
    </div>
  )
}