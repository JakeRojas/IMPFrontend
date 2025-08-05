import { API_URL, endpoints, headers } from '/config/apiConfig';
//import { apiFetcher } from '@/config/apiFetch';

module.exports = {
    createItemFetcher,
    getItemsFetcher,
    getFilteredItemsFetcher,
    getItemByIdFetcher,
    assignItemToRoomFetcher,
    scanItemFetcher,
    updateItemStatusFetcher,
    updateTransactionFetcher,
    downloadItemQrCodeFetcher
}

//main
async function createItemFetcher(data) {
  // const formData = new FormData();
  //   formData.append('itemName',     data.name);
  //   formData.append('itemCategory', data.category);
  //   formData.append('itemQuantity', data.category);
  //   formData.append('qrCodePath', data.category);
  //   formData.append('activateStatus', data.category);
  //   formData.append('itemCategory', data.category);
  //   formData.append('itemCategory', data.category);
  
  const res = await fetch(`${API_URL}${endpoints.createItemRoute}`, {
    method: 'POST',
    headers: headers.json,
    body: JSON.stringify(data),
    // body: formData,
  });
  //console.log(`${API_URL}${endpoints.createItemRoute}`);

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
async function getFilteredItemsFetcher({ category, status, activated, transaction }) {
  const params = new URLSearchParams();
  if (category)    params.append('category', category);
  if (status)      params.append('status',   status);
  if (activated)   params.append('activated', activated);
  if (transaction) params.append('transaction', transaction);

  const url = `${API_URL}${endpoints.getFilteredItemsRoute}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch filtered items');
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
async function scanItemFetcher(itemQrCode) {
  const res = await fetch(`${API_URL}${endpoints.scanItemRoute}`, {
    method: 'POST',
    headers: { ...headers.json },
    body: JSON.stringify({ itemQrCode })
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Scan failed');
  return res.json(); 
}
async function updateItemStatusFetcher(itemId, newStatus) {
  const res = await fetch(
    `${API_URL}${endpoints.updateItemStatusRoute(itemId)}`,
    {
      method: 'PUT',
      headers: { ...headers.json/* , ...headers.auth(token) */ },
      body: JSON.stringify({ itemStatus: newStatus })
    }
  );
  if (!res.ok) throw new Error((await res.json()).message || 'Status update failed');
  return res.json();
}
async function updateTransactionFetcher(itemId, transactionType, token) {
  const res = await fetch(
    `${API_URL}${endpoints.updateTransactionRoute(itemId)}`,
    {
      method: 'PUT',
      headers: { ...headers.json, ...headers.auth(token) },
      body: JSON.stringify({ transactionType })
    }
  );
  if (!res.ok) throw new Error((await res.json()).message || 'Transaction failed');
  return res.json();
}
async function downloadItemQrCodeFetcher(itemId) {
  const res = await fetch(`${API_URL}${endpoints.getItemQRCodeRoute.replace(':id', itemId)}`, { 
    method: 'GET' 
  });
  if (!res.ok) throw new Error('Failed to download QR code');
 
  //turn into blob & download
  const blob = await res.blob();
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `item-${itemId}-qr.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
