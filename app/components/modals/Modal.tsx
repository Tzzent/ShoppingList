'use client';

import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import Button from '../buttons/Button';

interface ModalProps {
  isOpen: boolean,
  onClose: () => void,
  title?: string,
  body?: React.ReactNode,
  footer?: React.ReactNode,
}

export default function Modal({
  isOpen,
  onClose,
  title,
  body,
  footer,
}: ModalProps) {
  const [showModal, setShowModal] = useState<boolean>(isOpen);

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="
      justify-center
      items-center
      flex
      overflow-x-hidden
      overflow-y-auto
      fixed
      inset-0
      z-50
      outline-none
      focus:outline-none
      bg-neutral-800/70
      "
    >
      <div
        className="
        mx-5
        relative
        w-full
        md:w-4/6
        xl:w-1/4
        my-6
        lg:h-auto
        md:h-auto
        "
      >
        {/* CONTENT */}
        <div
          className={`
          translate
          duration-300
          h-full
          ${showModal ? 'translate-y-0' : 'translate-y-full'}
          ${showModal ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div
            className="
          translate
          h-full
          lg:h-auto
          md:h-auto
          border-0
          rounded-lg
          shadow-lg
          relative
          flex
          flex-col
          w-full
          bg-white
          "
          >
            {/* HEADER */}
            {title && (
              <div
                className="
                flex
                items-center
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
                "
              >
                <div className="text-lg font-semibold">
                  {title}
                </div>
              </div>)}
            {/* BODY */}
            <div className="relative p-8 flex-auto">
              {body}
            </div>
            <Button
              onClick={onClose}
              icon={AiOutlineClose}
              link
              className="
              absolute 
              top-4 
              right-4
              text-[#828282]
              text-xl
              "
            />
            {/* FOOTER */}
            <div className="flex flex-col gap-2 p-6">
              {footer}
              {/* {footer} */}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
