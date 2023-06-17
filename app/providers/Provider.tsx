'use client';

import ClientOnly from '../components/ClientOnly';
import ConfirmModal from '../components/modals/ConfirmModal';
import ToasterProvider from './ToasterProvider';

export default function Provider() {
  return (
    <ClientOnly>
      <ToasterProvider />
      <ConfirmModal />
    </ClientOnly>
  )
}
