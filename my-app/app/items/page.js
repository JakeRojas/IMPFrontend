'use client';
import React from 'react';
import MasterLayoutUI from '@/components/layoutsUI/masterLayout.ui';
import useSWR from 'swr';
import { getItemsFetcher } from '@/services/itemService';
import ItemListWithModal from '@/components/itemsUI/ItemList.ui';

export default function ItemsPage() {
    const { data: items, error } = useSWR('items', getItemsFetcher);

  if (error) return <p>Error loading items.</p>;
  if (!items) return <p>Loading...</p>;
  return (
    <MasterLayoutUI>
    <div>
      <h1 className="text-xl font-bold p-4">Items</h1>
      <ItemListWithModal items={items} />;
    </div>
    </MasterLayoutUI>
  );
}