// 'use client';
// import React from 'react';
// import MasterLayoutUI from '@/components/layoutsUI/masterLayout.ui';
// import useSWR from 'swr';
// import { getItemsFetcher } from '@/services/itemService';
// import ItemListWithModal from '@/components/itemsUI/ItemList.ui';
// import { endpoints } from '@/config/apiConfig';

// export default function ItemsPage() {
//     const { data: items, error } = useSWR(/* 'items', getItemsFetcher */endpoints.getItemsRoute, getItemsFetcher);

//   if (error) return <p>Error loading items.</p>;
//   if (!items) return <p>Loading...</p>;
//   return (
//     <MasterLayoutUI>
//     <div>
//       <h1 className="text-xl font-bold p-4">Items</h1>
//       <ItemListWithModal items={items} />
//     </div>
//     </MasterLayoutUI>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import MasterLayoutUI from '@/app/layout/masterLayout.layout';
import useSWR from 'swr';
import { getItemsFetcher } from '@/services/itemService';
import ItemListUI from '@/app/items/page.layout';
import { useGetItems } from '@/hooks/useItem';

export default function ItemsPage() {
  const { items, error } = useGetItems();

  if (error) return <p>Error loading items.</p>;

  return (
    <MasterLayoutUI>
      <h1>Items</h1>
      <ItemListUI items={items} />
    </MasterLayoutUI>
  );
}