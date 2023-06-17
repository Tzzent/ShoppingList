import { create } from 'zustand';

export interface ListItem {
  id: string,
  name: string,
  categoryName: string,
  quantity: number,
}

interface ListStore {
  title: string,
  listItems: ListItem[],
  addItem: (newItem: ListItem) => void,
  removeItem: (id: string) => void,
  incrementItem: (id: string) => void,
  decrementItem: (id: string) => void,
  clearItems: () => void,
  setTitle: (newTitle: string) => void,
}

const useList = create<ListStore>((set) => ({
  title: 'Shopping List',
  listItems: [],
  addItem: (newItem: ListItem) => {
    set((state) => {
      const itemIndex = state.listItems.findIndex((item) => item.id === newItem.id);

      if (itemIndex !== -1) {
        const updatedListItems = [...state.listItems];
        updatedListItems[itemIndex].quantity += newItem.quantity;

        return { listItems: updatedListItems };
      }

      return { listItems: [...state.listItems, newItem] };
    });
  },
  removeItem: (id: string) => {
    set((state) => {
      const itemIndex = state.listItems.findIndex((item) => item.id === id);
      const updatedListItems = [...state.listItems];
      updatedListItems.splice(itemIndex, 1);
      return { listItems: updatedListItems };
    })
  },
  incrementItem: (id: string) => {
    set((state) => {
      const itemIndex = state.listItems.findIndex((item) => item.id === id);
      const updatedListItems = [...state.listItems];
      updatedListItems[itemIndex].quantity++;
      return { listItems: updatedListItems };
    })
  },
  decrementItem: (id: string) => {
    set((state) => {
      const itemIndex = state.listItems.findIndex((item) => item.id === id);
      const updatedListItems = [...state.listItems];
      updatedListItems[itemIndex].quantity--;
      return { listItems: updatedListItems };
    })
  },
  clearItems: () => { set({ listItems: [], title: 'Shopping List' }) },
  setTitle: (newTitle: string) => set({ title: newTitle }),
}));

export default useList;