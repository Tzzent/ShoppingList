import { NextResponse } from 'next/server';

import prisma from '@/app/database/prismadb';

interface BodyProps {
  name: string,
  state: boolean,
  items: Array<{
    id: string,
    name: string,
    categoryName: string,
    quantity: number,
  }>
}

export async function POST(request: Request) {
  const body = await request.json();

  const {
    name,
    state,
    items,
  } = body as BodyProps;

  if (!items || items.length === 0) {
    return NextResponse.error();
  }

  const totalLists = await prisma.list.count();

  if (totalLists >= 10) {
    const oldestList = await prisma.list.findFirst({
      orderBy: {
        createdAt: 'asc',
      },
    });

    await prisma.list_Item.deleteMany({
      where: {
        listID: oldestList?.id,
      },
    });

    await prisma.list.delete({
      where: {
        id: oldestList?.id,
      },
    });
  }

  const list = await prisma.list.create({
    data: {
      name,
      state,
    },
  });

  if (!list) {
    return NextResponse.error();
  }

  const listItems = items.map((item) =>
    prisma.list_Item.create({
      data: {
        listID: list.id,
        itemID: item.id,
        quantity: item.quantity,
      }
    })
  );

  await Promise.all(listItems);

  const updateItems = items.map((item) =>
    prisma.item.update({
      where: { id: item.id },
      data: {
        top: { increment: 1 },
        category: {
          update: {
            top: {
              increment: 1
            }
          }
        }
      },
    })
  );

  await Promise.all(updateItems);


  return NextResponse.json(list);
}