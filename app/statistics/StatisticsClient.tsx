'use client';

import { Category, Item } from '@prisma/client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartJSTitle,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartJSTitle,
  Tooltip,
  Legend
);

import Container from '../components/Container';
import TopBox from '../components/statistics/TopBox';
import Title from '../components/typefaces/Title';

interface StatisticsClientProps {
  topItems: Item[],
  topCategories: Category[],
  montlyTotals: { month: string, items: number }[],
}

export default function StatisticsClient({
  montlyTotals,
  topItems,
  topCategories,
}: StatisticsClientProps) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const data = {
    labels: montlyTotals.map(item => item.month),
    datasets: [
      {
        label: 'Items',
        data: montlyTotals.map(item => item.items),
        borderColor: '#F9A109',
        backgroundColor: '#F9A109',
        tension: 0.4,
      },
    ],
  };

  return (
    <Container>
      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-10
        "
      >
        <TopBox
          title="Top Items"
          items={topItems}
          percentageColor="#F9A109"
        />
        <TopBox
          title="Top Categories"
          items={topCategories}
          percentageColor="#56CCF2"
        />
      </div>
      <div className="my-10">
        <Title label="Monthly Summary" />
      </div>
      <Line
        options={options}
        data={data}
        height={110}
      />
    </Container>
  )
}
