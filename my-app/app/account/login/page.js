//main code
'use client';

import { useLogin } from '@/hooks/useAccount';
import LoginUI from '@/app/account/login/login.layout';
//import { useAuth } from '@/hooks/useAuth';

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




// 'use client';
// import { useState }      from 'react';
// //import { authenticate }     from '@/services/accountService';
// import { useLogin } from '@/hooks/useAccount';

// export default function LoginPage() {
//   const [email, setEmail]       = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError]       = useState('');

//   const onSubmit = async e => {
//     e.preventDefault();
//     try {
//       const token = await useLogin({ email, password });
//       localStorage.setItem('token', token);
//       // TODO: redirect to dashboard
//     } catch (e) {
//       setError(e.message);
//     }
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <input
//         type="email"
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       <button type="submit">Login</button>
//       {error && <p className="error">{error}</p>}
//     </form>
//   );
// }