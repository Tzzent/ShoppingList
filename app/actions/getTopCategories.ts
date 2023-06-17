import prisma from '@/app/database/prismadb';

export default async function getTopCategories() {
  const topCategories = await prisma.category.findMany({
    orderBy: {
      top: 'desc',
    },
    take: 3,
  });

  return topCategories;
};
