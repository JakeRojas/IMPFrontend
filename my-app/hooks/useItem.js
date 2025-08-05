'use client';

import { API_URL, endpoints } from '@/config/apiConfig';
import { useState, useEffect, useRef, useCallback } from'react';
import useSWR from'swr';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAccount';
import { BrowserMultiFormatReader } from '@zxing/browser';
//import { downloadQRCodeFetcher } from '@/services/itemService';
import {
  createItemFetcher, 
  getItemsFetcher, 
  getItemByIdFetcher, 
  assignItemToRoomFetcher,
  scanItemFetcher,
  updateItemStatusFetcher,
  downloadQRCodeFetcher,
  getFilteredItemsFetcher,
  updateTransactionFetcher
} from'@/services/itemService';

module.exports = {
    useGetItems,
    useFilteredItems,
    useCreateItem,
    useGetItemById,
    useAssignItem,
    useScanner,
    useDownloadQRCode
};

function useGetItems() {
  const { data, error } = useSWR(endpoints.getItemsRoute, getItemsFetcher);
  return { items: data || [], error };
}
function useGetItemById(id) {
  const { data, error } = useSWR( id ? `/${id}` : null, () => getItemByIdFetcher(id) );
  return { room: data, error };
}
//main
function useCreateItem() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const router = useRouter();
  
  const submit = async (data) => {
    setLoading(true);
    try {
      const newItem = await createItemFetcher(data);
      router.push(`/items`);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  
  return { submit, loading, error };
}
function useAssignItem() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleAssign = async (itemId, roomId) => {
    try {
      await assignItemToRoomFetcher(itemId, roomId);
      router.push(`/items/${itemId}`);
    } catch (e) {
      setError(e.message || 'Assign failed');
    }
  };

  return { assignItem: handleAssign, error };
}
function useScanner() {
  const videoRef = useRef(null);
  const codeReader = useRef(null);

  const [ready, setReady]         = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [status, setStatus]       = useState('');
  const [updating, setUpdating]   = useState(false);
  const [error, setError]         = useState('');
  
  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        videoRef.current.srcObject = stream;
        setReady(true);
        codeReader.current.decodeFromVideoDevice(
          null,
          videoRef.current,
          (result, err) => {
            if (result) {
              const text = result.getText();
              setScannedCode(text);
              handleScan(text);
              codeReader.current.reset();
              stream.getTracks().forEach(t => t.stop());
            }
          }
        );
      })
      .catch(err => setError(err.message));

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const handleScan = async qrText => {
    setError('');
    try {
      const { item } = await scanItemFetcher(qrText, localStorage.getItem('token'));
      setStatus(item.itemStatus);
    } catch (e) {
      setError(e.message);
    }
  };

  const markStatus = async newStatus => {
    if (!scannedCode) return;
    setUpdating(true);
    try {
      await updateItemStatusFetcher(item.id, newStatus, localStorage.getItem('token'));
      setStatus(newStatus);
    } catch (e) {
      setError(e.message);
    } finally {
      setUpdating(false);
    }
  };

  return {
    videoRef,
    ready,
    scannedCode,
    status,
    updating,
    markStatus,
    error
  };
}
function useDownloadQRCode() {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const download = useCallback(
    async (itemId) => {
      setLoading(true);
      setError(null);
      try {
        await downloadQRCodeFetcher(itemId);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { download, loading, error };
}
function useFilteredItems(filters) {
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = (filters
          ? await getFilteredItemsFetcher(filters)
          : await getItemsFetcher()
        );
        if (!cancelled) setItems(data);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchItems();
    return () => { cancelled = true; };
  }, [filters.category, filters.status, filters.activated, filters.transaction]);

  return { items, loading, error };
}