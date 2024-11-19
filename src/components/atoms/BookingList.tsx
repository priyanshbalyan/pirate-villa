'use client';
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Calendar, User } from 'lucide-react'
import { Booking, useGetBookings } from '~/hooks/useGetBookings';


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
        booking.checkInDate.startsWith(date) || booking.checkOutDate.startsWith(date)
      )
    }
    setFilteredBookings(filtered)
  }

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toDateString()
  }

  const uniqueProperties = Array.from(['north', 'south'])

  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Property Bookings</h1>

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
                  <SelectItem key={property} value={property}>{property}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-1/2">
            <Label htmlFor="date-filter">Filter by Date</Label>
            <Input
              id="date-filter"
              type="date"
              onChange={handleDateFilter}
              value={dateFilter}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBookings.map(booking => (
            <Card key={booking.id}>
              <CardHeader>
                <CardTitle>{booking.villaType} Villa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{booking.name}</span>
                    <span>{booking.email}</span>
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