'use client';
import { use } from 'react';
import { useScanner } from '@/hooks/useRoom';
import { Scanner } from '@/components/roomsUI/roomScanner.ui';

export default function Page({ params }) {
  const { roomId } = use(params);
  const scanner = useScanner(roomId);
  return <Scanner {...scanner} />;
}