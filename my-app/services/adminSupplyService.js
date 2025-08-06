import { API_URL, endpoints, headers } from '/config/apiConfig';

module.exports = {
  getReceivedSupplyFetcher
}

async function getReceivedSupplyFetcher() {
  const res = await fetch(`${API_URL}${endpoints.getReceivedSuppliesRoute}`, {
    headers: { ...headers.json, Accept: 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to load supply batches');
  return res.json();
}