// 'use client';
// import React from 'react';
// import MasterLayoutUI from '@/app/layout/masterLayout.layout';
// import DashboardUI from '@/app/dashboard/dashboard.layout';

// export default function DashboardPage() {
//   return (
//     <MasterLayoutUI> 
//       <DashboardUI /> 
//     </MasterLayoutUI>
//   );
// }

import MasterLayoutUI from '@/app/layout/masterLayout.layout';
import DashboardUI from '@/app/dashboard/dashboard.layout';

export default async function DashboardPage() {
  // ↓ Example: fetch dashboard stats on the server
  // const stats = await fetch(`${API_URL}${endpoints.getDashboardStats}`, {
  //   cache: 'no-store'
  // }).then(res => {
  //   if (!res.ok) throw new Error('Failed to load stats');
  //   return res.json();
  // });

  return (
    <MasterLayoutUI>
      {/* If you fetched data, pass it down:
          <DashboardUI stats={stats} /> 
      */}
      <DashboardUI />
    </MasterLayoutUI>
  );
}