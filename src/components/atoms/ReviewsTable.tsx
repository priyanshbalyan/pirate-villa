'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Button } from "~/components/ui/button"
import { CircleCheckBig, CircleX, Trash2 } from "lucide-react"
import { useMemo } from "react";
import { getReviewsQueryKey, useGetReviews } from "~/hooks/useGetReviews";
import { Review } from "~/types";
import modifyReview from "~/hooks/useModifyReview";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "~/hooks/use-toast";

export default function ReviewsTable() {
  const { data: reviews } = useGetReviews()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const handleDeleteReview = async (id: number) => {
    try {
      await modifyReview(id, 'delete')
      queryClient.invalidateQueries({ queryKey: getReviewsQueryKey() })
      toast({ title: 'Review deleted' })
    } catch (err) {
      toast({ title: 'An Error occured' })
    }
  }

  const handleApproveReview = async (id: number) => {
    try {
      await modifyReview(id, 'approve')
      queryClient.invalidateQueries({ queryKey: getReviewsQueryKey() })
      toast({ title: 'Review approved' })
    } catch (err) {
      toast({ title: 'An Error occured' })
    }
  }

  const handleRejectReview = async (id: number) => {
    try {
      await modifyReview(id, 'reject')
      queryClient.invalidateQueries({ queryKey: getReviewsQueryKey() })
      toast({ title: 'Review rejected' })
    } catch (err) {
      toast({ title: 'An Error occured' })
    }
  }

  const pendingReviews = useMemo(() => reviews?.filter(review => !review.isApproved) ?? [], [reviews])
  const approvedReviews = useMemo(() => reviews?.filter(review => review.isApproved) ?? [], [reviews])


  const renderReviews = (reviews: Review[], isApproveList = false) => (
    <Table>
      {reviews.length > 0 && <TableHeader>
        <TableRow>
          <TableHead className="w-[20%]">Email</TableHead>
          <TableHead className="w-[30%]">Title</TableHead>
          <TableHead className="w-[30%]">Review</TableHead>
          <TableHead className="w-[10%]">Property</TableHead>
          <TableHead className="w-[10%]">Actions</TableHead>
        </TableRow>
      </TableHeader>}
      <TableBody>
        {reviews?.length === 0 && <TableRow className='w-full'>
          <TableCell colSpan={12}><p className='w-full text-center'>{isApproveList ? 'No reviews' : 'No pending reviews'}</p></TableCell>
        </TableRow>}
        {reviews?.map((review) => (
          <TableRow key={review.id}>
            <TableCell>{review.name}</TableCell>
            <TableCell>{review.title}</TableCell>
            <TableCell>{review.content}</TableCell>
            <TableCell>{review.villaType}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                {!isApproveList && <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleApproveReview(review.id)}
                  className="transition-all duration-300 hover:scale-[1.1] hover:bg-primary"
                >
                  <CircleCheckBig className="h-4 w-4" />
                </Button>}
                <Button
                  variant="ghost"
                  size="icon"
                  className="transition-all duration-300 hover:scale-[1.1] hover:bg-primary"
                  onClick={() => handleRejectReview(review.id)}
                >
                  <CircleX />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="transition-all duration-300 hover:scale-[1.1] hover:bg-primary"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="container mx-auto p-4">
      <div className='w-full flex items-center justify-between'>
        <h1 className="text-2xl font-bold mb-4">Reviews</h1>
      </div>
      <p className="font-semibold">Pending Reviews</p>
      {renderReviews(pendingReviews, false)}
      <p className="font-semibold mt-8">Approved Reviews</p>
      {renderReviews(approvedReviews, true)}
    </div>
  )
} 