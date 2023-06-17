'use client';

import useAside, { VIEWS } from '@/app/hooks/useAside';
import ShopList from './ShopList';
import FormAddItem from './FormAddItem';
import FormPreview from './FormPreview';
import { Category } from '@prisma/client';

interface AsideProps {
  categories: Category[],
}

export default function Aside({
  categories,
}: AsideProps) {
  const { isOpen, view } = useAside();

  let bodyContent = (
    <ShopList />
  )

  if (view === VIEWS.FORM_ADD) {
    bodyContent = (
      <FormAddItem categories={categories} />
    )
  }

  if (view === VIEWS.FORM_PREVIEW) {
    bodyContent = (
      <FormPreview />
    )
  }


  return (
    <aside
      className={`
      h-full
      flex
      flex-col
      absolute
      top-0
      pt-8
      bottom-0
      right-0
      left-[4.1rem]
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      ${view === VIEWS.SHOP_LIST && 'bg-[#FFF0DE]'}
      ${view === VIEWS.FORM_ADD && 'bg-slate-50'}
      ${view === VIEWS.FORM_PREVIEW && 'bg-white'}
      
      lg:relative
      lg:left-0
      lg:w-full
      lg:max-w-sm
      lg:translate-x-0
      `}
    >
      {bodyContent}
    </aside>
  )
}
