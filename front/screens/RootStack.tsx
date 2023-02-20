import { createStackNavigator } from '@react-navigation/stack';
import { ChooseRegion } from '../pages/ChooseRegion';
import { TodayTrash } from '../pages/TodayTrash';
import { RootStackParamList } from './type';

export const RootStack = () => {
  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <RootStack.Navigator>
      <RootStack.Screen name='ChooseRegion' component={ChooseRegion} options={{ title: '地区登録', }} />
      <RootStack.Screen name='TodayTrash' component={TodayTrash} options={{ title: '本日のごみの種類', headerLeft: () => null }} />
      <RootStack.Screen name='UpdateRegion' component={ChooseRegion} options={{ title: '地区変更' }} />
    </RootStack.Navigator>
  )
}