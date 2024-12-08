'use client'

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Trash2 } from 'lucide-react'
import useGetManualAdjustments, { getManualAdjustmentQueryKey } from '~/hooks/useGetManualAdjustments'
import { ManualAdjustmentAddDialog } from './ManualAdjustmentAddDialog'
import { format } from 'date-fns'
import { deleteManualAdjustment } from '~/hooks/useDeleteManualAdjustment'
import { useQueryClient } from '@tanstack/react-query'


export default function ManualAdjustmentTable() {
  const { data: manualAdjustments, isLoading, error } = useGetManualAdjustments()

  const queryClient = useQueryClient()

  const [manualAdjustmentModalOpen, setManualAdjustmentModalOpen] = useState(false)

  const handleDeleteManualAdjustment = async (id: number) => {
    await deleteManualAdjustment(id)
    queryClient.invalidateQueries({
      queryKey: getManualAdjustmentQueryKey()
    })
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-4">Manual Price Adjustments</h1>
          <Button className='bg-primary' onClick={() => setManualAdjustmentModalOpen(true)}>Add new manual price adjustment</Button>
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
                <TableCell>{format(new Date(option.date), 'PPP')}</TableCell>
                <TableCell>{option.villaType}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteManualAdjustment(option.id)}
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