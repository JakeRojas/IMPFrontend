'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getRoomByIdFetcher, getRoomItemsFetcher } from '@/services/roomService';
import { getReceivedApparelFetcher } from '@/services/apparelService';
import { getReceivedSupplyFetcher } from '@/services/adminSupplyService';

export default function RoomDetailsUI({ roomId }) {
  const [room, setRoom]   = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const r = await getRoomByIdFetcher(roomId);
        setRoom(r);

        if (r.roomType === 'stockroom' && r.stockroomType === 'apparel') {
          const apparelBatches = await getReceivedApparelFetcher();
          setItems(apparelBatches);
        }
        else if (r.roomType === 'stockroom' && r.stockroomType === 'supply') {
          const supplyBatches = await getReceivedSupplyFetcher();
          setItems(supplyBatches);
        }
        else {
          const registered = await getRoomItemsFetcher(roomId);
          setItems(registered);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }
    load();
  }, [roomId]);

  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!room) return <p>Loading room…</p>;

  const isApparel = room.roomType === 'stockroom' && room.stockroomType === 'apparel';
  const isSupply  = room.roomType === 'stockroom' && room.stockroomType === 'supply';

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {room.roomName} {isApparel && '(Apparel Stockroom)'}{isSupply && '(Supply Stockroom)'}
      </h1>

      {items.length === 0 ? (
        <p>No items received yet.</p>
      ) : isApparel ? (
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th style={headerStyle}>ID</th>
              <th style={headerStyle}>Name</th>
              <th style={headerStyle}>Quantity</th>
              <th style={headerStyle}>Grade Level</th>
              <th style={headerStyle}>Size</th>
              <th style={headerStyle}>Apparel Type</th>
              <th style={headerStyle}>For</th>
              <th style={headerStyle}>Received At</th>
            </tr>
          </thead>
          <tbody>
            {items.map(batch => (
              <tr key={batch.id} className="border-b">
                <td style={cellStyle}>{batch.id}</td>
                <td style={cellStyle}>{batch.apparelName}</td>
                <td style={cellStyle}>{batch.apparelQuantity}</td>
                <td style={cellStyle}>{batch.apparelLevel}</td>
                <td style={cellStyle}>{batch.apparelSize}</td>
                <td style={cellStyle}>{batch.apparelType}</td>
                <td style={cellStyle}>{batch.apparelFor}</td>
                <td style={cellStyle}>
                  {new Date(batch.receivedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : isSupply ? (
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th style={headerStyle}>ID</th>
              <th style={headerStyle}>Name</th>
              <th style={headerStyle}>Quantity</th>
              <th style={headerStyle}>Measure</th>
              <th style={headerStyle}>Received At</th>
            </tr>
          </thead>
          <tbody>
            {items.map(batch => (
              <tr key={batch.id} className="border-b">
                <td style={cellStyle}>{batch.id}</td>
                <td style={cellStyle}>{batch.supplyName}</td>
                <td style={cellStyle}>{batch.supplyQuantity}</td>
                <td style={cellStyle}>{batch.supplyMeasure}</td>
                <td style={cellStyle}>
                  {new Date(batch.receivedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th style={headerStyle}>Item ID</th>
              <th style={headerStyle}>Item Name</th>
              <th style={headerStyle}>QR Code</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b">
                <td style={cellStyle}>{item.id}</td>
                <td style={cellStyle}>{item.itemName}</td>
                <td style={cellStyle}>{item.itemQrCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// inline style helpers
const headerStyle = {
  borderBottom: '1px solid #ccc',
  padding: '0.5rem',
  textAlign: 'center',
};
const cellStyle = {
  padding: '0.5rem',
  borderBottom: '1px solid #eee',
  textAlign: 'center',
};