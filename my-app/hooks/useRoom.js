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