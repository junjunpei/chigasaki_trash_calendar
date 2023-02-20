import { Box, Center, Button, Text, Heading } from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../screens/type";
import { TrashRepository } from "../domain/repository/TrashRepository";
import { Trash } from "../domain/entity/Trash";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export const TodayTrash = () => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { setValue, watch } = useForm<Trash>();
  const [trashes, setTrashes] = useState<Trash[]>();

  const fetchRegion = async (data: Trash) => {
    try {
      const repository = new TrashRepository;
      const trashData = await repository.getTrashDates(data);
      setTrashes(trashData)
    } catch(e) {
      console.log(e)
    }
  }

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('region');
      navigate('ChooseRegion')
    } catch(e) {
      console.warn(e)
    }
  }

  const init = async () => {
    const region = await AsyncStorage.getItem('region')
    setValue('regionId', Number(region))
    fetchRegion(watch())
  }

  useEffect(() => {
    init();
  }, [])

  const year = new Date().getFullYear()
  const month = Number(new Date().getMonth()) + 1
  const day = new Date().getDate()

  const today = year + '-' + month.toString().padStart(2, "0") + '-' + day.toString().padStart(2, "0")

  if (!trashes) return null

  const todayTrash = trashes.find((t) =>  t.date.toString() === today)

  return (
    <Box bgColor='white' height='100%' p={4} pt='30%'>
      <Center>
        <Box
          size={300}
          bgColor='green.300'
          alignItems='center'
          justifyContent='center'
          borderRadius={4}
        >
          {todayTrash &&
            <Heading fontSize={26} textAlign='center'>
              {todayTrash.name}
            </Heading>
          }         
        </Box>
        <Button mt={10} onPress={() => clearStorage()}>データ削除</Button>
      </Center>
    </Box>
  )
}