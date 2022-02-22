/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {NativeBaseProvider, extendTheme, theme as nbTheme} from 'native-base';
 import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/Welcome';
import HomeScreen from './src/screens/Home';
import DetailScreen from './src/screens/Detail';
const Stack = createNativeStackNavigator();
const theme = extendTheme({
  colors: {
    primary: nbTheme.colors.violet,
  },
});

 const App = () => {
   return (
     <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcom"
            component={WelcomeScreen}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />

        </Stack.Navigator>
      </NavigationContainer>
     </NativeBaseProvider>
   );
 };
 export default App;
