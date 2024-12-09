import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';
import VillaPage from '~/components/atoms/VillaPage';

import { SITE } from '~/config.js';
import { getDisabledDatesQueryKey } from '~/hooks/useGetDisabledDates';
import { getReviewsQueryKey } from '~/hooks/useGetReviews';
import { getTextsQueryKey } from '~/hooks/useGetTexts';

export const metadata: Metadata = {
  title: SITE.title,
};

export default async function Page({ params, searchParams }: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const isNorth = false

  const queryClient = new QueryClient()
  await Promise.all([
    queryClient.prefetchQuery({ queryKey: getTextsQueryKey() }),
    queryClient.prefetchQuery({ queryKey: getDisabledDatesQueryKey(isNorth) }),
    queryClient.prefetchQuery({ queryKey: getReviewsQueryKey() })
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VillaPage north={isNorth} />
    </HydrationBoundary>
  );
}
