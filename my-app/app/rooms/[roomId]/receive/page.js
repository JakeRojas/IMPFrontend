'use client';

import React from 'react';
import MasterLayoutUI from '@/app/layout/masterLayout.layout';
import ReceiveStockroomUI from './receive.layout';

export default function ReceivePage({ params }) {
    const { roomId } = React.use(params);
  return (
    <MasterLayoutUI>
      <ReceiveStockroomUI roomId={roomId} />
    </MasterLayoutUI>
  );
}