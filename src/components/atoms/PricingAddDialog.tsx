'use client';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { Dispatch, SetStateAction } from 'react';
import PricingAddForm from './PricingAddForm';

type Props = {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function PricingAddDialog({
  modalOpen,
  setModalOpen,
}: Props) {
  return (
    <Dialog open={modalOpen} onClose={() => setModalOpen(false)}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center  p-4 transition duration-300 ease-out data-[closed]:opacity-0 z-[40]"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/40 h-screen" />
      <div className="fixed inset-0 w-screen overflow-y-auto p-4 backdrop-blur-lg">
        <div className="flex h-screen items-center justify-center">
          <DialogPanel className="max-w-lg space-y-4 flex items-center justify-center">
            <PricingAddForm setModalOpen={setModalOpen} />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}