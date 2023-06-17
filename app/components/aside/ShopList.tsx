'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { FaPen } from 'react-icons/fa';
import axios from 'axios';

import Container from '../Container';
import Empty from '../Empty';
import InputSave from '../inputs/InputSave';
import Button from '../buttons/Button';
import ItemsList from './ItemsList';
import AsideFooter from './AsideFooter';
import AsideMain from './AsideMain';
import useAside from '@/app/hooks/useAside';
import Title from '../typefaces/Title';
import Item from './Item';
import useList from '@/app/hooks/useList';
import useConfirmModal from '@/app/hooks/useConfirmModal';

export default function ShopList() {
  const {
    title,
    setTitle,
    listItems,
    clearItems,
  } = useList();
  const router = useRouter();
  const { toFormAdd } = useAside();
  const confirmModal = useConfirmModal();
  const [editList, setEditList] = useState<boolean>(false);

  const list = useMemo(() => listItems.reduce((acc: any, item: any) => {
    if (!acc[item.categoryName]) {
      acc[item.categoryName] = [];
    }
    acc[item.categoryName].push(item);
    return acc;
  }, {}), [listItems]);

  const handleSetTitle = (title: string) => {
    if (title) {
      setTitle(title);
    }
  };

  const handleCancelList = async () => {
    const confirm = await confirmModal.isConfirm('Are your sure you want to cancel this list?');
    if (confirm) {

      toast.promise(
        axios.post('/api/lists', {
          name: title,
          state: false,
          items: listItems,
        }),
        {
          loading: 'Cancelling list...',
          success: () => {
            clearItems();
            setEditList(false);
            router.refresh();
            return 'List cancelled successfully 👌';
          },
          error: (error) => {
            console.log(error);
            return 'Something went wrong 🙀!';
          }
        }
      );
    }
  }

  const handleCompleteList = async () => {
    const confirm = await confirmModal.isConfirm('Are your sure you want to complete this list?', '#00DFA2');

    if (confirm) {

      toast.promise(
        axios.post('/api/lists', {
          name: title,
          state: true,
          items: listItems,
        }),
        {
          loading: 'Completing list...',
          success: () => {
            clearItems();
            setEditList(false);
            router.refresh();
            return 'List completed successfully 📝';
          },
          error: (error) => {
            console.log(error);
            return 'Something went wrong 🙀!';
          }
        }
      );
    }
  }

  return (
    <>
      <Container>
        <div
          className="
          bg-[#80485B]
          rounded-3xl
          flex
          justify-evenly
          items-center
          mb-8
          "
        >
          <div className="-translate-y-5">
            <Image
              alt="bottle"
              src="/assets/images/bottle.svg"
              width={80}
              height={80}
            />
          </div>
          <div className="px-4 py-2">
            <div
              className="
              mb-2 
              text-sm
              text-white
              font-bold
              max-w-[10em]
              "
            >
              Didn’t find what you need?
            </div>
            <Button
              onClick={toFormAdd}
              label="Add item"
              className="bg-white text-black text-xs"
            />
          </div>
        </div>
        {listItems.length > 0 && (
          <Title>
            <div
              className="
              flex
              justify-between 
              items-center
              gap-5
              text-black
              "
            >
              <div className="line-clamp-2 text-ellipsis">
                {title}
              </div>
              <Button
                onClick={() => setEditList(!editList)}
                icon={FaPen}
                link
                className="text-black"
              />
            </div>
          </Title>
        )}
      </Container>
      <AsideMain>
        {listItems.length > 0
          ? (
            <Container>
              {Object.keys(list).map((category, index) => (
                <ItemsList
                  key={index}
                  title={category}
                >
                  {list[category]?.map((item: any, index: number) => (
                    <Item
                      key={index}
                      id={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      editList={editList}
                    />
                  ))}
                </ItemsList>
              ))}
            </Container>
          ) : (
            <Empty />
          )}
      </AsideMain>
      <AsideFooter>
        {listItems.length === 0 &&
          <div
            className="
              absolute
              -top-56
              left-0
              right-0
              z-10
              flex
              justify-center
              "
          >
            <Image
              alt="Buy an item"
              src="/assets/images/empty-list.svg"
              width={250}
              height={250}
            />
          </div>}
        {editList && listItems.length > 0 ? (
          <div className="w-full flex justify-around gap-5">
            <Button
              onClick={handleCancelList}
              label="cancel"
              link
              className="text-black"
            />
            <Button
              onClick={handleCompleteList}
              label="Complete"
              className="py-4 bg-[#56CCF2]"
            />
          </div>
        ) : (
          <InputSave
            disabled={listItems.length === 0}
            onSave={handleSetTitle}
          />
        )}
      </AsideFooter>
    </>
  )
}
