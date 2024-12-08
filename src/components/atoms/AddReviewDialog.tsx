'use client';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';
import { useToast } from '~/hooks/use-toast';
import { StarRating } from '~/components/widgets/StarRating';
import createReview from '~/hooks/useCreateReview';
import { cn } from '~/lib/utils';
import { PlayfairDisplay } from '~/utils/utils';
import { LoaderCircle } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { getReviewsQueryKey } from '~/hooks/useGetReviews';
import useTranslation from '~/hooks/useTranslation';

type Props = {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  north: boolean;
}

export function AddReviewDialog({
  modalOpen,
  setModalOpen,
  north,
}: Props) {
  const [scrollY, setScrollY] = useState(0);
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [review, setReview] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // Update the scroll position
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createReview(name, title, review, rating, north ? 'north' : 'south')
      setRating(0)
      setTitle('')
      setReview('')
      setModalOpen(false)
      toast({
        title: t('review_submitted_toast_title'),
        description: t('review_submitted_toast_description'),
      })
      queryClient.invalidateQueries({ queryKey: getReviewsQueryKey() })
    } catch (err) {
      toast({ title: 'An error occured' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={modalOpen} onClose={() => setModalOpen(false)}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center  p-4 transition duration-300 ease-out data-[closed]:opacity-0 z-[90]"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/40" />
      <div className="fixed inset-0 w-screen overflow-y-auto h-screen p-4 backdrop-blur-lg" style={{ top: scrollY }}>
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel className="max-w-lg space-y-4">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className={cn(PlayfairDisplay.className, "text-3xl font-bold text-center text-gray-800")}>{t('write_a_review')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                      {t('add_review_your_rating')}
                    </label>
                    <StarRating rating={rating} onChange={setRating} />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      {t('add_review_your_name')}
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('add_review_name_placeholder')}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      {t('add_review_review_title')}
                    </label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={t('add_review_title_placeholder')}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="review" className="block text-sm font-medium text-gray-700">
                      {t('add_review_your_review')}
                    </label>
                    <Textarea
                      id="review"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder={t('add_review_review_placeholder')}
                      rows={5}
                      required
                      disabled={loading}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    {t('add_review_submit_review')}{loading && <LoaderCircle className='animate-spin' />}
                  </Button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                  {t('add_review_review_footer')}
                </p>
              </CardContent>
            </Card>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}