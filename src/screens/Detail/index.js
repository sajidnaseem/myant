import React from 'react';
import {
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  StatusBar,
  Image,
  useColorMode,
  ScrollView,
  Pressable,
  Button,
  Stack,
  Hidden,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function (props) {
  const { navigation, route } = props;
  const { current, location, forecast } = route.params.data;
  console.debug(forecast.forecastday);
  // add next router here
  const [tabName, setTabName] = React.useState('Reviews');
  const { colorMode } = useColorMode();
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Box
        safeAreaTop
        _light={{
          bg: 'primary.900',
        }}
        _dark={{
          bg: 'coolGray.900',
        }}
      />
      <VStack
        flex={1}
        _light={{
          bg: 'primary.50',
        }}
        _dark={{
          bg: 'customGray',
        }}
      >
        <Box
          flex={1}
          flexDirection={{
            base: 'column',
            md: 'row',
          }}
          _light={{
            borderTopColor: 'coolGray.200',
          }}
          _dark={{
            bg: 'coolGray.800',
            borderTopColor: 'coolGray.700',
          }}
        >
          <ScrollView
            flex={1}
            p={{
              md: 8,
            }}
            contentContainerStyle={{
              alignItems: 'center',
              flex: 1,
            }}
          >
            <VStack maxW="1016px" flex={1} width="100%">
              <Hidden till="md">
                <HStack mb="4" space={2}>
                  <Pressable>
                    <Icon
                      size="6"
                      as={AntDesign}
                      name={'arrowleft'}
                      _light={{
                        color: 'coolGray.800',
                      }}
                      _dark={{
                        color: 'coolGray.50',
                      }}
                    />
                  </Pressable>
                  <Text
                    fontSize="lg"
                    _dark={{
                      color: 'coolGray.50',
                    }}
                    _light={{
                      color: 'coolGray.800',
                    }}
                  >
                    {location.name}
                  </Text>
                </HStack>
              </Hidden>

              <Stack
                flex={1}
                p={{
                  md: '8',
                }}
                _light={{
                  bg: 'white',
                }}
                _dark={{
                  borderColor: 'coolGray.700',
                  bg: {
                    md: 'coolGray.900',
                    base: 'coolGray.800',
                  },
                }}
                borderWidth={1}
                borderColor="#E5E7EB"
                borderRadius={8}
                direction={{
                  base: 'column',
                  md: 'row',
                }}
                space="6"
              >
                <Box
                  p="2"
                  bg="primary.100"
                  borderRadius="md"
                  alignItems="center"
                  w={{
                    base: '100%',
                    md: '50%',
                  }}
                  h={{
                    base: '40%',
                    md: 'auto',
                  }}
                  pr={{
                    base: '2',
                    md: '4',
                  }}
                  justifyContent="center"
                >
                  <Image
                    width="full"
                    height={{
                      base: 'full',
                      md: 'full',
                    }}
                    rounded="lg"
                    alt="Alternate Text"
                    source={{
                      uri: `https://source.unsplash.com/random/?city,night`,
                    }}
                  />
                </Box>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Box
                    flex={1}
                    px={{
                      base: '4',
                    }}
                  >
                    <VStack space={1}>
                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text
                          fontSize="lg"
                          _light={{
                            color: 'coolGray.800',
                          }}
                          _dark={{
                            color: 'coolGray.50',
                          }}
                        >
                          {location.name}
                        </Text>
                        <HStack alignItems="center" space="1">
                          <Icon
                            size="4"
                            name={'cloud'}
                            as={AntDesign}
                            color="amber.400"
                          />

                          <Text
                            fontSize="md"
                            _light={{
                              color: 'coolGray.800',
                            }}
                            _dark={{
                              color: 'coolGray.50',
                            }}
                          >
                            {current.temp_c}
                          </Text>
                        </HStack>
                      </HStack>
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        color="coolGray.400"
                      >
                        Humidity
                      </Text>
                      <Text
                        fontSize="xl"
                        fontWeight="medium"
                        _light={{
                          color: 'coolGray.800',
                        }}
                        _dark={{
                          color: 'coolGray.50',
                        }}
                      >
                        {current.humidity} %
                      </Text>
                    </VStack>

                    <HStack space="2" mt="5" alignItems="center">
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        _dark={{
                          color: 'coolGray.50',
                        }}
                        _light={{
                          color: 'coolGray.800',
                        }}
                      >
                        Daily Forecast
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        color="coolGray.400"
                      >
                        (3 days)
                      </Text>
                    </HStack>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      <Button.Group space="2" mt={3} alignItems="center">
                        {forecast.forecastday.map((item, i) => {
                          return (
                            <Button
                              key={i}
                              py="4"
                              px="5"
                              borderRadius="4"
                              variant="subtle"
                              _text={{
                                _dark: {
                                  color: 'coolGray.50',
                                },
                                _light: {
                                  color: 'coolGray.800',
                                },
                                fontWeight: 'normal',
                              }} //@ts-ignore
                              _light={{
                                colorScheme: 'primary',
                              }}
                              _dark={{
                                bg: 'coolGray.900',
                                //@ts-ignore
                                colorScheme: 'dark',
                              }}
                            >
                              {item.date}
                              Temp: {item.day.maxtemp_c}
                            </Button>
                          );
                        })}
                      </Button.Group>
                    </ScrollView>
                  </Box>
                </ScrollView>
              </Stack>
            </VStack>
          </ScrollView>
        </Box>
      </VStack>
    </>
  );
}
