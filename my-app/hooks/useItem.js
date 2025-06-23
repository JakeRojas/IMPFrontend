'use client';

import { API_URL, endpoints } from '@/config/apiConfig';
import { useState } from'react';
import useSWR from'swr';
import { useRouter } from 'next/navigation';
import {
  createItemFetcher, 
  getItemsFetcher, 
  getItemByIdFetcher, 
  assignItemToRoomFetcher
} from'@/services/itemService';

module.exports = {
    useGetItems,
    useCreateItem,
    useGetItemById,
    useAssignItem
};

function useGetItems() {
  const { data, error } = useSWR(endpoints.getItemsRoute, getItemsFetcher);
  return { items: data || [], error };
}
function useGetItemById(id) {
  const { data, error } = useSWR( id ? `/${id}` : null, () => getItemByIdFetcher(id) );
  return { room: data, error };
}
function useCreateItem() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const router = useRouter();
  
  const submit = async ({ name, category, file }) => {
    setLoading(true);
    try {
      const newItem = await createItemFetcher({ name, category }, file);
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