import { NextResponse } from 'next/server';

import prisma from '@/app/database/prismadb';

export async function POST(request: Request) {
  const body = await request.json();

  const {
    name,
    note,
    image,
    category
  } = body;

  if (!name) {
    return NextResponse.error();
  }

  let categoryId: string = category.value; // -> This is the id of the category

  if (category.__isNew__) { // -> If the category does not exist, create it
    const newCategory = await prisma.category.create({
      data: {
        name: category.label,
      }
    });

    categoryId = newCategory.id;
  }

  const item = await prisma.item.create({
    data: {
      name,
      note,
      image,
      categoryID: categoryId,
    },
    include: {
      category: true,
    }
  });

  return NextResponse.json(item);
}