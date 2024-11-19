import type { Metadata } from 'next';

import { SITE } from '~/config.js';
import BookingList from '~/components/atoms/BookingList'
import AuthenticatedPage from '~/components/atoms/AuthenticatedPage'
import { QueryClientProvider } from '@tanstack/react-query';

export const metadata: Metadata = {
  title: SITE.title,
};

export default function Page({ params, searchParams} : {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

	const isNorth = !!searchParams && !!searchParams['north']
	return (
    <>
      <AuthenticatedPage>
        <BookingList north={isNorth} />
      </AuthenticatedPage>
    </>
  );
}
