'use client';

import { useRouter } from 'next/navigation';
import { FaLongArrowAltLeft, FaRegCalendarMinus } from 'react-icons/fa';
import { format } from 'date-fns';

import Button from '@/app/components/buttons/Button';
import Container from '@/app/components/Container';
import Title from '@/app/components/typefaces/Title';
import ItemBox from '@/app/components/ItemBox';
import ItemsContent from '@/app/components/ItemsContent';
import { IList } from '@/app/interfaces';
import useAside from '@/app/hooks/useAside';

interface HistoryIdClientProps {
  list: IList,
}

export default function HistoryIdClient({
  list,
}: HistoryIdClientProps) {
  const { onSelectedItem } = useAside();
  const router = useRouter();

  return (
    <Container>
      <Button
        onClick={() => router.push('/history')}
        icon={FaLongArrowAltLeft}
        label="back"
        link
        className="mb-8"
      />
      <div className="mb-8">
        <Title
          label={list.name}
        />
        <div
          className="
          text-[#C1C1C4]
          flex
          items-center
          gap-2
          "
        >
          <FaRegCalendarMinus size={20} />
          {format(list.createdAt, 'EEE d.M.yyyy')}
        </div>
      </div>
      {
        list?.categories?.map((category, index) => (
          <ItemsContent
            key={index}
            title={category.categoryName}
          >
            {
              category?.items?.map((item, index) => (
                <ItemBox
                  onClick={() => onSelectedItem(item.item.category, item.item)}
                  key={index}
                  nameItem={item.item.name}
                  rightContent={<RightItemBox cantPcs={item.quantity} />}
                />
              ))
            }
          </ItemsContent>
        ))}
    </Container>
  )
}


function RightItemBox({
  cantPcs
}: {
  cantPcs: number
}) {
  return (
    <div
      className="
      text-[#F9A10A] 
      w-8
      truncate
      text-xs
      "
    >
      {cantPcs} pcs
    </div>
  )
}