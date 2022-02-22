import React from 'react';
import {
  Text,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  VStack,
  Button,
} from 'native-base';

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === 'light' ? true : false}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === 'light' ? 'switch to dark mode' : 'switch to light mode'
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}
const WelcomeScreen = props => {
  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}
    >
      <VStack space={4} alignItems="center">
        <Heading size="lg">Welcome to Myant Test</Heading>
        <ToggleDarkMode />
        <Button
          mt="5"
          size="md"
          borderRadius="4"
          _text={{
            fontWeight: 'medium',
          }}
          _light={{
            bg: 'primary.900',
          }}
          _dark={{
            bg: 'primary.700',
          }}
          onPress={() => {
            props.navigation.navigate('Home');
          }}
        >
          Home Page
        </Button>
      </VStack>
    </Center>
  );
};
export default WelcomeScreen;
