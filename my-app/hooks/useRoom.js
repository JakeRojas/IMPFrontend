'use client';

import { API_URL, endpoints } from '@/config/apiConfig';
import { useState, useEffect, useRef } from'react';
import useSWR from'swr';
import { useRouter } from 'next/navigation';
import {
  getRoomsFetcher,
  createRoomFetcher as apiCreateRoom,
  getRoomItemsFetcher,
  getRoomByIdFetcher,
  updateItemStatusFetcher
  } from '@/services/roomService';
import { getUsersFetcher } from '@/services/userService'

module.exports = {
    useGetRooms,
    useCreateRoom,
    useRoomDetails,
    useGetUserOptions,
    useGetRoomItems,
    useUpdateItemStatus,
    useScanner,
};

function useGetRooms() {
  const { data, error } = useSWR(endpoints.getRoomsRoute, getRoomsFetcher);
  return { rooms: data || [], error };
}
function useRoomDetails(id) {
  const { data, error } = useSWR(
    id ? `/room/${id}` : null,
    () => getRoomByIdFetcher(id)
  );
  return { room: data, error };
}
function useGetUserOptions() {
  const { data, error } = useSWR('inCharge', getUsersFetcher);
  return {
    options: data || [],
    loading: !data && !error,
    error,
  };
}
function useCreateRoom() {
  const router = useRouter();
  const [payload, setFormData] = useState({
    roomName: '',
    roomFloor: '',
    roomInCharge: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(API_URL + endpoints.getInChargeOptionsRoute)
      .then(r => r.json())
      .then(setUsers);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await apiCreateRoom(payload);
      router.push('/rooms');
      setSuccess(true);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return { users, payload, setFormData, errorMsg, success, handleSubmit };
}
function useGetRoomItems(roomId) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRoomItemsFetcher(roomId)
      .then(items => {
        console.log('Fetched items:', items);
        setItems(items);
      })
  }, [roomId]);

  return { items, error };
}
function useScanner(roomId) {
  const videoRef   = useRef(null);
  const scannerRef = useRef(null);
  const camerasRef = useRef([]);
  const [ready, setReady]           = useState(false);
  const [scannedCode, setScannedCode] = useState(null);
  const [status, setStatus]         = useState(null);
  const [updating, setUpdating]     = useState(false);

  useEffect(() => {
    const loadInstascan = () => new Promise((resolve, reject) => {
      if (window.Instascan) return resolve(window.Instascan);
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/schmich/instascan-builds@master/instascan.min.js';
      script.onload  = () => window.Instascan ? resolve(window.Instascan) : reject(new Error('Instascan not available'));
      script.onerror = () => reject(new Error(`Failed to load ${script.src}`));
      document.head.appendChild(script);
    });

    loadInstascan()
      .then(Instascan => {
        const { Scanner, Camera } = Instascan;
        scannerRef.current = new Scanner({ video: videoRef.current });
        scannerRef.current.addListener('scan', content => setScannedCode(content));
        return Camera.getCameras();
      })
      .then(cams => {
        camerasRef.current = cams;
        setReady(cams.length > 0);
      })
      .catch(err => console.error('Instascan init error:', err));
  }, []);

  const start = () => {
    const sc = scannerRef.current;
    const cams = camerasRef.current;
    if (sc && cams.length) {
      try { sc.start(cams[0]); }
      catch (e) { if (e.name !== 'FsmError') console.error(e); }
    }
  };

  const markStatus = async (newStatus) => {
    if (!scannedCode) return alert('No QR code scanned yet!');
    setUpdating(true);
    try {
      await updateItemStatusFetcher(roomId, scannedCode, newStatus);
      setStatus(newStatus);
    } catch (e) {
      console.error('Error updating status:', e);
      alert(`Error updating status: ${e.message}`);
    } finally {
      setUpdating(false);
    }
  };

  return { videoRef, ready, start, scannedCode, status, updating, markStatus };
}
function useUpdateItemStatus(roomId) {
  const [error, setError] = useState(null);

  const updateStatus = async (itemQrCode, newStatus) => {
    setError(null);
    const url = `${API_URL}${endpoints.updateItemStatusRoute.replace(':roomId', roomId)}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemQrCode, newStatus })
    });
    if (!res.ok) {
      const { message } = await res.json();
      setError(message || 'Update failed');
      throw new Error(message || 'Update failed');
    }
    return res.json();
  };

  return { updateStatus, error };
}