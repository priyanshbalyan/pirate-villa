import type { Metadata } from 'next';
import { SITE } from '~/config.js';

import HomePage from '~/components/atoms/HomePage';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getTextsQueryKey } from '~/hooks/useGetTexts';

export const metadata: Metadata = {
  title: SITE.title,
};

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: getTextsQueryKey() })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}
