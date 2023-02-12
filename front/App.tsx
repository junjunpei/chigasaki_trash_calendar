import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native';
import { SSRProvider } from '@react-aria/ssr';

export default function App() {
  return (
    <SSRProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style="auto" />
          </View>
        </NavigationContainer>
      </NativeBaseProvider>
    </SSRProvider>
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
