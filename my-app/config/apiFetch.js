// // lib/api.js

// import { API_URL } from '@/config/apiConfig';

// export async function apiFetcher(
//   endpoint,
//   {
//     method  = 'GET',
//     headers = {},
//     body    = null,
//     params  = null,       // optional: { foo: 'bar' } → ?foo=bar
//   } = {}
// ) {
//   // 1) Build URL with query params
//   let url = `${API_URL}${endpoint}`;
//   if (params) {
//     const qs = new URLSearchParams(params).toString();
//     url += `?${qs}`;
//   }

//   // 2) Read and log the token
//   const token = localStorage.getItem('token');
//   console.log('[apiFetcher] token:', token);

//   // 3) Merge headers
//   const allHeaders = {
//     ...headers,
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   };

//   // 4) Fire fetch
//   const res = await fetch(url, {
//     method,
//     headers: allHeaders,
//     body,
//   });

//   // 5) Auto‑logout on 401
//   if (res.status === 401) {
//     console.warn('[apiFetcher] 401 Unauthorized — logging out');
//     localStorage.removeItem('token');
//     window.location.href = '/login';
//     return;
//   }

//   // 6) Parse JSON + throw on error
//   const data = await res.json();
//   if (!res.ok) {
//     console.error('[apiFetcher] API Error', data);
//     throw new Error(data.message || `HTTP ${res.status}`);
//   }
//   return data;
// }
