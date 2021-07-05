import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import General_ADD from '../screens/General/General_add';
import GeneralDetailsScreen from '../screens/General/GeneralDetail';
import GroupDetailsScreen from '../screens/Group/GroupDetail';
import Group_ADD from '../screens/Group/Group_add';
import Main_ADD from '../screens/Main/Main_add';
import Tabs from './Bottom_tab';
import BreakAwayADD from '../screens/BreakAway/BreakAwayADD';
import MainDetail from '../screens/Main/Main_detail';
import BreakAwayHesitate from '../screens/BreakAway/BreakAwayHesitate';

const RootStack = createStackNavigator();

function Root() {
    return (
      <RootStack.Navigator>
  
        <RootStack.Screen 
          name="BottomTab" 
          component={Tabs}
          //options={{headerShown: false}}
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

        <RootStack.Screen 
          name="MainDetail" 
          component={MainDetail}
          options={{headerShown: false}}
         />

        <RootStack.Screen 
          name="GeneralDetail" 
          component={GeneralDetailsScreen}
          options={{headerShown: true}}
        />

        <RootStack.Screen 
          name="GroupDetail" 
          component={GroupDetailsScreen}
          options={{headerShown: true }}/>

        <RootStack.Screen 
          name="BreakAwayADD" 
          component={BreakAwayADD}
          options={{headerShown: false }}/>

        <RootStack.Screen 
          name="BreakAwayHesitate" 
          component={BreakAwayHesitate}
          options={{headerShown: false }}/>
      </RootStack.Navigator>
    );
  }
  
  
  export default Root;