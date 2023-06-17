'use client';

import { twMerge } from 'tailwind-merge';

interface ContainerProps {
  children: React.ReactNode,
  className?: string,
}

export default function Container({
  children,
  className,
}: ContainerProps) {
  return (
    <div
      className={twMerge(`
      relative
      container
      m-auto
      px-8
      `, `
      ${className}
      `)}
    >
      {children}
    </div>
  )
}
