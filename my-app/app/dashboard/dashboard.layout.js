'use client';

import { useRouter } from 'next/navigation';

export default function DashboardUI() {
  const router = useRouter();

  return (
    <div>
      <h1>Welcome to your dashboard!</h1>
    </div>
  );
}