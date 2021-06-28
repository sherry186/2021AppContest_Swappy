import * as React from "react";
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';  //dot dot slash is going up a path
import Personal from '../screens/Personal';
import Record from '../screens/Record';
import Social from '../screens/Social';

const Stack = createStackNavigator();

function Root() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Personal" component={Personal} />
          <Stack.Screen name="Record" component={Record} />
          <Stack.Screen name="Social" component={Social} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default Root;