import prisma from '@/app/database/prismadb';

interface Iparams {
  itemId?: string,
}

export default async function getItemById(params: Iparams) {
  try {
    const { itemId } = params;

    const item = await prisma.item.findUnique({
      where: {
        id: itemId,
      },
      include: {
        category: true,
      },
    });

    if (!item) {
      return null;
    }
    return item;

  } catch (error: any) {
    throw new Error(error);
  }
};
