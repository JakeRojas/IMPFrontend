// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const API_URL = 'http://10.0.0.254:5000';

// export async function scanItem(qrCode) {
//     const token = await AsyncStorage.getItem('token');
//     const res = await axios.post(
//       `${API_URL}/api/scan`,
//       { qrCode },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     return res.data;
//   }
  
//   export async function markLost(roomId, scannedIds) {
//     const token = await AsyncStorage.getItem('token');
//     const res = await axios.post(
//       `${API_URL}/api/markLost`,
//       { roomId, scannedIds },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     return res.data;
//   }

// services/scanService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.11:5000';

async function request(path, body) {
  const token = await AsyncStorage.getItem('token');
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Network error');
  }
  return res.json();
}

export function scanItem(qrCode) {
  return request('/api/scan', { qrCode });
}

export function markLost(roomId, scannedIds) {
  return request('/api/markLost', { roomId, scannedIds });
}
