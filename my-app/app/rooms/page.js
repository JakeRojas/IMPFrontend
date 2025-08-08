'use client';
import React from 'react';
import MasterLayoutUI from '@/app/layout/masterLayout.layout';
import { useGetRooms } from '@/hooks/useRoom';
import RoomListUI from '@/app/rooms/roomList.layout';
//import ProtectedRoute from '@/components/roleGuard/protectedRoute';

export default function RoomsPage() {
  const { rooms, error } = useGetRooms();

  return (
    <MasterLayoutUI> 
      <h1>Rooms</h1>
      <RoomListUI rooms={rooms} /> 
    </MasterLayoutUI>
  );
}

// import MasterLayoutUI from '@/app/layout/masterLayout.layout';
// import RoomListUI from '@/app/rooms/roomList.layout';
// import { getRoomsFetcher } from '@/services/roomService';

// export default async function RoomsPage() {
//   const rooms = await getRoomsFetcher();
//   return (
//     <MasterLayoutUI>
//       <h1>Rooms</h1>
//       <RoomListUI initialRooms={rooms} />
//     </MasterLayoutUI>
//   );
// }