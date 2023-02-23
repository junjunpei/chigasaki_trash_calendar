import { TouchableWithoutFeedback, Keyboard, FlatList } from "react-native";
import { towns } from "../utils/SuggestionList";
import { useForm } from 'react-hook-form'
import { FormControl, Box, Text, Input, InputGroup, InputLeftAddon, Button, Pressable } from "native-base";
import { UserRepository } from "../domain/repository/UserRepository";
import { User } from "../domain/entity/User";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../screens/type";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ChooseRegion = () => {
  const { watch, register, handleSubmit, setValue } = useForm<User>();

  const suggestionList = towns.filter((town) => town.includes(watch('townName')))

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
            <InputGroup>
              <InputLeftAddon children='茅ヶ崎市' />
              <Input
                placeholder="例）香川"
                onChangeText={(word) => setValue('townName', word)}
                {...register('townName')}
                value={watch('townName')}
                width='80%'
                borderRightRadius={4}
                bgColor='white'
                focusOutlineColor='green.400'
                fontSize={16}
              />
            </InputGroup>
            <FlatList
              data={suggestionList}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => setValue('townName', item)}
                >
                {({isPressed}) => {
                  return suggestionList && watch('townName')?.length !== 0 && item !== watch('townName') && (
                    <Box
                      width='80%'
                      borderWidth={1}
                      borderTopWidth={0}
                      borderColor='gray.300'
                      ml='19.5%'
                      borderRadius={4}
                      borderLeftRadius={0}
                      bgColor={isPressed ? 'green.200' : 'white'}
                    >
                      <Text pl={2} my={2}>
                        {item}
                      </Text>
                    </Box>
                  )
                }}
                </Pressable>
              )}
            />
            <Button mt={20} variant='subtle' onPress={handleSubmit(onSubmit)} colorScheme='green' isDisabled={!termDisabled}>
              決定
            </Button>
          </Box>
        </FormControl>
      </Box>
    </TouchableWithoutFeedback>
  )
}