// 'use client';

// import MasterLayoutUI from '@/components/layoutsUI/masterLayout.ui';

// export default function MasterLayoutPage() {
//   return <MasterLayoutUI />;
// }


'use client';

import MasterLayoutUI from '@/app/layout/masterLayout.layout';
//import ProtectedRoute from '@/components/roleGuard/protectedRoute';

export default function DashboardLayout({ children }) {
  return  <MasterLayoutUI> {children} </MasterLayoutUI>;
}