'use client';

import { API_URL, endpoints } from '@/config/apiConfig';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RegisterModal from './RegisterModal.ui';

export default function ItemListUI({ items = [] }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [rooms, setRooms] = useState([]);
 
  useEffect(() => {
    fetch(API_URL + endpoints.getRoomsRoute)
      .then(r => r.json())
      .then(setRooms)
      .catch(console.error);
  }, []);
 
  const openModal = (itemId) => {
    setSelectedItemId(itemId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
  };

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <Link href="/items">
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
            + Create Item
          </button>
        </Link>
      </div>
      <ul>
        {items.map(i => (
          <li key={i.id}>
            <strong>{i.itemName} {i.itemCategory}</strong>
            <button onClick={() => openModal(i.id)}>Register</button>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <RegisterModal
          itemId={selectedItemId}
          rooms={rooms}
          onClose={closeModal}
        />
      )}
    </>
  )
}