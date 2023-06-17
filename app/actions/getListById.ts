import prisma from '@/app/database/prismadb';
import { IList } from '../interfaces';

interface Iparams {
  listId?: string,
}

export default async function getListById(params: Iparams) {
  try {
    const { listId } = params;

    const list = await prisma.list.findUnique({
      where: {
        id: listId,
      },
      include: {
        items: {
          include: {
            item: {
              include: {
                category: true,

              }
            },
          }
        },
      }
    });

    const categorizedItems: any = {};

    list?.items.forEach((listItem) => {
      const categoryName = listItem.item.category.name;

      if (!categorizedItems[categoryName]) {
        categorizedItems[categoryName] = [];
      }

      categorizedItems[categoryName].push(listItem);
    });

    const transformedList = {
      id: list?.id,
      name: list?.name,
      state: list?.state,
      createdAt: list?.createdAt,
      categories: Object.entries(categorizedItems).map(([categoryName, items]) => ({
        categoryName,
        items,
      })),
    };

    return transformedList as any;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
