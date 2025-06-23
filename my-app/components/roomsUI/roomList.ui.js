'use client';

import Link from 'next/link';
import React from 'react';

export default function RoomListUI({ rooms = [] }) {
  return (
    <div>
      <h2>Rooms</h2>
      <div style={{ marginBottom: '1rem' }}>
        <Link href="/rooms/new">
          <button
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            + Create Room
          </button>
        </Link>
      </div>

      {rooms.length === 0
        ? <p>No rooms found.</p>
        : (
          <ul>
            {rooms.map((r) => (
              <li key={r.id} style={{ marginBottom: '0.5rem' }}>
                <strong>{r.roomName}</strong> (Floor {r.roomFloor})<br/>
                In‑Charge: {r.ownerss?.firstName} {r.ownerss?.lastName}
                <Link href={`/rooms/${r.id}`}>
                  <button className="px-2 py-1 rounded shadow bg-gray-200">Details</button>
                </Link>
                <Link href={`/rooms/${r.id}/registered-items`}>
                  <button className="px-2 py-1 rounded shadow bg-gray-200">Registered Items</button>
                </Link>
              </li>
            ))}
          </ul>
        )
      }
    </div>
  );
}
