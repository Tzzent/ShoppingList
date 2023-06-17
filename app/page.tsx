import getItemsByCategory from './actions/getItemsByCategory';
import ClientOnly from './components/ClientOnly';
import HomeClient from './HomeClient';

export default async function HomePage() {
  const categories = await getItemsByCategory();

  return (
    <ClientOnly>
      <HomeClient
        categories={categories}
      />
    </ClientOnly>
  )
}
