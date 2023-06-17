'use client';

import Link from 'next/link';
import { IconType } from 'react-icons';
import { AiFillCaretLeft } from 'react-icons/ai';

interface SidebarItemProps {
  icon: IconType,
  label: string,
  active?: boolean,
  href: string,
}

export default function SidebarItem({
  icon: Icon,
  label,
  active,
  href,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className="
      relative
      py-4
      "
    >
      <div
        className={`
        ${active && 'bg-[#F9A109]'}
        ${active && 'absolute -left-5 top-0'}
        ${active && 'rounded-r-3xl'}
        ${active && 'w-2 h-full'}
        `}
      />
      <div className="group/link relative">
        <div
          className="
          text-sm
          absolute
          top-0
          bottom-0
          left-10
          items-center
          hidden
          group-hover/link:flex
          "
        >
          <span
            className="
            bg-[#454545]
            text-white
            text-sm
            px-2
            py-[0.18rem]
            rounded-md
            relative
            "
          >
            <AiFillCaretLeft
              className="
              text-[#454545]
              absolute
              -left-3
              top-0
              text-2xl
              "
            />
            {label}
          </span>
        </div>
        <Icon size={26} />
      </div>
    </Link>
  )
}
