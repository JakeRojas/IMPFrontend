import { API_URL, endpoints, headers } from '@/config/apiConfig';

module.exports = {
  getUsersFetcher,
  getUserByIdFetcher,
  createUserFetcher
}

async function getUsersFetcher() {
  const res = await fetch(`${API_URL}${endpoints.getUsersRoute}`);
  if (!res.ok) throw new Error('Failed to load users');
  return res.json();
}
async function getUserByIdFetcher(id) {
  const res = await fetch(`${API_URL}${endpoints.getUserByIdRoute}`);
  if (!res.ok) throw new Error('Failed to load user');
  return res.json();
}
async function createUserFetcher(data) {
  const res = await fetch(`${API_URL}${endpoints.createUsersRoute}`, {
    method: 'POST',
    headers: headers.json,
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Creation failed');
  return result;
}