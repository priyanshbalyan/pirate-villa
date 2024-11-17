import type { Metadata } from 'next';
import VillaPage from '~/components/atoms/VillaPage';

import { SITE } from '~/config.js';

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
			<VillaPage north={isNorth} />
		</>
	);
}
