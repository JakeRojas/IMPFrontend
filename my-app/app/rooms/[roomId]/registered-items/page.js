'use client';

import { use } from 'react';
import MasterLayoutUI from '@/components/layoutsUI/masterLayout.ui';
import RegisteredItemsUI from '@/components/roomsUI/registeredItems.ui';

export default function RegisteredItemsPage({ params }) {
  const { roomId } = use(params);
  return (
    <MasterLayoutUI>
      <RegisteredItemsUI roomId={roomId} />
    </MasterLayoutUI>
  );
}