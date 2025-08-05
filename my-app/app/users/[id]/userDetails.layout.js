'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function UserDetail({ user }) {
  const router = useRouter();
  if (!user) return <p>Loading...</p>;
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Details</h1>
      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phoneNumber}</p>
      <button onClick={() => router.push('/users')} className="mt-4 px-4 py-2 rounded shadow bg-gray-200">Back to List</button>
    </div>
  ); 
}