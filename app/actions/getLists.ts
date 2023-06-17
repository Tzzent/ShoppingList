import prisma from '@/app/database/prismadb';

export default async function getLists() {

  const lists = await prisma.list.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return lists;
};
