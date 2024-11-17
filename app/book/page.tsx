import type { Metadata } from 'next';

import { SITE } from '~/config.js';
import BookingPage from '~/components/atoms/BookingPage';

export const metadata: Metadata = {
  title: SITE.title,
};

export default function Page() {

  return (
    <>
        <BookingPage />
    </>
  );
}
