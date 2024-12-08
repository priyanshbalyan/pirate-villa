import { useQuery } from '@tanstack/react-query';
import { Review } from '~/types';
import { getHeaders } from '~/utils/utils';


async function getReviews(): Promise<Review[]> {

  const response = await fetch('/api/reviews', {
    headers: getHeaders(),
  })
  const data = await response.json();
  return data
}

export const getReviewsQueryKey = () => ['getReviews']

export const useGetReviews = () => {
  return useQuery({ queryKey: getReviewsQueryKey(), queryFn: () => getReviews() })
}
