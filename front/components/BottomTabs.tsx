import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { BottomTabNavigatorParamList } from '../screens/type';
import { TodayTrash } from '../pages/TodayTrash';

export const BottomTabs = () => {
  const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'TodayTrash') {
            iconName = 'trash'
          } else if (route.name === 'Calendar') {
            iconName = 'calendar-alt'
          }

          return (
            <FontAwesome5 name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name='TodayTrash'
        component={TodayTrash}
        options={{
          title: '本日のごみの種類',
          headerLeft: () => null
        }}
      />
      {/* <Tab.Screen name='TodayTrash' component={TodayTrash} /> */}
    </Tab.Navigator>
  )
}
