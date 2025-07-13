'use client';
import React from 'react';

export function Scanner({
  videoRef,
  ready,
  start,
  scannedCode,
  status,
  updating,
  markStatus,
  error
}) {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <video
        ref={videoRef}
        muted
        autoPlay
        playsInline
        className="w-full h-auto border rounded bg-black"
      />
      {/* Scanning indicator */}
      {ready && !scannedCode && <p className="mt-2">🔍 Scanning for QR codes…</p>}
      {!ready && <p className="mt-2 text-gray-500">Requesting camera access…</p>}
      {error && (
        <div className="mt-2 text-red-600">
          <p>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-1 px-3 py-1 border rounded"
          >
            Retry
          </button>
        </div>
      )}

      {scannedCode && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <p><strong>Scanned QR:</strong> {scannedCode}</p>
          <div className="flex space-x-2 mt-2">
            {['active','damage'].map(s => (
              <button
                key={s}
                onClick={() => markStatus(s)}
                disabled={updating || status === s}
                className={`px-3 py-1 rounded shadow ${
                  status===s ? 'opacity-50' : ''
                } ${s==='active' ? 'bg-green-200' : 'bg-red-200'}`}
              >
                {status === s ? `✓ ${s}` : `Mark ${s}`}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
