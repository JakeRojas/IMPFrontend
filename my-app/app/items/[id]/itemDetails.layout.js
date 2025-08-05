'use client';

import { use } from 'react';
import { getItemByIdFetcher } from '@/services/itemService';

export default function ItemDetails({ params }) {
  const item = use(getItemByIdFetcher(params.id));
  return (
     item.rooms?.length > 0 && (
      <div>
        <h3>Registered in:</h3>
        <ul>
          {item.rooms.map(r => <li key={r.id}>{r.roomName}</li>)}
        </ul>
      </div>
    )
  );
}
