import getLists from '../actions/getLists';
import ClientOnly from '../components/ClientOnly';
import HistoryClient from './HistoryClient';

export default async function HistoryPage() {
  const lists = await getLists();

  return (
    <ClientOnly>
      <HistoryClient
        lists={lists}
      />
    </ClientOnly>
  )
}
