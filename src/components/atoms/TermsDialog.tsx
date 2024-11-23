import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import TermsAndConditions from './TermsAndConditions'
import { Dispatch, SetStateAction } from 'react';

type Props = {
	modalOpen: boolean;
	setModalOpen: Dispatch<SetStateAction<boolean>>;
	setTermsRead: Dispatch<SetStateAction<boolean>>
}

export function TermsDialog({ modalOpen, setModalOpen, setTermsRead }: Props) {
	return (
		<Dialog open={modalOpen} onClose={() => setModalOpen(false)}
			transition
			className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0 z-[90]"
		>
			<DialogBackdrop className="fixed inset-0 bg-black/30" />
			<div className="fixed inset-0 w-screen overflow-y-auto p-4">
				<div className="flex min-h-full items-center justify-center">
					<DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
						<TermsAndConditions onAcceptClick={() => { setTermsRead(true); setModalOpen(false) }} />
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	)
}