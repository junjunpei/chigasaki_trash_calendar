import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { towns } from "../utils/SuggestionList";
import { useForm, FormProvider } from 'react-hook-form'
import { FormControl, Box, Text, Input, InputGroup, InputLeftAddon, Button, Pressable } from "native-base";
import { UserRepository } from "../domain/repository/UserRepository";
import { User } from "../domain/entity/User";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../screens/type";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RegionForm } from "../components/RegionForm";

export const ChooseRegion = () => {
  const methods = useForm<User>();

  const { handleSubmit, watch } = methods;

  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>()

  const onSubmit = async (data: User) => {
    try {
      const repository = new UserRepository
      await repository.create(data)
      const region = await AsyncStorage.getItem('region')
      if (region) navigate('BottomTabs')
    } catch (e) {
      alert(`地区登録に失敗しました\n選択し直した上で再度お試しください`)
    }
  }

  const termDisabled = towns.find((town) => town === watch('townName'))

  const [isRegistered, setIsRegistered] = useState<boolean>(false)
  
  useFocusEffect(() => {
    fetchUser();
    if (isRegistered) navigate('BottomTabs')
  })

  const fetchUser = async () => {
    const region = await AsyncStorage.getItem('region')
    if (region !== null) setIsRegistered(true);
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Box bgColor='white' height='100%' p={4} pt='35%' >
        <FormControl>
          <FormControl.Label _text={{ fontSize: 12 }}>
            「茅ヶ崎市」以降の住所を入力してください ※番地は不要です
          </FormControl.Label>
          <Box>
            <FormProvider {...methods}>
              <RegionForm />
            </FormProvider>
            <Button mt={20} variant='subtle' onPress={handleSubmit(onSubmit)} colorScheme='green' isDisabled={!termDisabled}>
              決定
            </Button>
          </Box>
        </FormControl>
      </Box>
    </TouchableWithoutFeedback>
  )
}