import { API_URL, endpoints, headers } from '/config/apiConfig';

module.exports = {
    createItemFetcher,
    getItemsFetcher,
    getItemByIdFetcher,
    assignItemToRoomFetcher
}

async function createItemFetcher(data, qrFile) {
  const formData = new FormData();
    formData.append('itemName',     data.name);
    formData.append('itemCategory', data.category);
      if (qrFile) formData.append('itemQrCode', qrFile); 
  
  const res = await fetch(`${API_URL}${endpoints.createItemRoute}`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Create item failed');
  }

  return await res.json();
}
async function getItemsFetcher() {
    const res = await fetch(`${API_URL}${endpoints.getItemsRoute}`, {
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
async function getItemByIdFetcher(id) {
  const res = await fetch(`${API_URL}${endpoints.getItemByIdRoute}`);
  const item = await res.json();
  return item;
}
async function assignItemToRoomFetcher(itemId, roomId) {
  const res = await fetch(`${API_URL}${endpoints.assignItemRoute}`, {
    method: 'POST',
    headers: {...headers.json},
    body: JSON.stringify({ itemId, roomId }),
  });
  if (!res.ok) throw new Error('Assignment failed');
  return res.json();
}