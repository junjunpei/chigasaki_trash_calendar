import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { SSRProvider } from '@react-aria/ssr';
import { RootStack } from './screens/RootStack';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect, useCallback } from 'react';
import * as Font from 'expo-font';
import Entypo from '@expo/vector-icons/Entypo';
import { LogBox } from 'react-native';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  LogBox.ignoreAllLogs();

  const prepare = async () => {
    try {
      await Font.loadAsync(Entypo.font);
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
    }
  };

  useEffect(() => {
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return (
    <SSRProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <View onLayout={onLayoutRootView} />
          <RootStack />
          <StatusBar style="auto" />
        </NavigationContainer>
      </NativeBaseProvider>
    </SSRProvider>
  );
}
