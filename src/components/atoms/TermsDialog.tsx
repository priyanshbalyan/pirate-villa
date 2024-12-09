import { Dialog } from '../ui/dialog';
import TermsAndConditions from './TermsAndConditions'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
	modalOpen: boolean;
	setModalOpen: Dispatch<SetStateAction<boolean>>;
	setTermsRead: Dispatch<SetStateAction<boolean>>
}

export function TermsDialog({ modalOpen, setModalOpen, setTermsRead }: Props) {

	return (
		<Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
			<TermsAndConditions onAcceptClick={() => { setTermsRead(true); setModalOpen(false) }} />
		</Dialog>
	)
}