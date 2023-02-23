import { Box, Center, Button, Heading } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TrashRepository } from '../domain/repository/TrashRepository';
import { Trash } from '../domain/entity/Trash';
import { useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../screens/type';
import AppLoading from 'expo-app-loading';
import { EnumToText } from '../utils/EnumToText';
import { TrashName } from '../domain/entity/Trash';

export const TodayTrash = () => {
  const { setValue, watch } = useForm<Trash>();
  const [trashes, setTrashes] = useState<Trash[]>();
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const fetchRegion = async () => {
    try {
      const repository = new TrashRepository();
      const trashData = await repository.getTrashDates(watch());
      setTrashes(trashData);
    } catch (e) {
      console.log(e);
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('region');
      navigate('ChooseRegion');
    } catch (e) {
      console.warn(e);
    }
  };

  const init = async () => {
    const region = await AsyncStorage.getItem('region');
    setValue('regionId', Number(region));
    fetchRegion();
  };

  useFocusEffect(
    useCallback(() => {
      init();
    }, []),
  );

  const year = new Date().getFullYear();
  const month = Number(new Date().getMonth()) + 1;
  const day = new Date().getDate();

  const today =
    year + '-' + month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0');

  const todayTrash = trashes?.find((t) => t.date.toString() === today);

  const changeColor = (title: TrashName) => {
    switch (title) {
      case TrashName.Burnable:
        return 'danger.400';
      case TrashName.BottolesAndOil:
        return 'primary.400';
      case TrashName.Unburnable:
        return 'success.400';
      case TrashName.Plastic:
        return 'primary.200';
      case TrashName.Paper:
        return 'amber.700';
      case TrashName.Clothes:
        return 'warning.300';
      case TrashName.Nothing:
        return 'muted.400';
      default:
        throw new Error('該当のごみがありません');
    }
  };

  if (!todayTrash) return <AppLoading />;

  return (
    <Box bgColor='white' height='100%' p={4} pt='30%'>
      <Center>
        <Box
          size={300}
          bgColor={changeColor(todayTrash.name)}
          alignItems='center'
          justifyContent='center'
          borderRadius={4}
        >
          {todayTrash && (
            <Heading fontSize={26} textAlign='center'>
              {EnumToText.trashNameEnumToText(todayTrash.name)}
            </Heading>
          )}
        </Box>
        <Button mt={10} onPress={() => clearStorage()}>
          データ削除
        </Button>
      </Center>
    </Box>
  );
};
