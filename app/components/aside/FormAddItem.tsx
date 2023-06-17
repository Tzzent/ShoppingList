'use client';

import {
  FieldValues,
  useForm,
  SubmitHandler,
} from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import useAside from '@/app/hooks/useAside';
import Button from '../buttons/Button';
import Container from '../Container';
import InputText from '../inputs/InputText';
import AsideFooter from './AsideFooter';
import AsideMain from './AsideMain';
import ClientOnly from '../ClientOnly';
import { Category } from '@prisma/client';
import useConfirmModal from '@/app/hooks/useConfirmModal';
import { IItem } from '@/app/interfaces';

interface FormAddItemProps {
  categories: Category[],
}

export default function FormAddItem({
  categories,
}: FormAddItemProps) {
  const router = useRouter();
  const confirmModal = useConfirmModal();
  const {
    toShopList,
    onSelectedItem,
  } = useAside();
  const {
    register,
    control,
    handleSubmit,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const body = {
      name: data.name,
      note: data.note,
      image: data.image,
      category: data.category,
    };

    toast.promise(
      axios.post('/api/items', body),
      {
        loading: 'Adding item...',
        success: ({ data: item }: { data: IItem }) => {
          onSelectedItem(item.category, item);
          router.refresh();
          return 'Item added successfully 🆕!';
        },
        error: (err) => {
          console.log(err);
          return 'Something went wrong 🙀!';
        }
      }
    )
  };

  const handleCancelItem = async () => {
    const confirm = await confirmModal.isConfirm('Are you sure you want to cancel this item?');
    if (confirm) {
      toShopList();
    }
  };

  return (
    <>
      <ClientOnly>
        <Container>
          <div className="font-bold text-2xl mb-8">
            Add a new item
          </div>
        </Container>
        <AsideMain>
          <Container>
            <div className="flex flex-col gap-8">
              <InputText
                id="name"
                label="Name"
                placeholder="Enter a name"
                register={register}
                required
              />
              <InputText
                id="note"
                label="Note (optional)"
                placeholder="Enter a note"
                rows={4}
                register={register}
              />
              <InputText
                id="image"
                label="Image (optional)"
                placeholder="Enter a url"
                register={register}
              />
              <InputText
                id="category"
                label="Category"
                placeholder="Enter a category"
                dropList={
                  categories.map((category) => (
                    { value: category.id, label: category.name }
                  ))
                }
                control={control}
              />
            </div>
          </Container>
        </AsideMain>
        <AsideFooter className="bg-transparent">
          <div className="w-full flex justify-around gap-5">
            <Button
              onClick={handleCancelItem}
              label="cancel"
              link
              className="text-black"
            />
            <Button
              onClick={handleSubmit(onSubmit)}
              label="Save"
              className="py-4"
            />
          </div>
        </AsideFooter>
      </ClientOnly>

    </>
  )
}
