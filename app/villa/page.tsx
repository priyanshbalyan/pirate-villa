import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';
import VillaPage from '~/components/atoms/VillaPage';

import { SITE } from '~/config.js';
import { getTextsQueryKey } from '~/hooks/useGetTexts';

export const metadata: Metadata = {
	title: SITE.title,
};

export default async function Page({ params, searchParams }: {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
}) {

	const isNorth = !!searchParams && !!searchParams['north']

	const queryClient = new QueryClient()
	await queryClient.prefetchQuery({ queryKey: getTextsQueryKey() })

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<VillaPage north={isNorth} />
		</HydrationBoundary>
	);
}
