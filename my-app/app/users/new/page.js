'use client';

import React from 'react';
import MasterLayoutUI from '@/app/layout/masterLayout.layout';
import { useCreateUser } from '@/hooks/useUser';
import UserForm from '@/app/users/new/userCreate.layout';
 
export default function NewUserPage() {
  const { createUser, error } = useCreateUser();
  return (
    <MasterLayoutUI>
        <UserForm onSubmit={createUser} error={error} />;
    </MasterLayoutUI>
  )
}