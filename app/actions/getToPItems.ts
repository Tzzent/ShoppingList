import prisma from '@/app/database/prismadb';

export default async function getTopItems() {
  const topItems = await prisma.item.findMany({
    orderBy: {
      top: 'desc',
    },
    take: 3,
  });

  return topItems;
};
