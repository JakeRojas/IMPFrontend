'use client';

import React from 'react';
import Link from 'next/link';

export default function UserList({ users, onReload, loading }) {
  if (loading) return <p>Loading...</p>;
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Users</h1>
      <Link href="/users/new">
        <button className="mb-4 px-4 py-2 rounded shadow bg-blue-500 text-white">Create User</button>
      </Link>
      <ul>
        {users.map(u => (
          <li key={u.id} className="flex justify-between items-center mb-2">
            <span>{u.firstName} {u.lastName}</span>
            {/* <Link href={`/users/${u.id}`}>
              <button className="px-2 py-1 rounded shadow bg-gray-200">Details</button>
            </Link> */}
          </li>
        ))}
      </ul>
      <button onClick={onReload} className="mt-4 text-sm text-blue-600">Refresh</button>
    </div>
  );
}