'use client';

import React from 'react';
import MasterLayoutUI from '@/components/layoutsUI/masterLayout.ui';
import { useCreateUser } from '@/hooks/useUser';
import UserForm from '@/components/usersUI/userCreate.ui';
 
export default function NewUserPage() {
  const { createUser, error } = useCreateUser();
  return (
    <MasterLayoutUI>
        <UserForm onSubmit={createUser} error={error} />;
    </MasterLayoutUI>
  )
}