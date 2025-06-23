'use client';

import { useLogin } from '@/hooks/useAccount';
import LoginUI from '@/components/accountsUI/login.ui';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const { formData, setFormData, errorMsg, loading, handleSubmit } = useLogin();

  return (
    <LoginUI
      formData={formData}
      setFormData={setFormData}
      errorMsg={errorMsg}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
}
