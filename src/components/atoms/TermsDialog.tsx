import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import TermsAndConditions from './TermsAndConditions'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
	modalOpen: boolean;
	setModalOpen: Dispatch<SetStateAction<boolean>>;
	setTermsRead: Dispatch<SetStateAction<boolean>>
}

export function TermsDialog({ modalOpen, setModalOpen, setTermsRead }: Props) {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY); // Update the scroll position
		};

		// Attach the scroll event listener
		window.addEventListener("scroll", handleScroll);

		// Cleanup on component unmount
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []); // Empty dependency array ensures this runs once on mount


	return (
		<Dialog open={modalOpen} onClose={() => setModalOpen(false)}
			transition
			className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0 z-[90]"
		>
			<DialogBackdrop className="fixed inset-0 bg-black/30" />
			<div className="fixed inset-0 w-screen overflow-y-auto  h-screen p-4" style={{ top: scrollY }}>
				<div className="flex min-h-full items-center justify-center">
					<DialogPanel className="max-w-lg space-y-4 border bg-white p-4 md:p-12 overflow-y-scroll  max-h-[90dvh]">
						<TermsAndConditions onAcceptClick={() => { setTermsRead(true); setModalOpen(false) }} />
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	)
}