import './globals.css';
import Script from 'next/script';
//import ProtectedRoute from '@/components/roleGuard/protectedRoute';

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
        {/* <ProtectedRoute> */}
          {children}
        {/* </ProtectedRoute> */}
      </body>
    </html>
  );
}