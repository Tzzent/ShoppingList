import prisma from '@/app/database/prismadb';

export default async function getItemsByCategory() {
  const categories = await prisma.category.findMany({
    include: {
      items: true,
    }
  });
  return categories;
};
