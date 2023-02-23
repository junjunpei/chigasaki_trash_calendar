import { createStackNavigator } from '@react-navigation/stack';
import { ChooseRegion } from '../pages/ChooseRegion';
import { RootStackParamList } from './type';
import { BottomTabs } from '../components/BottomTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { UpdateRegion } from '../pages/UpdateRegion';

export const RootStack = () => {
  const RootStack = createStackNavigator<RootStackParamList>();
  const [isRegistered, setIsRegistered] = useState<boolean>(false)

  useFocusEffect(() => {
    fetchRegion();
  })

  const fetchRegion = async () => {
    const region = await AsyncStorage.getItem('region')
    if (region !== null) setIsRegistered(true);
  }

  return (
    <RootStack.Navigator initialRouteName={isRegistered ? 'BottomTabs' : 'ChooseRegion'} screenOptions={{ gestureEnabled: false, animationEnabled: false }}>
      <RootStack.Group>
      </RootStack.Group>
      <RootStack.Group screenOptions={{ headerShown: false }}>
        <RootStack.Screen name='BottomTabs' component={BottomTabs} />
      </RootStack.Group>
      <RootStack.Group>
        <RootStack.Screen name='ChooseRegion' component={ChooseRegion} options={{ title: '地区登録', headerLeft: () => null }} />
        <RootStack.Screen name='UpdateRegion' component={UpdateRegion} options={{ title: '登録地区変更', headerBackTitle: '戻る' }} />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}