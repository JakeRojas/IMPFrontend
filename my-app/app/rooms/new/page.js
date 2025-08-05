'use client';
import React from 'react';
import MasterLayoutUI from '@/app/layout/masterLayout.layout';
import { useCreateRoom } from '@/hooks/useRoom';
import RoomFormUI from '@/app/rooms/new/roomCreate.layout';

export default function NewRoomPage() {

  const { formData, setFormData, errorMsg, success, handleSubmit, users } = useCreateRoom();
  return (
    <MasterLayoutUI> 
      <h1>Rooms/new</h1>
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <RoomFormUI
        formData={formData}
        setFormData={setFormData}
        errorMsg={errorMsg}
        success={success}
        handleSubmit={handleSubmit}
        users={users}
      />
    </div> 
    </MasterLayoutUI>
  );
}