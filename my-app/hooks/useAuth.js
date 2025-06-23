// 'use client';
// import { createContext, useContext, useState, useEffect } from 'react';
// //import jwtDecode from 'jwt-decode';
// import { useRouter } from 'next/navigation';
// import accountService from '@/services/accountService';
// const jwtDecode = require('jwt-decode').default;

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const router = useRouter(); 
//   const [user, setUser] = useState(null);
//   const [ready, setReady] = useState(false);

//   // useEffect(() => {
//   //   const token = localStorage.getItem('token');
//   //   if (token) {
//   //     try {
//   //       const { sub: id, role, exp } = jwtDecode(token);
//   //       if (Date.now() >= exp * 1000) throw new Error('Token expired');
//   //       setUser({ id, role, token });
//   //     } catch {
//   //       localStorage.removeItem('token');
//   //       router.push('/login');
//   //     }
//   //   }
//   //   setReady(true);
//   // }, []);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const { sub: id, role } = jwtDecode(token);
//         if (Date.now() >= exp * 1000) throw new Error('Token expired');
//         setUser({ id, role, token });
//       } catch {
//         localStorage.removeItem('token');
//         router.push('/login');
//       }
//     }
//     setReady(true);
//   }, [router]);

//   // const login = ({ jwtToken }) => {
//   //   localStorage.setItem('token', jwtToken);
//   //   document.cookie = `token=${jwtToken}; Path=/; Secure;`;
//   //   const { sub: id, role } = jwtDecode(jwtToken);
//   //   setUser({ id, role, token: jwtToken });
//   //   router.push('/layout');
//   // };

//   const login = async ({ email, password }) => {
//     // call your auth service (adjust to your API)
//     const jwtToken = await accountService.loginFetcher({ email, password });
//     console.log('Received JWT:', jwtToken);
//     localStorage.setItem('token', jwtToken);

//     // decode _after_ storing
//     //const { sub: id, role } = jwtDecode(jwtToken);
//     //setUser({ id, role, token: jwtToken });

//     // navigate into your app
//     router.push('/layout');   // or '/' or '/home' depending on your route
//   };

// //   const logout = () => {
// //     localStorage.removeItem('token');
// //     setUser(null);
// //     router.push('/login');
// //   };
// const logout = () => {
//     localStorage.removeItem('token');
//     //document.cookie = 'token=; Path=/; Max-Age=0';
//     setUser(null);
//     router.push('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, ready, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);
