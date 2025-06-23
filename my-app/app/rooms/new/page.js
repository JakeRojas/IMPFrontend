'use client';
import React from 'react';
import MasterLayoutUI from '@/components/layoutsUI/masterLayout.ui';
import { useCreateRoom } from '@/hooks/useRoom';
import RoomFormUI from '@/components/roomsUI/roomCreate.ui';

export default function NewRoomPage() {

  const { formData, setFormData, errorMsg, success, handleSubmit, users } = useCreateRoom();
  return (
    <MasterLayoutUI> 
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