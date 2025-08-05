'use client';

import { API_URL, endpoints } from '@/config/apiConfig';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useFilteredRooms } from '@/hooks/useRoom';

export default function RoomListUI(/* { rooms = [] } */) {
  // 1️⃣ Filter state
  const [type,    setType]    = useState('');
  const [allRooms, setAllRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // // 2️⃣ Fetch all items once to get dropdown options
  // const [allRooms, setAllRooms] = useState([]);
  // useEffect(() => {
  //   fetch(API_URL + endpoints.getRoomsRoute)
  //     .then(r => r.json())
  //     .then(setAllRooms)
  //     .catch(console.error);
  // }, []);
  useEffect(() => {
    setLoading(true);
    fetch(API_URL + endpoints.getRoomsRoute)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setAllRooms(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  const types   = Array.from(new Set(allRooms.map(r => r.roomType)));

  // // 3️⃣ Get filtered items from your hook
  // const { rooms = [], loading, error } = useFilteredRooms({
  //   type
  // });
  const displayedRooms = type 
    ? allRooms.filter(r => r.roomType === type) 
    : allRooms;

  return (
    <>
    <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value=''>All Rooms</option>
        {types.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

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
    <div>
      {/* Loading / Error states */}
      {loading && <p>Loading…</p>}
      {error   && <p style={{ color: 'red' }}>{error.message}</p>}

      {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedRooms.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-medium mb-2">{r.roomName}</h3>
                <p className="text-gray-600 mb-4">Floor: {r.roomFloor}</p>
                <p className="text-gray-600 mb-4">Stockroom: {r.stockroomType}</p>
                <p className="text-gray-700 mb-4">
                  In Charge: {r.ownerss?.firstName} {r.ownerss?.lastName}
                </p>
                <div className="flex space-x-2">
                  <Link href={`/rooms/${r.id}`}>
                    <button className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition">
                      Go to room
                    </button> 
                  </Link>
                  {r.roomType === 'stockroom' && (
                    <Link href={`/rooms/${r.id}/receive`}>
                      <button className="px-3 py-1 rounded bg-green-500 text-white">
                        Receive
                      </button>
                    </Link>
                  )}
                  <Link href={`/rooms/${r.id}/registered-items`}>
                    <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition">
                      Registered Items
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          )
        }
        </div>
        </>
  );
}
