'use client';

import { twMerge } from 'tailwind-merge';

interface ItemsContentProps {
  title: string,
  children: React.ReactNode,
  className?: string,
}

export default function ItemsContent({
  title,
  children,
  className,
}: ItemsContentProps) {
  return (
    <div className="mb-6">
      <div
        className="
        text-lg
        font-semibold
        mb-3
        "
      >
        {title}
      </div>
      <div
        className={twMerge(`
        flex
        flex-wrap
        gap-5
        `, `
        ${className}
        `)}
      >
        {children}
      </div>
    </div>
  )
}
