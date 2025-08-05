"use client";

import { API_URL, headers } from '@/config/apiConfig';
import { useState } from 'react';
import Modal from '@/components/reusableUI/modal';

export default function RegisterModal({ itemId, rooms, onClose }) {
  const [roomId, setRoomId, setOpen] = useState('');
  const handleRegister = async () => {
    await fetch(API_URL + `/room/${roomId}/register-item`, {
      method: 'POST',
      headers: headers.json, 
      body: JSON.stringify({ itemId }),
    });
    onClose(); 
  };
  return (
    <Modal onClose={() => setOpen(false)}>
      <h2>Register Item</h2>
      <select
        value={roomId}
        onChange={e => setRoomId(e.target.value)}
      >
        <option value="">Select room</option>
        {rooms.map(r => (
          <option key={r.id} value={r.id}>{r.roomName}</option>
        ))}
      </select>
      <button onClick={handleRegister} disabled={!roomId}>Register</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
}