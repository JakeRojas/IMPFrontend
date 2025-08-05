import { API_URL, endpoints, headers } from '/config/apiConfig';

// export async function loginFetcher({ email, password }) {
//   const res = await fetch(`${API_URL}${endpoints.loginRoute}`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password }),
//   });
//   if (!res.ok) throw new Error('Login failed');
//   const { token } = await res.json();
//   return token;
// }
// export async function registerFetcher(userData) {
//   const res = await fetch(`${API_URL}${endpoints.registerRoute}`, {
//     method: 'POST',
//     headers: {
//       ...headers.json,
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify(userData),
//   });
//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(error.message || 'Registration failed');
//   }
//   return res.json();
// }
// export async function verifyEmailFetcher(token) {
//   const res = await fetch(`${API_URL}${endpoints.verifyEmailRoute}`, {
//     method: 'POST',
//     headers: {
//       ...headers.json,
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify({ token })
//   });
//   if (!res.ok) {
//     const err = await res.json();
//     throw new Error(err.message || 'Verification failed');
//   }
//   return res.json();
// }

export async function authenticateFetcher({ email, password }) {
  const res = await fetch(`${API_URL}${endpoints.loginRoute}`, {
    method:  'POST',
    headers: headers.json,
    body:    JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login failed');
  const { token } = await res.json();
  return token;
}
export async function registerFetcher(userData) {
  const res = await fetch(`${API_URL}${endpoints.registerRoute}`, {
    method:  'POST',
    headers: headers.json,
    body:    JSON.stringify(userData)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Registration failed');
  }
  return res.json();
}
export async function refreshToken({ token }) {
  const res = await fetch(`${API_URL}${endpoints.refreshTokenRoute}`, {
    method:  'POST',
    headers: headers.json,
    body:    JSON.stringify({ token })
  });
  if (!res.ok) throw new Error('Refresh failed');
  return res.json();
}
export async function verifyEmail({ token }) {
  const res = await fetch(`${API_URL}${endpoints.verifyEmailRoute}`, {
    method:  'POST',
    headers: headers.json,
    body:    JSON.stringify({ token })
  });
  if (!res.ok) throw new Error('Email verification failed');
  return res.json();
}