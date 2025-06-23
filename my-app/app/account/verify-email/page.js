'use client';

import { useVerifyEmail } from '@/hooks/useVerifyEmail';
import VerifyEmailUI from '@/components/accountsUI/verifyEmail.ui';

export default function VerifyEmailPage() {
  const { loading, message, retry } = useVerifyEmail();
  return <
    VerifyEmailUI loading={loading} message={message} onRetry={retry} 
  />;
}