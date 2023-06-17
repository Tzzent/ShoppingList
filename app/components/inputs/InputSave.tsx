'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge'

import Button from '../buttons/Button';

interface InputSaveProps {
  disabled?: boolean,
  onSave: (value: string) => void,
}

export default function InputSave({
  disabled = false,
  onSave,
}: InputSaveProps) {
  const [value, setValue] = useState<string>('');

  const handleOnSave = () => {
    onSave(value);
  }

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Enter a name"
        disabled={disabled}
        onChange={(ev) => setValue(ev.target.value)}
        onKeyDown={(ev) => { ev.key === 'Enter' && handleOnSave() }}
        className={twMerge(`
        bg-transparent
        w-full
        py-4
        pl-4
        pr-20
        rounded-xl
        border-2
        border-[#F9A109]
        outline-[#F9A109]
        outline-offset-1
        `, `
        ${disabled && 'border-[#C1C1C4]'}
        ${disabled && 'cursor-not-allowed'}
        `)}
      />
      <Button
        onClick={handleOnSave}
        label="Save"
        disabled={disabled}
        className="
        absolute
        right-0
        top-0
        bottom-0
        "
      />
    </div>
  )
}
