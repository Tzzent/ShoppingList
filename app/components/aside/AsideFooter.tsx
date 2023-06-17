'use client';

import { twMerge } from 'tailwind-merge';

import Container from '../Container';

interface AsideFooterProps {
  children: React.ReactNode,
  className?: string,
}

export default function AsideFooter({
  children,
  className,
}: AsideFooterProps) {
  return (
    <div
      className={twMerge(`
      bg-white
      py-8
      `, `
      ${className}
      `)}
    >
      <Container>
        {children}
      </Container>
    </div>
  )
}
