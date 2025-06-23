'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * ProtectedRoute component guards its children by checking for a JWT token in localStorage.
 * If no token is found, it redirects to the /login page.
 */
export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark that we're running on the client
    setIsClient(true);

    // Perform the auth check
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if not authenticated
      router.replace('/login');
    }
  }, [router]);

  // Avoid rendering children on server to prevent content flash
  if (!isClient) {
    return null;
  }

  return <>{children}</>;
}