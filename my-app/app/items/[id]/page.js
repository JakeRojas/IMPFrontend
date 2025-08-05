'use client';
import React from 'react';
import MasterLayoutUI from '@/app/layout/masterLayout.layout';
import ItemDetails from '@/app/items/[id]/itemDetails.layout';

export default function DetailPage({ params }) {
  return (
  <MasterLayoutUI>
    <ItemDetails params={params} />;
  </MasterLayoutUI>
  );
}