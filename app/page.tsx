import type { Metadata } from 'next';
import { SITE } from '~/config.js';

import HomePage from '~/components/atoms/HomePage';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getTextsQueryKey } from '~/hooks/useGetTexts';
import { getDisabledDatesQueryKey } from '~/hooks/useGetDisabledDates';

export const metadata: Metadata = {
  title: SITE.title,
};

export default async function Page() {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({ queryKey: getTextsQueryKey() }),
    queryClient.prefetchQuery({ queryKey: getDisabledDatesQueryKey(true) }),
    queryClient.prefetchQuery({ queryKey: getDisabledDatesQueryKey(false) }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}
