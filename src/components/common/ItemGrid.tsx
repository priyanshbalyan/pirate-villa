'use client';

import type { ItemGrid as ItemGridType } from '~/shared/types';
import Image from 'next/image';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useEffect, useRef, useState } from 'react';

const ItemGrid = ({
  items,
}: ItemGridType) => {
  const [selectedImage, setSelectedImage] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleClose = () => {
    setModalOpen(false)
    timeoutRef.current = setTimeout(() => {
      setSelectedImage('')
    }, 500)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])


  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {(items || []).map(({ title, description, image, callToAction }, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg group"
            onClick={() => { clearTimeout(timeoutRef.current); setSelectedImage(image as string); setModalOpen(true) }}
          >
            <div className="aspect-w-3 aspect-h-2">
              <Image
                src={image as string}
                alt={title as string}
                objectFit="cover"
                className="h-[312px] transition-transform duration-300 ease-in-out group-hover:scale-110 object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 ease-in-out" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={modalOpen} onClose={handleClose}
        transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0 z-[90]"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 w-screen overflow-y-auto p-4">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel className="min-w-[60%] max-w-[70%] max-h-[90%] space-y-4 border bg-white">
              <Image
                src={selectedImage}
                alt={'Full screen'}
                objectFit="cover"
                className="min-h-full min-w-full  object-cover"
              />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ItemGrid;
