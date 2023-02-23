import { InputGroup, Input, InputLeftAddon, Box, FlatList, Text } from "native-base"
import { useFormContext } from "react-hook-form";
import { User } from "../domain/entity/User";
import { towns } from "../utils/SuggestionList";
import { Pressable } from "native-base";

export const RegionForm = () => {
  const { register, setValue, watch } = useFormContext<User>();

  const suggestionList = towns.filter((town) => town.includes(watch('townName')));

  return (
    <Box>
      <InputGroup>
        <InputLeftAddon children='茅ヶ崎市' />
        <Input
          {...register('townName')}
          placeholder="例）香川"
          onChangeText={(word) => setValue('townName', word)}
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
    </Box>
  )
}