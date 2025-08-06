'use client';

import { use } from 'react';
import MasterLayoutUI from '@/app/layout/masterLayout.layout';
import RoomDetailsUI from '@/app/rooms/[roomId]/roomDetails.layout';

export default function RoomPage(props) {
  const { roomId } = use(props.params);
  return (
    <MasterLayoutUI>
      <RoomDetailsUI roomId={roomId} />
    </MasterLayoutUI>
  );
}