'use client';
import React from 'react';

export function Scanner({ videoRef, ready, start, scannedCode, status, updating, markStatus }) {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <video ref={videoRef} muted autoPlay playsInline className="w-full h-auto border rounded bg-black" />
      <button onClick={start} disabled={!ready} className="mt-2 px-4 py-2 rounded shadow bg-blue-600 text-white disabled:opacity-50">
        {ready ? 'Start Scanning' : 'No Camera Found'}
      </button>

      {scannedCode && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <p><strong>Scanned QR:</strong> {scannedCode}</p>
          <div className="flex space-x-2 mt-2">
            {['active', 'damage'].map(s => (
              <button
                key={s}
                onClick={() => markStatus(s)}
                disabled={updating || status === s}
                className={`px-3 py-1 rounded ${status===s ? 'opacity-50' : 'shadow'} ${s==='active' ? 'bg-green-200' : 'bg-red-200'}`}
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