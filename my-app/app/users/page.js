'use client';

import React from 'react';
import MasterLayoutUI from '@/app/layout/masterLayout.layout';
import { useGetUsers } from '@/hooks/useUser';
import UserList from '@/app/users/userList.layout';

export default function UsersPage() {
  const { users, error, reload } = useGetUsers();
  return (
    <MasterLayoutUI>
        <UserList users={users} onReload={reload} loading={!users.length && !error} />;
    </MasterLayoutUI>
  );
}