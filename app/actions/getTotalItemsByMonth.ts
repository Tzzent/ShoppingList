import { format } from 'date-fns';
import prisma from '@/app/database/prismadb';

export default async function getTotalItemsByMonth() {

  const currentDate = new Date();
  const sixMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, 1);

  const result = await prisma.list_Item.findMany({
    where: {
      list: {
        createdAt: {
          gte: sixMonthsAgo,
          lte: currentDate,
        },
      },
    },
    select: {
      createdAt: true,
      quantity: true,
    },
  });

  const monthlyTotals: any = {};

  result.forEach((entry) => {
    const month = format(entry.createdAt, 'MMMM');
    const quantity = entry.quantity;

    if (!monthlyTotals[month]) {
      monthlyTotals[month] = 0;
    }

    monthlyTotals[month] += quantity;
  });

  const monthlyTotalsArray = Object.entries(monthlyTotals).map(([month, items]) => ({
    month,
    items,
  }));

  return monthlyTotalsArray as any;
};
