'use client';

import React from 'react';
import MasterLayoutUI from '@/components/layoutsUI/masterLayout.ui';
import { useGetUsers } from '@/hooks/useUser';
import UserList from '@/components/usersUI/userList.ui';

export default function UsersPage() {
  const { users, error, reload } = useGetUsers();
  return (
    <MasterLayoutUI>
        <UserList users={users} onReload={reload} loading={!users.length && !error} />;
    </MasterLayoutUI>
  );
}