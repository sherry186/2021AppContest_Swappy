import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import General_ADD from '../screens/General/General_add';
import Group_ADD from '../screens/Group/Group_add';
import Main_ADD from '../screens/Main/Main_add';
import Tabs from './Bottom_tab';

const RootStack = createStackNavigator();

function Root() {
    return (
      <RootStack.Navigator>
  
        <RootStack.Screen 
          name="BottomTab" 
          component={Tabs}
        />

        <RootStack.Screen 
          name="GeneralAdd" 
          component={General_ADD}
          options={{headerShown: false}}
         />

        <RootStack.Screen 
          name="GroupAdd" 
          component={Group_ADD}
          options={{headerShown: false}}
        />

        <RootStack.Screen 
          name="MainAdd" 
          component={Main_ADD}
          options={{headerShown: false}}
         />

      </RootStack.Navigator>
    );
  }
  
  
  export default Root;