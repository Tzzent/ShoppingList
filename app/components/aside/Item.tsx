'use client';

import { useCallback, useState } from 'react';
import { BiTrashAlt, BiPlus, BiMinus } from 'react-icons/bi';

import Button from '../buttons/Button';
import InputCheck from '../inputs/InputCheck';
import useList from '@/app/hooks/useList';

export interface ItemProps {
  id: string,
  name: string;
  quantity: number;
  editList: boolean,
}

export default function Item({
  id,
  name,
  quantity,
  editList,
}: ItemProps) {
  const {
    removeItem,
    decrementItem,
    incrementItem,
  } = useList();
  const [isEdit, setIsEdit] = useState<Boolean>(false);

  const handleDecrement = useCallback(() => {
    if (quantity > 1) {
      decrementItem(id);
    }
  }, [decrementItem, id, quantity]);

  const handleIncrement = useCallback(() => {
    incrementItem(id);
  }, [incrementItem, id]);

  let rightOptions = isEdit ? (
    <div
      className="
      bg-white
      rounded-xl
      flex
      items-center
      gap-2
      h-10
      pr-2
      "
    >
      <Button
        onClick={() => removeItem(id)}
        icon={BiTrashAlt}
        className="px-2 h-full"
      />
      <Button
        onClick={handleDecrement}
        icon={BiMinus}
        link
      />
      <Button
        onClick={() => setIsEdit(false)}
        outline
        label={`${quantity} pcs`}
        className="
        flex
        justify-center
        w-[4rem] 
        rounded-full 
        truncate 
        py-1
        px-2
        text-sm
        "
      />
      <Button
        onClick={handleIncrement}
        icon={BiPlus}
        link
      />
    </div>
  ) : (
    <Button
      onClick={() => setIsEdit(true)}
      outline
      label={`${quantity} pcs`}
      className="
      flex
      justify-center
      w-[4rem] 
      rounded-full 
      truncate 
      py-1
      px-2
      text-sm
      "
    />
  );

  return (
    <div
      className="
      flex 
      justify-between
      items-center
      "
    >
      <InputCheck
        label={name}
        disabled={!editList}
      />
      {rightOptions}
    </div>
  )
}
