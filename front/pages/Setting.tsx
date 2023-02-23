import { Box, FlatList, Pressable, Text, HStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../screens/type';
import { StackNavigationProp } from '@react-navigation/stack';

type SettingDataType = {
  title: string;
  navigateName: keyof RootStackParamList;
};

export const Setting = () => {
  const SETTING_DATA: SettingDataType[] = [
    {
      title: '登録地区変更',
      navigateName: 'UpdateRegion' as keyof RootStackParamList,
    },
    // {
    //   title: '通知設定',
    //   navigateName: ''
    // }
  ];

  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Box bgColor='white' height='100%'>
      <FlatList
        data={SETTING_DATA}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(item.navigateName)}>
            {({ isPressed }) => {
              return (
                <Box>
                  <HStack
                    borderBottomWidth={0.5}
                    borderBottomColor='gray.300'
                    justifyContent='space-between'
                    alignItems='center'
                    bgColor={isPressed ? 'gray.200' : 'white'}
                    p={3}
                  >
                    <Text fontSize={16}>{item.title}</Text>
                    <MaterialIcons name='keyboard-arrow-right' size={30} color='gray' />
                  </HStack>
                </Box>
              );
            }}
          </Pressable>
        )}
      />
    </Box>
  );
};
