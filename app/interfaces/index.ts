import { Category, Item, List, List_Item } from '@prisma/client';

export interface ICategory extends Category {
  items: Item[],
}

export interface IItem extends Item {
  category: Category,
}

export interface IList extends List {
  categories: {
    categoryName: string;
    items: (List_Item & {
      item: IItem,
    })[];
  }[];
}