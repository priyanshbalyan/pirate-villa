'use client'

import { useState, useEffect } from 'react'
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { MessageSquareText, Send, X } from 'lucide-react'
import { cn } from '~/lib/utils'
import { SITE } from '~/config'

export default function ContactUsWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const [touched, setTouched] = useState(false)

  const [formClassName, setFormClassName] = useState('')

  useEffect(() => {
    if (isOpen) {
      setFormClassName('block')
      setTimeout(() => {
        setFormClassName('block opacity-100 translate-y-0 scale-1')
      }, 100)
    }
  }, [isOpen])

  const closeForm = () => {
    const className = ' translate-y-8 scale-[0.95]'
    setFormClassName(className)
    setTimeout(() => {
      setIsOpen(false)
    }, 300)
  }

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
      closeForm()
      setTouched(false)
    }
  }

  useEffect(() => {
    if (touched) {
      validateForm()
    }
  }, [touched, name, email, subject, message])

  return (
    <>
      <Button
        className={cn(
          'fixed cursor-pointer z-30 bottom-4 right-4 rounded-full w-30 h-12 shadow-lg transition-transform duration-300 ease-in-out bg-white text-black',
          isOpen ? 'scale-0' : 'scale-100',
        )}
        onClick={() => setIsOpen(true)}
        aria-label="Open contact form"
      >
        <MessageSquareText className="h-6 w-6 cursor-pointer" /> Contact Us
      </Button>
      <div
        className={cn(
          'fixed z-30 bottom-4 right-4 w-full max-w-md transition-all duration-300 ease-in-out opacity-0 translate-y-8 scale-[0.95]',
          isOpen ? 'block' : 'hidden',
          formClassName
        )}
      >
        <Card className="shadow-lg dark:bg-black/60 bg-white/70 backdrop-blur-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Contact Us</CardTitle>
              <Button variant="ghost" size="icon" onClick={closeForm} aria-label="Close contact form">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>Send us a message and we&apos;ll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
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
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSubmit} className="w-full sm:w-auto dark:bg-black backdrop-blur-lg dark:text-white border-black" variant="outline">
              <Send className="mr-2 h-4 w-4" /> Send Message
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}