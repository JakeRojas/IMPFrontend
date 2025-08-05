// 'use client';

// import { API_URL, endpoints } from '@/config/apiConfig';
// import { downloadItemQrCodeFetcher } from '@/services/itemService';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import RegisterModal from './RegisterModal.ui';

// export default function ItemListUI({ items = [] }) {
//   const router = useRouter();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedItemId, setSelectedItemId] = useState(null);
//   const [rooms, setRooms] = useState([]);
 
//   useEffect(() => {
//     fetch(API_URL + endpoints.getRoomsRoute)
//       .then(r => r.json())
//       .then(setRooms)
//       .catch(console.error);
//   }, []);
 
//   const openModal = (itemId) => {
//     setSelectedItemId(itemId);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedItemId(null);
//   };

//   // call your service which fetches the PNG blob and triggers download
//   const handleGenerateQr = async (itemId) => {
//     try {
//     await downloadItemQrCodeFetcher(itemId);
//     } catch (err) {
//     console.error('QR download failed', err);
//     // optionally show a toast or set error state
//     }
//   };

//   return (
//     <>
//       <div style={{ marginBottom: '1rem' }}>
//         <Link href="/items">
//           <button
//             style={{
//               padding: '0.5rem 1rem',
//               borderRadius: '4px',
//               backgroundColor: '#0070f3',
//               color: 'white',
//               border: 'none',
//               cursor: 'pointer'
//             }}
//           >
//             + Create Item
//           </button>
//         </Link>
//       </div>
//       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//   <thead>
//     <tr>
//       <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '0.5rem', textAlign: 'center' }}>Name</th>
//       <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '0.5rem', textAlign: 'center' }}>Category</th>
//       <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '0.5rem', textAlign: 'center' }}>Status</th>
//       <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '0.5rem', textAlign: 'center' }}>Transaction</th>
//       <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '0.5rem', textAlign: 'center' }}>Activated?</th>
//       <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Actions</th>
//       <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem' }}>QR Path</th>
//     </tr>
//   </thead>
//   <tbody>
//     {items.map(i => (
//       <tr key={i.id}>
//         <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee', textAlign: 'center' }}>{i.itemName}</td>
//         <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee', textAlign: 'center' }}>{i.itemCategory}</td>
//         <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee', textAlign: 'center' }}>{i.itemStatus}</td>
//         <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee', textAlign: 'center' }}>{i.transactionStatus}</td>
//         <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee', textAlign: 'center' }}>
//           {i.activateStatus ? 'Yes' : 'No'}
//         </td>
//         <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee', textAlign: 'center' }}>
//           <button 
//             onClick={() => openModal(i.id)}
//             style={{
//               marginLeft: '0.5rem',
//               padding: '0.25rem 0.5rem',
//               borderRadius: '4px',
//               backgroundColor: '#10B981',
//               color: 'white',
//               border: 'none',
//               cursor: 'pointer'
//             }}
//           >Register To</button>
//           {' '}
//           <button
//             onClick={() => handleGenerateQr(i.id)}
//             style={{
//               marginLeft: '0.5rem',
//               padding: '0.25rem 0.5rem',
//               borderRadius: '4px',
//               backgroundColor: '#10B981',
//               color: 'white',
//               border: 'none',
//               cursor: 'pointer'
//             }}
//           >
//             Generate QR
//           </button>
//         </td>
//         <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee', textAlign: 'center' }}>
//           {i.qrCodePath}
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </table>

//       {isModalOpen && (
//         <RegisterModal
//           itemId={selectedItemId}
//           rooms={rooms}
//           onClose={closeModal}
//         />
//       )}
//     </>
//   )
// }

'use client';

import { API_URL, endpoints } from '@/config/apiConfig';
import { downloadItemQrCodeFetcher } from '@/services/itemService';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RegisterModal from './[id]/registerModal.layout';
import { useFilteredItems } from '@/hooks/useItem';

