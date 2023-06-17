'use client';

import { useRouter } from 'next/navigation';
import { FaAngleRight, FaRegCalendarMinus } from 'react-icons/fa';

export interface HistoryItemProps {
  title: string,
  date: string,
  state: string,
}

export default function HistoryItem({
  title,
  date,
  state,
}: HistoryItemProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/history/2`)}
      className="
      bg-white
      relative
      px-4 
      py-3
      flex
      flex-col
      justify-between
      gap-5
      lg:flex-row
      lg:items-center
      rounded-xl
      cursor-pointer
      hover:scale-105
      "
    >
      <div
        className="
        font-semibold 
        line-clamp-3
        max-w-[15rem]
        "
      >
        {title}
      </div>
      <div
        className="
        text-sm
        flex
        flex-wrap
        lg:w-64
        gap-3
        items-center
        justify-between
        "
      >
        <div
          className="
          text-[#C1C1C4]
          flex
          items-center
          gap-2
          "
        >
          <FaRegCalendarMinus size={20} />
          {date}
        </div>
        <div
          className={`
          border
          rounded-lg
          px-2
          ${state === 'completed' ? 'text-[#56CCF2]' : 'text-[#EB5757]'}
          ${state === 'completed' ? 'border-[#56CCF2]' : 'border-[#EB5757]'}
              `}
        >
          {state}
        </div>
        <FaAngleRight
          size={20}
          className="
          text-[#F9A109]
          absolute
          top-4
          right-4
          sm:relative
          sm:top-0
          sm:right-0
          "
        />
      </div>
    </div>
  )
}
