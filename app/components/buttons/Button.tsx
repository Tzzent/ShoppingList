'use client';

import { twMerge } from 'tailwind-merge'
import { IconType } from 'react-icons';

interface ButtonProps {
  icon?: IconType,
  label?: string | number,
  className?: string,
  style?: React.CSSProperties,
  disabled?: boolean,
  outline?: boolean,
  link?: boolean,
  onClick?: () => void,
}

export default function Button({
  icon: Icon,
  label,
  className,
  style,
  disabled = false,
  outline = false,
  link = false,
  onClick,
}: ButtonProps) {

  const handleOnClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick();
    }
    ev.stopPropagation();
  };

  return (
    <button
      onClick={handleOnClick}
      type="button"
      disabled={disabled}
      style={style}
      className={twMerge(`
      bg-[#F9A109]
      text-white
      font-[600]
      rounded-xl
      px-5
      py-2
      w-fit
      text-base
      hover:scale-105
      flex
      items-center
      gap-2
      `, `
      ${disabled && 'bg-[#C1C1C4]'}
      ${disabled && 'text-white'}
      ${disabled && 'cursor-not-allowed'}
      
      ${outline && 'bg-transparent'}
      ${outline && 'border-2 border-[#F9A109]'}
      ${outline && 'text-[#F9A109]'}
      
      ${link && 'bg-transparent'}
      ${link && 'p-0 text-[#F9A109]'}
      `, `
      ${className}
      `)}
    >
      {Icon && <Icon />}
      {label}
    </button>
  )
}
