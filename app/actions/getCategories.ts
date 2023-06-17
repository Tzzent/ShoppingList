import prisma from '@/app/database/prismadb';

export default async function getCategories() {
  const categories = await prisma.category.findMany();

  return categories;

};
