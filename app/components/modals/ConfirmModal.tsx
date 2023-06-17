'use client';

import useConfirmModal from "@/app/hooks/useConfirmModal";
import Button from "../buttons/Button";
import Title from "../typefaces/Title";
import Modal from "./Modal";

export default function ConfirmModal() {
  const {
    isOpen,
    message,
    onCancel,
    onConfirm,
    confirmColor,
  } = useConfirmModal();

  const footer = (
    <div
      className="
      flex
      flex-row
      items-center
      justify-end
      gap-4
      w-full
      "
    >
      <Button
        link
        label={'cancel'}
        onClick={onCancel}
        className="text-[#34333A]"
      />
      <Button
        label={'Yes'}
        onClick={onConfirm}
        className="py-3"
        style={{
          backgroundColor: confirmColor,
        }}
      />
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      body={<Title label={message} />}
      footer={footer}
    />
  )
}
