'use client';

import { use } from 'react';
import MasterLayoutUI from '@/app/layout/masterLayout.layout';
import RegisteredItemsUI from '@/app/rooms/[roomId]/registered-items/registeredItems.layout';

export default function RegisteredItemsPage({ params }) {
  const { roomId } = use(params);
  return (
    <MasterLayoutUI>
      <RegisteredItemsUI roomId={roomId} />
    </MasterLayoutUI>
  );
}