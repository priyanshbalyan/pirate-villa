import type { Metadata } from 'next';

import { SITE } from '~/config.js';
import BookingPage from '~/components/atoms/BookingPage';

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
        <BookingPage north={isNorth} />
    </>
  );
}
