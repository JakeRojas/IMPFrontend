import { API_URL, endpoints, headers } from '/config/apiConfig';

module.exports = {
    receiveApparelFetcher,
    getReceivedApparelFetcher
}

async function receiveApparelFetcher() {
    const res = await fetch(`${API_URL}${endpoints.getReceiveApparelRoute}`, {
        method: 'GET',
        headers: {
          ...headers.json,
          'Accept': 'application/json'
        }
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Get room failed');
      }
      return res.json();
}
async function getReceivedApparelFetcher() {
  const res = await fetch(`${API_URL}${endpoints.getReceivedApparelRoute}`, {
    method: 'GET',
    headers: { ...headers.json, Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`Failed to load received apparel [${res.status}]`);
  return res.json();
}