import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Pressable,
  Box,
  FlatList,
  HStack,
  VStack,
  Text,
  Spacer,
} from 'native-base';

const WeatherList = ({ weathers, navigation }) => {
  const data = Object.keys(weathers).map(key => weathers[key]);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Detail', { data: item })}
        >
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: 'gray.600',
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
          >
            <HStack space={3} justifyContent="space-between">
              <VStack>
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.location.name}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                >
                  Temperature {item.current.temp_c}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                humidity {item.current.humidity}
              </Text>
            </HStack>
          </Box>
        </TouchableOpacity>
      )}
      keyExtractor={item => `item.current.name-${Math.random() * 5}`}
    />
  );
};

export default WeatherList;
