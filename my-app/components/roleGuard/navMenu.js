// 'use client';
// import Link from 'next/link';
// import { useAuth } from '@/hooks/useAccount';

// export function NavMenu() {
//   const { user } = useAuth();

//   const menu = [
//     { href: '/dashboard', label: 'Dashboard', roles: ['user', 'admin', 'superAdmin'] },
//     { href: '/users', label: 'User Mgmt', roles: ['admin', 'superAdmin'] },
//     { href: '/rooms', label: 'Room Mgmt', roles: ['superAdmin'] },
//   ];

//   return (
//     <nav>
//       <ul className="flex space-x-4">
//         {menu
//           .filter(item => user && item.roles.includes(user.role))
//           .map(item => (
//             <li key={item.href}>
//               <Link href={item.href}>{item.label}</Link>
//             </li>
//           ))}
//       </ul>
//     </nav>
//   );
// }
