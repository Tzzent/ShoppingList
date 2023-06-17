'use client';

interface ItemBoxProps {
  nameItem: string,
  onClick: () => void,
  rightContent: React.ReactNode,
}

export default function ItemBox({
  nameItem,
  onClick,
  rightContent,
}: ItemBoxProps) {

  return (
    <div
      onClick={onClick}
      className="
      bg-white
      flex
      gap-5
      items-center
      justify-between
      rounded-xl
      px-4
      py-2
      font-[600]
      cursor-pointer
      hover:scale-105
      "
    >
      <div className="w-full line-clamp-3">
        {nameItem}
      </div>
      <div>
        {rightContent}
      </div>
    </div>
  )
}
