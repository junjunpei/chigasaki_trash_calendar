import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native';
import { SSRProvider } from '@react-aria/ssr';
import { RootStack } from './screens/RootStack'

export default function App() {
  return (
    <SSRProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <View />
          <RootStack />
          <StatusBar style="auto" />
        </NavigationContainer>
      </NativeBaseProvider>
    </SSRProvider>
  );
}

