import getListById from '@/app/actions/getListById';
import ClientOnly from '@/app/components/ClientOnly';
import HistoryIdClient from './HistoryIdClient';

interface IParams {
  listId?: string,
}

export default async function HistoryDetail({ params }: { params: IParams }) {
  const list = await getListById(params);

  if (!list) return null;

  return (
    <ClientOnly>
      <HistoryIdClient
        list={list}
      />
    </ClientOnly>
  )
}