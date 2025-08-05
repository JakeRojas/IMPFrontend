'use client';

import { useRouter } from 'next/navigation';
import { useRoomDetails } from '@/hooks/useRoom';
import {React, use} from 'react';

export default function RoomDetailsUI() {
  const router = useRouter();
  const {room, error} = useRoomDetails();

  return (
    <div>
    <div className="modal">
      <h3>{room}</h3>
      <p>ID: {room}</p>
    </div>
    </div>
  );
}
