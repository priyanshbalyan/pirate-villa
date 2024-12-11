'use client'

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Trash2 } from 'lucide-react'
import useGetPricing, { getPricingQueryKey } from '~/hooks/useGetPricing'
import { PricingAddDialog } from './PricingAddDialog'
import { format } from 'date-fns'
import { useQueryClient } from '@tanstack/react-query'
import { deletePricing } from '~/hooks/useDeletePricing'

import { FeeAdjustment } from './FeeAdjustment'


export default function PricingTable() {
  const { data: pricingOptions, isLoading, error } = useGetPricing()

  const [pricingAddModalOpen, setPricingAddModalOpen] = useState(false)

  const queryClient = useQueryClient()

  const handleDeletePricing = async (id: number) => {
    await deletePricing(id)
    queryClient.invalidateQueries({
      queryKey: getPricingQueryKey()
    })
  }

  return (
    <div className="container mx-auto p-4">
      <div className='w-full flex items-center justify-between'>
        <h1 className="text-2xl font-bold mb-4">Pricing Dashboard</h1>
        <Button className='bg-primary' onClick={() => setPricingAddModalOpen(true)}>Add new Price</Button>
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
              <TableCell>{format(new Date(option.startDate), 'PPP')}</TableCell>
              <TableCell>{format(new Date(option.endDate), 'PPP')}</TableCell>
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
      <FeeAdjustment />
      <PricingAddDialog modalOpen={pricingAddModalOpen} setModalOpen={setPricingAddModalOpen} />
    </div>
  )
}