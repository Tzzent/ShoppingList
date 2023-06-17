'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import useAside from '@/app/hooks/useAside';
import Button from '../buttons/Button';
import Container from '../Container';
import AsideFooter from './AsideFooter';
import AsideMain from './AsideMain';
import useList from '@/app/hooks/useList';
import useConfirmModal from '@/app/hooks/useConfirmModal';
import { Item } from '@prisma/client';

export default function FormPreview() {
  const router = useRouter();
  const confirmModal = useConfirmModal();
  const { addItem, removeItem } = useList();
  const { itemSelected, toShopList } = useAside();

  const handleAddItem = () => {
    if (itemSelected) {
      addItem({
        id: itemSelected.id,
        name: itemSelected.name,
        categoryName: itemSelected.category.name,
        quantity: 1,
      })
    }
    toShopList();
  };

  const handleDeleteItem = async () => {
    const confirm = await confirmModal.isConfirm('Are you sure that you want to delete this item?');

    if (confirm && itemSelected) {
      toast.promise(
        axios.delete(`/api/items/${itemSelected.id}`),
        {
          loading: 'Deleting...',
          success: ({ data: item }: { data: Item }) => {
            removeItem(item.id);
            toShopList();
            router.refresh();
            return 'Item deleted 🚮';
          },
          error: (err) => {
            console.log(err);
            return 'Something went wrong 🙀!';
          }
        }
      );
    }
  };

  return (
    <>
      <Container>
        <Button
          onClick={toShopList}
          icon={FaLongArrowAltLeft}
          label="back"
          link
        />
      </Container>
      <AsideMain>
        <Container>
          <Image
            alt="item-preview"
            src={itemSelected?.image || 'https://ferrous.vedantametalbazaar.com//assets/images/no_image_available.jpg'}
            width={400}
            height={400}
            className="rounded-3xl my-8"
          />
          <div className="my-8">
            <span className="text-[#C1C1C4] text-sm">name</span>
            <div className="text-2xl">
              {itemSelected?.name}
            </div>
          </div>
          <div className="my-8">
            <span className="text-[#C1C1C4] text-sm">category</span>
            <div className="text-lg">
              {itemSelected?.category.name}
            </div>
          </div>
          <div className="my-8">
            <span className="text-[#C1C1C4] text-sm">note</span>
            <div className="text-lg">
              {itemSelected?.note}
            </div>
          </div>
        </Container>
      </AsideMain>
      <AsideFooter className="bg-transparent">
        <div className="w-full flex justify-around gap-5">
          <Button
            onClick={handleDeleteItem}
            label="delete"
            link
            className="text-black"
          />
          <Button
            onClick={handleAddItem}
            label="Add to list"
            className="py-4"
          />
        </div>
      </AsideFooter>
    </>
  )
}