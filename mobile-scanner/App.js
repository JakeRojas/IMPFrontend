// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });




import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import QrScanner from './components/QrScanner';
import useQrScanner from './hooks/useQrScanner';

export default function App() {
  const { scannedIds, handleScan, markUnscannedAsLost } = useQrScanner();
  const [roomId, setRoomId] = useState('');

  return (
    <View style={styles.screen}>
      <QrScanner onScan={handleScan} />
      <TextInput
        placeholder="Room ID"
        value={roomId}
        onChangeText={setRoomId}
        style={styles.input}
      />
      <Button
        title="Mark Unscanned as Lost"
        onPress={() => markUnscannedAsLost(roomId)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1, borderColor: '#ccc',
    padding: 8, marginVertical: 12,
  },
});

// import React from 'react';
// import { View, Text } from 'react-native';

// export default function App() {
//   return (
//     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//       <Text>↗️  Open Expo Go on your phone and scan the QR below</Text>
//     </View>
//   );
// }