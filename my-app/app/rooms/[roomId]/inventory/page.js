// app/rooms/[roomId]/inventory/page.js
'use client';

import { useParams } from 'next/navigation';
import MasterLayoutUI from '@/app/layout/masterLayout.layout';
import InventoryUI    from './inventory.layout';

export default function InventoryPage() {
  const { roomId } = useParams();

  return (
    <MasterLayoutUI>
      <InventoryUI roomId={roomId} />
    </MasterLayoutUI>
  );
}
