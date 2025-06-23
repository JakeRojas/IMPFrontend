'use client';
import React from 'react';
import MasterLayoutUI from '@/components/layoutsUI/masterLayout.ui';
import { useGetRooms } from '@/hooks/useRoom';
import RoomListUI from '@/components/roomsUI/roomList.ui';

export default function RoomsPage() {
  const { rooms, error } = useGetRooms();

  return (
    <MasterLayoutUI> 
      <RoomListUI rooms={rooms} /> 
    </MasterLayoutUI>
  );
}