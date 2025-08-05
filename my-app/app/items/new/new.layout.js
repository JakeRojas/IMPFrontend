//main
'use client';

import { useState } from 'react';
import { createItemFetcher } from '@/services/itemService';

const CATEGORY_OPTIONS = [
  { value: 'it',      label: 'it' },
  { value: 'apparel', label: 'apparel' },
  { value: 'academic', label: 'academic' },
  { value: 'unknown',  label: 'unknown' },
];

export default function ItemCreateForm() {
  const [data, setData]             = useState('');
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');

  // const handleFileChange = e => {
  //   const file = e.target.files?.[0] ?? null;
  //   setQrFile(file);
  // };

  const handleSubmit = async e => {
    e.preventDefault();

    // if (!qrFile) {
    //   setError('Please select a QR code image.');
    //   return;
    // }

    setLoading(true);
    setError('');

    try {
      const newItem = await createItemFetcher( 
        data
      );
      console.log('Created item:', newItem);

      setData('');
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={data}
          maxLength={10}
          onChange={e => setData(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Category</label>
        <select
          value={data}
          onChange={e => setData(e.target.value)}
          required
        >
          <option value="" disabled>
            Select category
          </option>
          {CATEGORY_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* <div>
        <label>QR Code Image</label>
        <input
          type="file"
          name="itemQrCode"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div> */}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Saving…' : 'Create Item'}
      </button>
    </form>
  );
}