import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Ionicons } from '@expo/vector-icons'; 
import { BottomTabNavigatorParamList } from '../screens/type';
import { TodayTrash } from '../pages/TodayTrash';
import { TrashCalendar } from '../pages/Calendar';
import { Setting } from '../pages/Setting';

export const BottomTabs = () => {
  const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          const settingIconName = 'settings'

          if (route.name === 'TodayTrash') {
            iconName = 'trash'
          } else if (route.name === 'Calendar') {
            iconName = 'calendar-alt'
          }

          return (
            <>
              {route.name === 'Setting' ? (
                <Ionicons name={settingIconName} size={size} color={color} />
              ) : (
                <FontAwesome5 name={iconName} size={size} color={color} />
              )}
            </>
          );
        },
        tabBarActiveTintColor: 'deepskyblue',
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
      <Tab.Screen
        name='Calendar'
        component={TrashCalendar}
        options={{
          title: 'ごみカレンダー',
        }}
      />
      <Tab.Screen
        name='Setting'
        component={Setting}
        options={{
          title: '各種設定',
        }}
      />
    </Tab.Navigator>
  )
}
