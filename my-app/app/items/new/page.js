'use client';
import React from 'react';
import MasterLayoutUI from '@/app/layout/masterLayout.layout';
import { useCreateItem } from '@/hooks/useItem';
import ItemCreateForm from '@/app/items/new/new.layout';

export default function NewItemPage() {
const { formData, setFormData, errorMsg, success, handleSubmit } = useCreateItem();
  return (
    <MasterLayoutUI> 
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <ItemCreateForm
        formData={formData}
        setFormData={setFormData}
        errorMsg={errorMsg}
        success={success}
        handleSubmit={handleSubmit}
      />
    </div> 
    </MasterLayoutUI>
  );
}
