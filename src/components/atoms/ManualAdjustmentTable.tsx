'use client'

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { toast } from "~/hooks/use-toast"
import { Trash2 } from 'lucide-react'
import useGetManualAdjustments from '~/hooks/useGetManualAdjustments'
import { ManualAdjustment, Pricing, VillaType } from '~/types'
import { ManualAdjustmentAddDialog } from './ManualAdjustmentAddDialog'


export default function ManualAdjustmentTable() {
  const { data: manualAdjustments, isLoading, error } = useGetManualAdjustments()

  const [newRate, setNewRate] = useState(0)
  const [newDate, setnewDate] = useState('')
  const [villa, setVilla] = useState<VillaType>('north');

  const [manualAdjustmentModalOpen, setManualAdjustmentModalOpen] = useState(false)


  const handleAddPricing = () => {
    if (!newRate || !newDate) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    const newManualAdjustment: ManualAdjustment = {
      id: 1,
      date: newDate,
      nightlyRate: newRate,
      villaType: villa
    }

    setNewRate(0)
    setnewDate('')

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
    <>
      <div className="container mx-auto p-4">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-4">Manual Price Adjustments</h1>
          <Button variant="outline" onClick={() => setManualAdjustmentModalOpen(true)}>Add new manual price adjustment</Button>
        </div>
        <p>Adjust price for any day. Note that this will override any existing pricing range</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rate (per night)</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Villa Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {error && <TableRow className='w-full'>
              <TableCell colSpan={12}><p className='w-full text-center'>An error occured</p></TableCell>
            </TableRow>}
            {manualAdjustments?.length === 0 && <TableRow className='w-full'>
              <TableCell colSpan={12}><p className='w-full text-center'>No manual adjustments data found</p></TableCell>
            </TableRow>}
            {manualAdjustments?.map((option) => (
              <TableRow key={option.id}>
                <TableCell>${option.nightlyRate.toFixed(2)}</TableCell>
                <TableCell>{option.date}</TableCell>
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
      </div>
      <ManualAdjustmentAddDialog modalOpen={manualAdjustmentModalOpen} setModalOpen={setManualAdjustmentModalOpen} />
    </>
  )
}