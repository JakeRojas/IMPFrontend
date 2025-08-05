'use client';

import useSWR from 'swr';
import { getUsersFetcher, getUserByIdFetcher, createUserFetcher } from '@/services/userService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

module.exports = {
  useGetUsers,
  useGetUser,
  useCreateUser
};

function useGetUsers() {
  const { data, error, mutate } = useSWR('/users', getUsersFetcher);
  return { users: data || [], error, reload: mutate };
}
function useGetUser(id) {
  const { data, error } = useSWR(id ? `/users/${id}` : null, () => getUserByIdFetcher(id));
  return { user: data, error };
}
function useCreateUser() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const handleCreate = async (data) => {
    try {
      await createUserFetcher(data);
      router.push('/users');
    } catch (e) {
      setError(e.message || 'Creation failed');
    }
  };

  return { createUserFetcher: handleCreate, error, handleCreate };
}