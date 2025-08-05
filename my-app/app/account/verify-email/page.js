'use client';

import { useVerifyEmail } from '@/hooks/useAccount';
import VerifyEmailUI from '@/app/account/verify-email/verifyEmail.layout';

export default function VerifyEmailPage() {
  const { loading, message, retry } = useVerifyEmail();
  return <
    VerifyEmailUI loading={loading} message={message} onRetry={retry} 
  />;
}