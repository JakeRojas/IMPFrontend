import { API_URL, endpoints, headers } from '/config/apiConfig';

module.exports = {
    createRoomFetcher,
    getRoomsFetcher,
    getFilteredRoomsFetcher,
    getRoomByIdFetcher,
    getRoomItemsFetcher,
    getUserOptions,
    receiveInStockroomFetcher,
    roomEnumOptionsFetcher
}

async function createRoomFetcher(body) {
      const payload = {
        roomName:   body.roomName,
        roomFloor:  body.roomFloor,
        roomType:  body.roomType,
        stockroomType:  body.stockroomType,
        roomInCharge: body.roomInCharge,
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
async function getFilteredRoomsFetcher({ type }) {
  const params = new URLSearchParams();
  if (type)    params.append('type', type);

  const url = `${API_URL}${endpoints.getFilteredRoomsRoute}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch filtered items');
  return res.json();
}
// async function getRoomByIdFetcher() {
//   const res = await fetch(`${API_URL}${endpoints.getRoomByIdRoute}`, {
//       method: 'GET',
//       headers: {
//         ...headers.json,
//         'Accept': 'application/json'
//       }
//     });
//     return res.json(); 
// }
async function getRoomByIdFetcher(roomId) {
  const res = await fetch(
    `${API_URL}${endpoints.getRoomByIdRoute.replace(':id', roomId)}`
  );
  if (!res.ok) throw new Error('Failed to load room');
  const payload = await res.json();

  // 1) If your API returns { data: { … } } or { room: { … } }, unwrap it:
  const room =
    payload.data ? payload.data :
    payload.room ? payload.room :
    payload;

  console.log('🛠️ [getRoomByIdFetcher] unwrapped room:', room);
  return room;
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
async function getUserOptions() {
  const res = await fetch(API_URL + endpoints.getInChargeOptions);
  if (!res.ok) throw new Error('Cannot load user options');
  return res.json(); 
}
async function receiveInStockroomFetcher(roomId, formData) {
  const res = await fetch(
    `${API_URL}${endpoints.receiveInStockroomRoute.replace(':roomId', roomId)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Receive failed: ${text}`);
  }
  return res.json();
}
async function roomEnumOptionsFetcher(roomId) {
  const res = await fetch(
    `${API_URL}${endpoints.getRoomEnumOptionsRoute.replace(':roomId', roomId)}`
  );
  if (!res.ok) throw new Error('Failed to load enum options');
  const { options } = await res.json();
  return options;
}