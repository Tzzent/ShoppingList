import getTopCategories from '../actions/getTopCategories';
import getTopItems from '../actions/getToPItems';
import getTotalItemsByMonth from '../actions/getTotalItemsByMonth';
import ClientOnly from '../components/ClientOnly';
import StatisticsClient from './StatisticsClient';

export default async function StatisticsPage() {
  const topItems = await getTopItems();
  const topCategories = await getTopCategories();
  const montlyTotals = await getTotalItemsByMonth();

  return (
    <ClientOnly>
      <StatisticsClient
        topItems={topItems}
        topCategories={topCategories}
        montlyTotals={montlyTotals}
      />
    </ClientOnly>
  )
}
