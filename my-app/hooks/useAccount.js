'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loginFetcher, registerFetcher }  from '@/services/accountService';
import {jwtDecode} from 'jwt-decode';

export function useAuth(/* { children } */) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // Run once on mount, load token & decode
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { sub: id, role, exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) throw new Error('Token expired');
        setUser({ id, role, token });
      } catch {
        localStorage.removeItem('token');
      }
    }
    setReady(true);
  }, []);

  const login = ({ jwtToken }) => {
    localStorage.setItem('token', jwtToken);
    const { sub: id, role } = jwtDecode(jwtToken);
    setUser({ id, role, token: jwtToken });
    router.push('/layout');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return { user, ready, login, logout };
}
export function useLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg]   = useState('');
  const [loading, setLoading]     = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('⚡ handleSubmit called with:', formData);
    setErrorMsg('');
    setLoading(true);

    try {
      // 1) Send credentials, get back raw JWT
      const jwtToken = await loginFetcher({
        email: formData.email,
        password: formData.password,
      });
      console.log('✅ Received token:', jwtToken);

      // 2) Persist token
      localStorage.setItem('token', jwtToken);

      // 3) Navigate into the app
      router.push('/layout');   // or your home/dashboard route
    } catch (err) {
      console.error('❌ loginFetcher error:', err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    errorMsg,
    loading,
    handleSubmit,
  };
}
export function useRegister() {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await registerFetcher(formData);
      setSuccess(true);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return { formData, setFormData, errorMsg, success, handleSubmit };
}
export function useVerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [message, setMessage] = useState('Verifying your email…');
  const [loading, setLoading] = useState(true);

  const retry = useCallback(() => {
    router.reload();
  }, [router]);

  useEffect(() => {
    if (!token) {
      setMessage('No verification token provided.');
      setLoading(false);
      return;
    }

    verifyEmailFetcher(token)
      .then(() => {
        setMessage('✅ Your email has been successfully verified!');
        setTimeout(() => router.push('/login'), 3000);
      })
      .catch(err => {
        setMessage(`❌ ${err.message}`);
      })
      .finally(() => setLoading(false));
  }, [token, router]);

  return { loading, message, retry };
}