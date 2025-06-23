'use client';

import { useState } from 'react';
import { createItemFetcher } from '@/services/itemService';

const CATEGORY_OPTIONS = [
  { value: 'it',      label: 'IT' },
  { value: 'apparel', label: 'Apparel' },
  { value: 'academic', label: 'Academic' },
  { value: 'unknown',  label: 'Unknown' },
];

export default function ItemCreateForm() {
  const [name, setName]             = useState('');
  const [category, setCategory]     = useState('');
  const [qrFile, setQrFile]         = useState(null);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');

  const handleFileChange = e => {
    const file = e.target.files?.[0] ?? null;
    setQrFile(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!qrFile) {
      setError('Please select a QR code image.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const newItem = await createItemFetcher(
        { name, category },
        qrFile
      );
      console.log('Created item:', newItem);

      setName('');
      setCategory('');
      setQrFile(null);
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
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Category</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
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

      <div>
        <label>QR Code Image</label>
        <input
          type="file"
          name="itemQrCode"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Saving…' : 'Create Item'}
      </button>
    </form>
  );
}
