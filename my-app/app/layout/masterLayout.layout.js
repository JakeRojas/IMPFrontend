'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DashboardUI from '@/app/dashboard/dashboard.layout';

export default function MasterLayoutUI({ children }) {
  const router = useRouter();

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 200,
          borderRight: '1px solid #e0e0e0',
          padding: '1rem',
          boxSizing: 'border-box',
        }}
      >
        <div style={{
            height: '15vh'
          }}>
          w
        </div>
        <div>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '0.75rem' }}>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <Link href="/rooms">Rooms</Link>
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <Link href="/items">Items</Link>
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <Link href="/users">Users</Link>
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <Link href="/items/scanner">Scan</Link>
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <Link href="/items">Inventory</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  router.push('/account/login');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: '#d00',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
        </div>
      </aside>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          padding: '1.5rem',
          boxSizing: 'border-box',
        }}
      >
        {children || <DashboardUI />}
      </main>
    </div>
  );
}
