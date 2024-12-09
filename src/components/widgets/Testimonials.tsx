import Headline from '~/components/common/Headline';
import WidgetWrapper from '~/components/common/WidgetWrapper';
import { cn } from '~/lib/utils';
import { PlayfairDisplay } from '~/utils/utils';
import { Card, CardContent } from '~/components/ui/card'
import { LoaderCircle, Star, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { useGetReviews } from '~/hooks/useGetReviews';
import useTranslation from '~/hooks/useTranslation';
import { format, parseISO } from 'date-fns';
import { Button } from '~/components/ui/button';
import { useState } from 'react';
import { AddReviewDialog } from '~/components/atoms/AddReviewDialog';

const Testimonials = ({ north }: { north: boolean }) => {
  const { t, tArray } = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)

  const { data: reviews, isLoading } = useGetReviews()
  const approvedReviews = reviews?.filter(review => {
    const currentProperty = north ? 'north' : 'south'
    return review.isApproved && review.villaType === currentProperty
  }) ?? []


  const getRandomImage = () => {
    const images = [
      "https://images.unsplash.com/photo-1619734086067-24bf8889ea7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
      "https://images.unsplash.com/photo-1565049786474-1dea82a8b995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
      "https://images.unsplash.com/photo-1659057106920-da022cfbc0cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
      "https://images.unsplash.com/photo-1572417884940-c24659be6068?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
      "https://images.unsplash.com/photo-1694287877106-ee22f764aef1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
      "https://images.unsplash.com/photo-1665984867752-6370ab5ae35e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
    ]
    const index = Math.floor(Math.random() * images.length)
    return index < images.length ? images[index] : images[0];
  }

  return (
    <WidgetWrapper id={''} containerClass="">
      <Headline header={{ title: 'What our guests say about us' }} titleClass={cn(PlayfairDisplay.className, "uppercase text-3xl md:text-4xl text-background drop-shadow-2xl",
        // "drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
      )} />
      <div className="flex items-stretch justify-center w-full">
        {isLoading && <div><LoaderCircle className='animate-spin text-white' /></div>}
        <div className="grid sm:grid-cols-1 md:grid-cols-1 gap-3 w-full">
          {approvedReviews.map(
            ({ name, title, content, createdAt, rating }, index) =>
              <Card className="mb-4 w-full bg-primary border-site" key={createdAt}>
                <CardContent className="pt-6 w-full">
                  <div className="flex items-center mb-2 w-full">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < rating ? 'text-white fill-current' : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold text-site">{title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{content}</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={getRandomImage()} alt={name} />
                      <AvatarFallback>
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-site">{name}</p>
                      <p className="text-sm text-gray-500">{format(parseISO(createdAt), 'yyyy-MM-dd')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Button className="text-md rounded-full h-12 text-site" onClick={() => setModalOpen(true)}>{approvedReviews.length === 0 && !isLoading ? t('no_reviews_yet_leave_a_review') : t('add_your_review')}</Button>
      </div>
      <AddReviewDialog modalOpen={modalOpen} setModalOpen={setModalOpen} north={north} />
    </WidgetWrapper>
  );
}


export default Testimonials;
