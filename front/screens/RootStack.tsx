import { createStackNavigator } from '@react-navigation/stack';
import { ChooseRegion } from '../pages/ChooseRegion';

export const RootStack = () => {
  const RootStack = createStackNavigator();

  return (
    <RootStack.Navigator>
      <RootStack.Screen name='ChooseRegion' component={ChooseRegion} options={{ title: '地区登録', }} />
    </RootStack.Navigator>
  )
}