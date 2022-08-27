import * as React from 'react';

// Navigators Imports
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Homepage from '../screens/Homepage/Homepage';
import description from '../screens/Description/description';
import Addproducts from '../screens/AddProducts/Addproducts';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
        }}>
        <Stack.Screen
          name="Home"
          component={Homepage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="description"
          component={description}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Addproducts"
          component={Addproducts}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
