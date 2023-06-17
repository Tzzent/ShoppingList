'use client';

import HistoryItem, { HistoryItemProps } from './HistoryItem';

interface HistoryListProps {
  history: HistoryItemProps[],
}

export default function HistoryList({
  history,
}: HistoryListProps) {
  return (
    <div className="flex flex-col gap-4">
      {history.map((item, index) => (
        <HistoryItem
          key={index}
          {...item}
        />
      ))}
    </div>
  )
}
