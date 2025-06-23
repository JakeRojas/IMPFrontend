'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGetRoomItems } from '@/hooks/useRoom';

export default function RegisteredItemsUI({ roomId }) {
  const router = useRouter();
  const { items, error } = useGetRoomItems(roomId);

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p className="text-red-600">
          Failed to load registered items for Room {roomId}: {error.message}
        </p>
      </div>
    );
  }

  if (!items) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading registered items…</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Registered Items (Room {roomId})</h1>
        {/* Scan button routes to /rooms/[roomId]/scan */}
        <Link href={`/rooms/${roomId}/scanner`}>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Scan Items
          </button> 
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-600">No items have been registered in this room yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Item Name</th>
              <th className="border px-4 py-2 text-left">QR Code</th>
            </tr>
          </thead>
          {/* <tbody>
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{item.itemName}</td>
                <td className="border px-4 py-2">{item.itemQrCode}</td>
              </tr>
            ))}
          </tbody> */}
          <tbody>
  {items.map((item, idx) => (
    <tr key={idx} className="hover:bg-gray-50">
      <td className="border px-4 py-2">{item.itemName}</td>
      <td className="border px-4 py-2">{item.itemQrCode}</td>
    </tr>
  ))}
</tbody>
        </table>
      )}
    </div>
  );
}
