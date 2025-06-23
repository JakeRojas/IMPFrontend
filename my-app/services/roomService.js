import { API_URL, endpoints, headers } from '/config/apiConfig';

module.exports = {
    createRoomFetcher,
    getRoomsFetcher,
    getRoomByIdFetcher,
    getRoomItemsFetcher,
    updateItemStatusFetcher
}

async function createRoomFetcher(body) {
      const payload = {
        roomName:   body.name,
        roomFloor:  body.floor,
        roomInCharge: body.inCharge,
        };
        const res = await fetch(`${API_URL}${endpoints.createRoomRoute}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Create room failed');
      }
      return res.json();
}
async function getRoomsFetcher() {
    const res = await fetch(`${API_URL}${endpoints.getRoomsRoute}`, {
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
async function getRoomByIdFetcher() {
  const res = await fetch(`${API_URL}${endpoints.getRoomByIdRoute}`, {
      method: 'GET',
      headers: {
        ...headers.json,
        'Accept': 'application/json'
      }
    });
    return res.json(); 
}
async function getRoomItemsFetcher(roomId) {
  const path = API_URL + endpoints.getRegisteredItemsRoute.replace(':roomId', roomId);
  console.log('Fetching registered items from', path);
  const res = await fetch(path, {
    method: 'GET',
    headers: { ...headers.json, Accept: 'application/json' },
  });
  if (!res.ok) throw new Error('Cannot load registered items');
  return res.json();
}
async function updateItemStatusFetcher(roomId, itemQrCode, newStatus) {
  const path = endpoints.updateItemStatusRoute
    .replace(':roomId', roomId)
    .replace(':itemQrCode', encodeURIComponent(itemQrCode));
  const res = await fetch(`${API_URL}/${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newStatus }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}