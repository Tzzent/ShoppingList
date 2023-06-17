'use client';

import Item, { ItemProps } from './Item';

interface ItemsListProps {
  title: string,
  children: React.ReactNode,
}

export default function ItemsList({
  title,
  children,
}: ItemsListProps) {
  return (
    <div
      className="
      mb-10
      flex
      flex-col
      gap-5
      "
    >
      <div className="text-[#828282]">
        {title}
      </div>
      {children}
    </div>
  )
}
