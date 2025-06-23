'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAccount';

export function withRole(Component, allowedRoles = []) {
  return function Guarded(props) {
    const { user, ready } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (ready && (!user || !allowedRoles.includes(user.role))) {
        router.replace('/unauthorized');
      }
    }, [ready, user]);

    if (!ready || !user || !allowedRoles.includes(user.role)) return null;
    return <Component {...props} />;
  };
}
