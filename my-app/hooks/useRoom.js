'use client';

import { API_URL, endpoints } from '@/config/apiConfig';
import { useState, useEffect, useRef } from'react';
import useSWR from'swr';
import { useRouter } from 'next/navigation';
import {
  getRoomsFetcher,
  getFilteredRoomsFetcher,
  createRoomFetcher,
  getRoomItemsFetcher,
  getRoomByIdFetcher,
  receiveInStockroomFetcher,
  roomEnumOptionsFetcher,
  getReceivedItemsFetcher
  } from '@/services/roomService';
import { getUsersFetcher } from '@/services/userService'

module.exports = {
    useGetRooms,
    useCreateRoom,
    useRoomDetails,
    useGetUserOptions,
    useGetRoomItems,
    useUpdateItemStatus,
    useFilteredRooms,
    useReceiveStockroom,
    useReceivedItems
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
  const { data, error } = useSWR(endpoints.getInChargeOptionsRoute, getUsersFetcher);
  return {
    options: data || [],
    loading: !data && !error,
    error,
  };
}
function useCreateRoom() {
  const [payload, setFormData] = useState({
    roomName:     '',
    roomFloor:    '',
    roomType:     '',
    stockroomType:'',
    roomInCharge: ''
  });
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);
  
    const handleSubmit = async e => {
      e.preventDefault();
      setErrorMsg('');
      setSuccess(false);
  
  // remap our internal names -> Joi schema names
  const body = {
    roomName:     payload.roomName,
    roomFloor:    payload.roomFloor,
    roomType:     payload.roomType,
    // only include stockroomType if it’s relevant
    ...(payload.roomType === 'stockroom' && {
    stockroomType: payload.stockroomType,
    }),
    roomInCharge: payload.roomInCharge
  };
  
      try {
        await createRoomFetcher(body);
        setSuccess(true);
      } catch (err) {
        setErrorMsg(err.message);
      }
    };
  
    return {
      payload,
      setFormData,
      handleSubmit,
      errorMsg,
      success
    };
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
function useFilteredRooms(filters) {
  const [rooms,   setRooms]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchRooms = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = (filters
          ? await getFilteredRoomsFetcher(filters)
          : await getRoomsFetcher()
        );
        if (!cancelled) setRooms(data);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchRooms();
    return () => { cancelled = true; };
  }, [filters.type]);

  return { rooms, loading, error };
}
function useReceiveStockroom(roomId) {
  const router = useRouter();
  const [room, setRoom]             = useState(null);
  const [enumOptions, setEnumOptions] = useState({});
  const [form, setForm]             = useState({});
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getRoomByIdFetcher(roomId),
      roomEnumOptionsFetcher(roomId),
    ])
      .then(([r, opts]) => {
        console.log('✅ loaded room:', r);
        console.log('✅ loaded enumOptions:', opts);
        setRoom(r);
        setEnumOptions(opts);
      })
      .catch(err => {
        console.error('⚠️ error loading receive data:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [roomId]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await receiveInStockroomFetcher(roomId, form);
      router.push(`/rooms`);
    } catch (err) {
      setError(err.message);
    }
  }

  return { room, enumOptions, form, error, loading, onChange, onSubmit };
}
function useReceivedItems(roomId) {
  const { data, error } = useSWR(
    () => (roomId ? ['receivedItems', roomId] : null),
    () => getReceivedItemsFetcher(roomId)
  );

  return {
    items:     data?.items || [],
    isLoading: !error && !data,
    isError:   !!error,
    error,
  };
}