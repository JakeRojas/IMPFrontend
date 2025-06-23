import './globals.css';
import Script from 'next/script';
import ProtectedRoute from '@/components/roleGuard/protectedRoute';

export const metadata = {
  title: 'My App',
  description: 'Dashboard after login',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Script
          src="https://unpkg.com/instascan@1.0.0/instascan.min.js"
          strategy="beforeInteractive"
      />
        <ProtectedRoute>
          {children}
        </ProtectedRoute>
      </body>
    </html>
  );
}



// import { AuthProvider } from '@/hooks/useAuth';

// export const metadata = {
//   title: 'My App',
//   description: 'Dashboard after login',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         {/* you could also put metadata fields here manually */}
//       </head>
//       <body>
//         {/* load Instascan before your components mount */}
//         <Script
//           src="https://unpkg.com/instascan@1.0.0/instascan.min.js"
//           strategy="beforeInteractive"
//         />
//         {/* {children}
//         <div id="modal-root" /> */}
//         {/* <AuthProvider> */}
//           {children}
//           <div id="modal-root" /> 
//         {/* </AuthProvider> */}
//       </body>
//     </html>
//   );
// }