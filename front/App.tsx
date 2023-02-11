import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios  from 'axios';

export default function App() {
  const BASE_URL = 'http://127.0.0.1:3001'

  const init = async () => {
    try {
      await axios.post(`${BASE_URL}/visions/upload`)
        .then((res) => {
          console.log(res)
        })
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => { 1
    init()
  })
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
