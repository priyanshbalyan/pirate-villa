'use client';
import { useEffect, useState } from 'react'
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Booking, getBookingsQueryKey, useGetBookings } from '~/hooks/useGetBookings';
import { toStartCase } from '~/utils/utils'
import { isAfter, isBefore, parseISO } from 'date-fns';
import { Button } from '~/components/ui/button';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import CardBooking from './CardBooking';
import { deleteBooking } from '~/hooks/useDeleteBooking';
import { toast } from '~/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';


export default function PropertyBookings({ north }: { north: boolean }) {
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [propertyFilter, setPropertyFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  const [itemToDelete, setItemToDelete] = useState<Booking | null>(null)

  const { data: bookings, } = useGetBookings()

  const queryClient = useQueryClient()


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

  const handleDelete = (id: number) => {
    return () => {
      const booking = bookings?.find(b => b.id === id)
      if (booking)
        setItemToDelete(booking)
    }
  }

  const confirmDelete = async () => {
    if (itemToDelete)
      try {
        await deleteBooking(itemToDelete?.id)
      } catch (err) {
        toast({ title: 'An unexpected error occured' })
        console.log(err)
      } finally {
        setItemToDelete(null)
        queryClient.invalidateQueries({
          queryKey: getBookingsQueryKey
        })
      }
  }

  const handleClose = () => {
    setItemToDelete(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6 justify-between">
        <h1 className="text-3xl font-bold">Property Bookings</h1>
        <div className='flex gap-4'>
          <a href={`/api/north-calendar?ts=${Date.now()}`} className="hover:underline">Download North Villa ICS</a>
          <a href={`/api/south-calendar?ts=${Date.now()}`} className="hover:underline">Download South Villa ICS</a>
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
          <CardBooking booking={booking} key={booking.id}>
            <Button className="bg-red-400" onClick={handleDelete(booking.id)}>Delete</Button>
          </CardBooking>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <p className="text-center text-muted-foreground mt-6">No bookings found for the selected filters.</p>
      )}

      <Dialog open={!!itemToDelete} onClose={handleClose}
        transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0 z-[90]"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="fixed inset-0 w-full overflow-y-auto p-4 rounded-lg">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel className="max-w-lg space-y-4 border bg-white dark:bg-black dark:text-white p-12">
              <DialogTitle className="dark:text-white">Do you want to delete this booking?</DialogTitle>
              <CardBooking booking={itemToDelete} />
              <Button className="bg-red-400" onClick={confirmDelete}>Delete</Button>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}