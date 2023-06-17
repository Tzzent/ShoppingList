'use client';

import { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import uniqid from 'uniqid';

interface InputCheckProps {
  label: string,
  disabled?: boolean,
}

export default function InputCheck({
  label,
  disabled = true,
}: InputCheckProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const uniqueId = uniqid();

  return (
    <label
      htmlFor={uniqueId}
      className={twMerge(`
      select-none
      flex
      items-center
      gap-5
      cursor-pointer
      `, `
      ${disabled && 'cursor-default'}
      `)}
    >
      <div
        className={`
        border-[#F9A109]
        text-[#F9A109]
        w-5
        h-5
        border-2
        rounded-md
        flex
        justify-center
        items-center
        ${disabled && 'hidden'}
        `}
      >
        <AiOutlineCheck
          className={`
          ${isSelected ? 'flex' : 'hidden'}
          `}
        />
        <input
          disabled={disabled}
          id={uniqueId}
          type="checkbox"
          onChange={() => setIsSelected(!isSelected)}
          className="hidden"
        />
      </div>
      <div
        className={`
        font-bold
        ${isSelected && 'line-through'}
        ${isSelected && 'text-slate-800/60'}
        `}
      >
        {label}
      </div>
    </label>
  )
}
