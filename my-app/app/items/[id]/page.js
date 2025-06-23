'use client';
import React from 'react';
import MasterLayoutUI from '@/components/layoutsUI/masterLayout.ui';
import ItemDetails from '@/components/itemsUI/ItemDetails.ui';

export default function DetailPage({ params }) {
  return (
  <MasterLayoutUI>
    <ItemDetails params={params} />;
  </MasterLayoutUI>
  );
}