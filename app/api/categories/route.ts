import { NextResponse } from 'next/server';

import prisma from '@/app/database/prismadb';

export async function POST(request: Request) {
  const body = await request.json();

  const { name } = body;

  if (!name) {
    return NextResponse.error();
  }

  const newCategory = await prisma.category.create({
    data: {
      ...body
    }
  });

  return NextResponse.json({
    newItem: newCategory
  });
}