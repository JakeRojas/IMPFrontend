'use client';

import { useState } from 'react';
import { useGetUserOptions } from '@/hooks/useRoom';
import { createRoomFetcher } from '@/services/roomService';

export default function RoomCreateForm() {
  const { options, loading } = useGetUserOptions();
  const [name, setName] = useState('');
  const [floor, setFloor] = useState('');
  const [inCharge, setInCharge] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    await createRoomFetcher({ name, floor, inCharge });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Room Name</label>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <label>Floor</label>
      <input
        type="text"
        value={floor}
        onChange={e => setFloor(e.target.value)}
        required
      />

      <label>In Charge</label>
      {loading ? (
        <select disabled>
          <option>Loading...</option>
        </select>
      ) : (
        <select
          value={inCharge}
          onChange={e => setInCharge(e.target.value)}
          required
        >
          <option value="">Select user</option>
          {options.map(u => (
            <option key={u.id} value={u.id}>
              {u.firstName} {u.lastName}
            </option>
          ))}
        </select>
      )}

      <button type="submit">Create Room</button>
    </form>
  );
}