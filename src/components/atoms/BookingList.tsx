'use client';
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Calendar, User } from 'lucide-react'
import { Booking, useGetBookings } from '~/hooks/useGetBookings';
import { toStartCase } from '~/utils/utils'
import { isAfter, isBefore, parseISO } from 'date-fns';
import { Button } from '../ui/button';


export default function PropertyBookings({ north }: { north: boolean }) {
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [propertyFilter, setPropertyFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const { data:bookings, } = useGetBookings()

  useEffect(() => {
    setFilteredBookings(bookings ?? [])
  }, [bookings])

  const handlePropertyFilter = (value: string) => {
    filterBookings(value, dateFilter)
  }

  const handleDateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter(e.target.value)
    filterBookings(propertyFilter, e.target.value)
  }

  const filterBookings = (property: string, date: string) => {
    let filtered = bookings ?? []
    if (property !== 'all-properties') {
      filtered = filtered.filter(booking => booking.villaType === property)
    }
    if (date) {
      filtered = filtered.filter(booking =>
        isBefore(parseISO(booking.checkInDate), parseISO(date)) && isAfter(parseISO(date), parseISO(booking.checkOutDate))
      )
    }
    setFilteredBookings(filtered)
  }

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toDateString()
  }

  const uniqueProperties = Array.from(['north', 'south'])

  const handleNorthDownload = () => {
    // Programmatically trigger the download
    const link = document.createElement('a');
    link.href = '/api/north-calendar'; // API route for the file
    link.download = 'north-calendar.ics'; // Suggested file name
    link.click();
  }

  const handleSouthDownload = () => {
    const link = document.createElement('a');
    link.href = '/api/south-calendar'; // API route for the file
    link.download = 'south-calendar.ics'; // Suggested file name
    link.click();
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6 justify-between">
        <h1 className="text-3xl font-bold">Property Bookings</h1>
        <div className='flex gap-4'>
        <a href="/api/north-calendar" className="hover:underline">Download North Villa ICS</a>
        <a href="/api/south-calendar" className="hover:underline">Download South Villa ICS</a>
        </div>
        </div>
        <div className="flex flex-col">
        
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-1/2">
            <Label htmlFor="property-filter">Filter by Property</Label>
            <Select onValueChange={handlePropertyFilter}>
              <SelectTrigger id="property-filter">
                <SelectValue placeholder="Select a property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-properties">All Properties</SelectItem>
                {uniqueProperties.map(property => (
                  <SelectItem key={property} value={property}>{toStartCase(property)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-1/2">
            {/* <Label htmlFor="date-filter">Filter by Date</Label>
            <Input
              id="date-filter"
              type="date"
              onChange={handleDateFilter}
              value={dateFilter}
            /> */}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBookings.map(booking => (
            <Card key={booking.id}>
              <CardHeader>
                <CardTitle>{toStartCase(booking.villaType)} Villa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <User className="h-4 w-4 mr-2 mt-1" />
                    <div>
                    <div>{booking.name}</div>
                    <div>{booking.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Check-in: {formatDateTime(booking.checkInDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Check-out: {formatDateTime(booking.checkOutDate)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <p className="text-center text-muted-foreground mt-6">No bookings found for the selected filters.</p>
        )}
      </div>
  )
}