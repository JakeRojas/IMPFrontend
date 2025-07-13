import { useState } from 'react';
import * as scanService from '../services/scanService';
import { Alert } from 'react-native';

export default function useQrScanner() {
  const [scannedIds, setScannedIds] = useState([]);

  function handleScan(qrCode) {
    scanService.scanItem(qrCode)
      .then(result => {
        Alert.alert('Scanned', `Item ${result.item.name} is active`);
        setScannedIds(prev => Array.from(new Set([...prev, result.item.id])));
      })
      .catch(err => Alert.alert('Error', err.message));
  }

  function markUnscannedAsLost(roomId) {
    scanService.markLost(roomId, scannedIds)
      .then(() => Alert.alert('Success', 'Unscanned items marked lost'))
      .catch(err => Alert.alert('Error', err.message));
  }

  return { scannedIds, handleScan, markUnscannedAsLost };
}
