import { create } from 'zustand';
import { Category, Item } from '@prisma/client';

import { IItem } from '../interfaces';

export enum VIEWS {
  SHOP_LIST = 0,
  FORM_ADD = 1,
  FORM_PREVIEW = 2,
}

interface AsideStore {
  view: VIEWS,
  isOpen: boolean,

  itemSelected: IItem | null,
  onSelectedItem: (category: Category, item: Item) => void,

  toggleOpenAside: () => void,
  toShopList: () => void,
  toFormAdd: () => void,
  toFormPreview: () => void,
}

const useAside = create<AsideStore>((set) => ({
  view: VIEWS.SHOP_LIST,
  isOpen: false,

  itemSelected: null,
  onSelectedItem: (category: Category, item: Item) => set({
    itemSelected: {
      ...item,
      category,
    },
    isOpen: true,
    view: VIEWS.FORM_PREVIEW,
  }),

  toggleOpenAside: () => set((state) => ({ isOpen: !state.isOpen })),
  toShopList: () => set({ view: VIEWS.SHOP_LIST }),
  toFormAdd: () => set({ view: VIEWS.FORM_ADD }),
  toFormPreview: () => set({ view: VIEWS.FORM_PREVIEW }),
}));

export default useAside;