'use client';
import React from 'react';
import { useDownloadQrCode } from '@/hooks/useItem';

export default function QRCodeButton({ itemId }) {
  const { download, loading, error } = useDownloadQrCode();

  return (
    <button
      onClick={() => download(itemId)}
      disabled={loading}
      className="px-2 py-1 bg-green-600 text-white rounded disabled:opacity-50"
    >
      {loading ? 'Downloading…' : 'Download QR'}
      {error && <span className="ml-2 text-red-400">Error</span>}
    </button>
  );
}