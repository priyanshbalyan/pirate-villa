'use client';

import { useEffect, useState } from "react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { SITE } from "~/config";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

export default function GetInTouch({ className }: { className?: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const [touched, setTouched] = useState(false)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (name.trim() === '') {
      newErrors.name = 'Name is required'
    }

    if (email.trim() === '') {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
    }

    if (subject.trim() === '') {
      newErrors.subject = 'Subject is required'
    }

    if (message.trim() === '') {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)

    if (validateForm()) {
      const body = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`

      const link = document.createElement('a')
      link.href = `mailto:${SITE.NOTIFY_EMAIL}?subject=${subject}&body=${body}`
      link.click()

      // // Reset form and close widget
      // setName('')
      setEmail('')
      setSubject('')
      setMessage('')
      setTouched(false)
    }
  }

  useEffect(() => {
    if (touched) {
      validateForm()
    }
  }, [touched, name, email, subject, message])


  return <div className={cn(className)}>
    <div className="grid w-full items-center gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="john@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="How can we help?"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell us more about your inquiry..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
      </div>
      <div className="flex justify-center">
        <Button onClick={handleSubmit} className="w-fit py-6 backdrop-blur-lg uppercase  bg-primary border-[2px] rounded-full">
          <Send className="mr-2 h-4 w-4" /> Send Message
        </Button>
      </div>
    </div>
  </div>
}