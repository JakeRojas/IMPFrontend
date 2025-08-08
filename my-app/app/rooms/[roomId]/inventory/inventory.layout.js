'use client';

import { useGetInventory } from '@/hooks/useRoom';

export default function InventoryUI({ roomId }) {
  const { items, loading, error } = useGetInventory(roomId);

  if (loading) return <p>Loading inventory…</p>;
  if (error)   return <p className="text-red-600">Error: {error}</p>;

  if (items.length === 0) {
    return <p>No inventory records found.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Inventory</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Level</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">For</th>
            <th className="border px-4 py-2">Size</th>
            <th className="border px-4 py-2">Total Qty</th>
          </tr>
        </thead>
        <tbody>
          {items.map(it => (
            <tr key={`${it.apparelName}-${it.apparelSize}`} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{it.apparelName}</td>
              <td className="border px-4 py-2">{it.apparelLevel}</td>
              <td className="border px-4 py-2">{it.apparelType}</td>
              <td className="border px-4 py-2">{it.apparelFor}</td>
              <td className="border px-4 py-2">{it.apparelSize}</td>
              <td className="border px-4 py-2 text-center">{it.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
