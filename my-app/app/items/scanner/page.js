'use client';
import { use } from 'react';
import { useScanner } from '@/hooks/useItem';
import { Scanner } from '@/app/items/scanner/scanner.layout';

export default function Page({params}) {
  const { itemQrCode } = use(params);
  const scanner = useScanner(itemQrCode);
  return <Scanner {...scanner} />;
}