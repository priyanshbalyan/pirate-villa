'use client'

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { toast } from "~/hooks/use-toast"
import { Trash2 } from 'lucide-react'
import useGetPricing from '~/hooks/useGetPricing'
import { PricingAddDialog } from './PricingAddDialog'
import { Pricing, VillaType } from '~/types'


export default function PricingTable() {
  const { data: pricingOptions, isLoading, error } = useGetPricing()

  const [newRate, setNewRate] = useState('')
  const [newStartDate, setNewStartDate] = useState('')
  const [newEndDate, setNewEndDate] = useState('')
  const [villa, setVilla] = useState<VillaType>('north')

  const [pricingAddModalOpen, setPricingAddModalOpen] = useState(false)

  const handleAddPricing = () => {
    if (!newRate || !newStartDate || !newEndDate) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    const newPricing: Pricing = {
      id: Date.now(),
      nightlyRate: parseFloat(newRate),
      startDate: newStartDate,
      endDate: newEndDate,
      villaType: villa
    }

    setNewRate('')
    setNewStartDate('')
    setNewEndDate('')

    toast({
      title: "Pricing Added",
      description: "New pricing option has been added successfully.",
    })
  }

  const handleDeletePricing = (id: number) => {
    toast({
      title: "Pricing Deleted",
      description: "Pricing option has been deleted successfully.",
    })
  }

  return (
    <div className="container mx-auto p-4">
      <div className='w-full flex items-center justify-between'>
        <h1 className="text-2xl font-bold mb-4">Pricing Dashboard</h1>
        <Button variant="outline" onClick={() => setPricingAddModalOpen(true)}>Add new Price</Button>
      </div>
      <p>Dates are inclusive</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rate (per night)</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Villa Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {error && <TableRow className='w-full'>
            <TableCell colSpan={12}><p className='w-full text-center'>An error occured</p></TableCell>
          </TableRow>}
          {pricingOptions?.length === 0 && <TableRow className='w-full'>
            <TableCell colSpan={12}><p className='w-full text-center'>No pricing data found</p></TableCell>
          </TableRow>}
          {pricingOptions?.map((option) => (
            <TableRow key={option.id}>
              <TableCell>${option.nightlyRate.toFixed(2)}</TableCell>
              <TableCell>{option.startDate}</TableCell>
              <TableCell>{option.endDate}</TableCell>
              <TableCell>{option.villaType}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeletePricing(option.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PricingAddDialog modalOpen={pricingAddModalOpen} setModalOpen={setPricingAddModalOpen} />
    </div>
  )
}