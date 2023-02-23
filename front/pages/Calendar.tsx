import { Calendar, ICalendarEventBase } from 'react-native-big-calendar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form';
import { Trash } from '../domain/entity/Trash';
import { TrashRepository } from '../domain/repository/TrashRepository';
import { useState, useCallback } from 'react';
import { Text, Box, HStack } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

export const TrashCalendar = () => {
  const { setValue, watch } = useForm<Trash>();
  const [trashes, setTrashes] = useState<Trash[]>();
  const [isReady, setIsReady] = useState<boolean>(false);

  const fetchRegion = async (data: Trash) => {
    try {
      const repository = new TrashRepository();
      const trashData = await repository.getTrashDates(data);
      setTrashes(trashData);
    } catch (e) {
      console.log(e);
    } finally {
      setIsReady(true);
    }
  };

  const init = async () => {
    const region = await AsyncStorage.getItem('region');
    setValue('regionId', Number(region));
    fetchRegion(watch());
  };

  useFocusEffect(
    useCallback(() => {
      init();
    }, []),
  );

  const events = trashes?.map((trash) => {
    return { title: trash.name, start: new Date(trash.date), end: new Date(trash.date) };
  });

  const thieYear = new Date().getFullYear();
  const thisMonth = Number(new Date().getMonth()) + 1;

  const header = () => {
    return (
      <Box bgColor='white'>
        <Text textAlign='center' fontSize={22}>{`${thieYear}年${thisMonth}月`}</Text>
        <HStack justifyContent='space-around' mx={3}>
          <Text color='red.500' bold>
            日
          </Text>
          <Text bold>月</Text>
          <Text bold>火</Text>
          <Text bold>水</Text>
          <Text bold>木</Text>
          <Text bold>金</Text>
          <Text color='blue.500' bold mr={-0.5}>
            土
          </Text>
        </HStack>
      </Box>
    );
  };

  const changeColor = (title: string) => {
    switch (title) {
      case '燃やせるごみ':
        return 'danger.400';
      case 'びん・かん・ペットボトル\n廃食用油・金属油':
        return 'primary.400';
      case '燃やせないごみ':
        return 'success.400';
      case 'プラスチック製容器包装類':
        return 'primary.200';
      case '古紙類':
        return 'amber.700';
      case '衣類・布類':
        return 'warning.300';
      case '収集なし':
        return 'muted.400';
      default:
        throw new Error('該当のごみがありません');
    }
  };

  const renderEvent = <T extends ICalendarEventBase>(event: T) => (
    <Box bgColor={changeColor(event.title)} borderRadius={4} p={1}>
      <Text fontSize={8.5} bold>
        {event.title}
      </Text>
    </Box>
  );

  if (!isReady || !events) return <AppLoading />;

  return (
    <Box height='100%'>
      <Calendar
        events={events}
        height={0}
        mode='month'
        locale='ja'
        renderHeaderForMonthView={header}
        renderEvent={renderEvent}
        bodyContainerStyle={{
          backgroundColor: 'white',
        }}
      />
    </Box>
  );
};
