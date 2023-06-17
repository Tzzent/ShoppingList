import { NextResponse } from 'next/server';

import prisma from '@/app/database/prismadb';

interface IParams {
  itemId?: string,
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams },
) {
  const { itemId } = params;

  if (!itemId) {
    throw new Error('Invalid ID');
  }

  const item = await prisma.item.delete({
    where: {
      id: itemId,
    },
  });

  if (!item) {
    throw new Error('Item not found');
  }

  return NextResponse.json(item);
}