export default function ItemListUI() {
  const router = useRouter();

  // 1️⃣ Filter state
  const [category,    setCategory]    = useState('');
  const [status,      setStatus]      = useState('');
  const [activated,   setActivated]   = useState('');
  const [transaction, setTransaction] = useState('');

  // 2️⃣ Fetch all items once to get dropdown options
  const [allItems, setAllItems] = useState([]);
  useEffect(() => {
    fetch(API_URL + endpoints.getItemsRoute)
      .then(r => r.json())
      .then(setAllItems)
      .catch(console.error);
  }, []);

  const categories   = Array.from(new Set(allItems.map(i => i.itemCategory)));
  const statuses     = Array.from(new Set(allItems.map(i => i.itemStatus)));
  const activations  = ['true','false'];
  const transactions = Array.from(new Set(allItems.map(i => i.transactionStatus)));

  // 3️⃣ Get filtered items from your hook
  const { items, loading, error } = useFilteredItems({
    category,
    status,
    activated,
    transaction
  });

  // 4️⃣ Modal state & QR logic (unchanged)
  const [isModalOpen,   setIsModalOpen]   = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [rooms,         setRooms]         = useState([]);

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
  const handleGenerateQr = async (itemId) => {
    try {
      await downloadItemQrCodeFetcher(itemId);
    } catch (err) {
      console.error('QR download failed', err);
    }
  };

  return (
    <>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        {/* Dropdowns for filtering */}
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value=''>All Categories</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value=''>All Statuses</option>
          {statuses.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select value={activated} onChange={e => setActivated(e.target.value)}>
          <option value=''>All Activated?</option>
          {activations.map(a => (
            <option key={a} value={a}>
              {a === 'true' ? 'Yes' : 'No'}
            </option>
          ))}
        </select>

        <select value={transaction} onChange={e => setTransaction(e.target.value)}>
          <option value=''>All Transactions</option>
          {transactions.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {/* “Create Item” button remains the same */}
        <Link href="/items/new">
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

      {/* Loading / Error states */}
      {loading && <p>Loading…</p>}
      {error   && <p style={{ color: 'red' }}>{error.message}</p>}

      {/* Table of filtered items */}
      {!loading && !error && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={headerStyle}>Name</th>
              <th style={headerStyle}>Category</th>
              <th style={headerStyle}>Status</th>
              <th style={headerStyle}>Transaction</th>
              <th style={headerStyle}>Activated?</th>
              <th style={headerStyle}>Actions</th>
              <th style={headerStyle}>QR Path</th>
            </tr>
          </thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id}>
                <td style={cellStyle}>{i.itemName}</td>
                <td style={cellStyle}>{i.itemCategory}</td>
                <td style={cellStyle}>{i.itemStatus}</td>
                <td style={cellStyle}>{i.transactionStatus}</td>
                <td style={cellStyle}>{i.activateStatus ? 'Yes' : 'No'}</td>
                <td style={cellStyle}>
                  <button onClick={() => openModal(i.id)} style={actionBtnStyle}>
                    Register To
                  </button>
                  {' '}
                  <button onClick={() => handleGenerateQr(i.id)} style={actionBtnStyle}>
                    Generate QR
                  </button>
                </td>
                <td style={cellStyle}>{i.qrCodePath}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <RegisterModal
          itemId={selectedItemId}
          rooms={rooms}
          onClose={closeModal}
        />
      )}
    </>
  );
}

// inline style helpers
const headerStyle = {
  borderBottom: '1px solid #ccc',
  padding: '0.5rem',
  textAlign: 'center'
};
const cellStyle = {
  padding: '0.5rem',
  borderBottom: '1px solid #eee',
  textAlign: 'center'
};
const actionBtnStyle = {
  marginLeft: '0.5rem',
  padding: '0.25rem 0.5rem',
  borderRadius: '4px',
  backgroundColor: '#10B981',
  color: 'white',
  border: 'none',
  cursor: 'pointer'
};
