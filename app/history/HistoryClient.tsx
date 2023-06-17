'use client';

import { List } from '@prisma/client';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import { FaAngleRight, FaRegCalendarMinus } from 'react-icons/fa';

import Container from '../components/Container';
import ItemBox from '../components/ItemBox';
import ItemsContent from '../components/ItemsContent';
import Title from '../components/typefaces/Title';

interface HistoryClientProps {
  lists: List[],
}

export default function HistoryClient({
  lists,
}: HistoryClientProps) {
  const router = useRouter();

  const historyByMonth = lists.reduce((acc: any, item: any) => {
    const monthYear = new Date(item.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(item);
    return acc;
  }, {});

  return (
    <Container>
      <Title label="Shopping history" />
      {
        Object.keys(historyByMonth).map((month: string) => (
          <ItemsContent
            key={month}
            title={month}
            className="flex flex-col"
          >
            {
              historyByMonth[month].map((item: any) => (
                <ItemBox
                  onClick={() => router.push(`/history/${item.id}`)}
                  key={item.id}
                  nameItem={item.name}
                  rightContent={
                    <RightItemBox
                      date={format(item.createdAt, 'EEE d.M.yyyy')}
                      state={item.state}
                    />
                  }
                />
              ))
            }
          </ItemsContent>
        ))
      }
    </Container>
  )
}


function RightItemBox({
  date,
  state,
}: {
  date: string,
  state: string,
}) {
  return (
    <div
      className="
      text-sm
      flex
      flex-wrap
      items-center
      justify-between
      lg:w-72
      gap-3
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
        ${state ? 'text-[#56CCF2]' : 'text-[#EB5757]'}
        ${state ? 'border-[#56CCF2]' : 'border-[#EB5757]'}
        `}
      >
        {state ? 'Completed' : 'Cancelled'}
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
  )
}