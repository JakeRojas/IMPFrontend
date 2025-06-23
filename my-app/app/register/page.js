'use client';

import RegisterUI from '@/components/accountsUI/registerUser.ui';
import { useRegister } from '@/hooks/useAccount';

export default function RegisterPage() {
  const { formData, setFormData, errorMsg, success, handleSubmit } = useRegister();
  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <RegisterUI
        formData={formData}
        setFormData={setFormData}
        errorMsg={errorMsg}
        success={success}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}