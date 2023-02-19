import { Text, SafeAreaView, TouchableWithoutFeedback, Keyboard, TextInput, FlatList, Pressable, } from "react-native";
import { towns } from "../utils/SuggestionList";
import { useForm } from 'react-hook-form'
import { FormControl, Box } from "native-base";

export const Suggenstion = () => {
  const { watch, register, handleSubmit, setValue } = useForm<{townName: string}>();

  const onChangeWord = async (word: string) => {
    setValue('townName', word)
  }

  console.log(watch())
  const suggestionList = towns.filter((town) => town.includes(watch('townName')))

  return (
    <Box bgColor='white' p={3}>
      <Text style={{ marginLeft: 12, marginVertical: 5, fontSize: 12 }}>Search</Text>
      <FormControl>
        <TextInput
          placeholder="入力してください"
          onChangeText={(word) => onChangeWord(word)}
          {...register('townName')}
          value={watch('townName')}
          style={{
            height: 20,
            marginHorizontal: 12,
            borderWidth: 1,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
        />
      {suggestionList && watch('townName')?.length !== 0 &&
        <FlatList
          data={suggestionList}
          renderItem={({item, index}) => (
            <Pressable onPress={() => setValue('townName', item)}>
              <Text>
                {item}
              </Text>
            </Pressable>
          )}
        />
      }
      </FormControl>
    </Box>
  )
}