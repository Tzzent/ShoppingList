'use client';

import { Category, Item } from '@prisma/client';
import Title from '../typefaces/Title';
import PercentageBar from './PercentageBar';

interface TopBoxProps {
  title: string,
  items: Item[] | Category[],
  percentageColor: string,
}

export default function TopBox({
  title,
  items,
  percentageColor,
}: TopBoxProps) {
  return (
    <div className="w-full">
      <Title label={title} />
      <div
        className="
        flex
        flex-col
        gap-8
        "
      >
        {
          items?.map((item, index) => (
            <PercentageBar
              key={index}
              label={item.name}
              value={item.top}
              maxValue={Math.max(...items.map(item => item.top!))}
              color={percentageColor}
            />
          ))
        }
      </div>
    </div>
  )
}
