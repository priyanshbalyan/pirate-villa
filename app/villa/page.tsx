import type { Metadata } from 'next';
import VillaPage from '~/components/atoms/VillaPage';

import { SITE } from '~/config.js';

export const metadata: Metadata = {
	title: SITE.title,
};

export default function Page() {

	return (
		<>
			<VillaPage />
		</>
	);
}
