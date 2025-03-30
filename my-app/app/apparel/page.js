// export default function ApparelPage() {
//     return (
//       <div>
//         <h1>Apparel</h1>
//         {/* Your apparel logic here */}
//       </div>
//     );
//   }

//import dynamic from 'next/dynamic';

// Import the client component dynamically to avoid issues with server components
//const ApparelList = dynamic(() => import('./ApparelList'), { ssr: false });

'use client';
import ApparelList from './ApparelList';

export default function ApparelPage(req, res) {
  return (
    <div>
      <ApparelList />
    </div>
  );
}
