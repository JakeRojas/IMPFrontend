import { API_URL, endpoints, headers } from '/config/apiConfig';

// module.exports = {
//   //loginFetcher,
//   registerFetcher,
//   verifyEmailFetcher
// }

// export async function loginFetcher({email, password}) {
//   console.log('About to POST', { email, password });
//   const res = await fetch(`${API_URL}${endpoints.loginRoute}`, {
//     method: 'POST',
//     headers: {
//       ...headers.json,
//       'Accept': 'application/json'
//     },
//     credentials: 'include',
//     body: JSON.stringify({ email, password }),
//   });

//   if (!res.ok) throw new Error((await res.json()).message);
//   return;

//   //const data = await res.json();

//   // if (!res.ok) {
//   //   const error = await res.json();
//   //   throw new Error(error.message || 'Login failed');
//   // }
//   // return res.json();
//   //return data.jwtToken;
// }
export async function loginFetcher({ email, password }) {
  const res = await fetch(`${API_URL}${endpoints.loginRoute}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  const { token } = await res.json();
  return token;
}
// export async function loginFetcher({ email, password }) {
//   // 1. Sanity check
//   console.log('[loginFetcher] credentials:', { email, password });
//   if (!email || !password) {
//     throw new Error('Client: email and password are required');
//   }

//   // 2. POST to your auth endpoint
//   const url = `${API_URL}${endpoints.loginRoute}`; 
//   console.log('[loginFetcher] POST ->', url);
//   const res = await fetch(url, {
//     method: 'POST',
//     headers: { 
//       'Content-Type': 'application/json', 
//     },
//     body: JSON.stringify({ email, password }), 
//   });

//   // 3. Inspect raw response
//   const data = await res.json();
//   console.log('[loginFetcher] response:', res.status, data);

//   // 4. If backend rejects, bubble up its message
//   if (!res.ok) {
//     throw new Error(data.message || 'Login failed');
//   }

//   // 5. Return exactly the token string
//   //    (assuming your API does: res.json({ jwtToken: '...' }))
//   if (!data.jwtToken) {
//     throw new Error('LoginFetcher: no jwtToken in response');
//   }
//   return data.jwtToken;
// }
export async function registerFetcher(userData) {
  const res = await fetch(`${API_URL}${endpoints.registerRoute}`, {
    method: 'POST',
    headers: {
      ...headers.json,
      'Accept': 'application/json'
    },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Registration failed');
  }
  return res.json();
}
export async function verifyEmailFetcher(token) {
  const res = await fetch(`${API_URL}${endpoints.verifyEmailRoute}`, {
    method: 'POST',
    headers: {
      ...headers.json,
      'Accept': 'application/json'
    },
    body: JSON.stringify({ token })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Verification failed');
  }
  return res.json();
}
