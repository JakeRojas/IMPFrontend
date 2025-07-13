'use client';
import { use } from 'react';
import { useScanner } from '@/hooks/useItem';
import { Scanner } from '@/components/itemsUI/itemScanner.ui';

export default function Page({params}) {
  const { itemQrCode } = use(params);
  const scanner = useScanner(itemQrCode);
  return <Scanner {...scanner} />;
}