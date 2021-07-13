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
import GroupAddItem from '../screens/Group/GroupAddItem';
import Group_itemDetail from '../screens/Group/Group_itemDetail';
import Notification from './NotificationNav';
import BreakAwayItemDetail from '../screens/BreakAway/BreakAwayItemDetail';
import BreakAwayItemChangeOut from '../screens/BreakAway/BreakAwayItemChangeOut';
import BreakAwaySpaceDetail from '../screens/BreakAway/BreakAwaySpaceDetail';
import BreakAwayChangeOut from '../screens/BreakAway/BreakAwayChangeOut';
import login from '../screens/Login/login';
import signup from '../screens/Login/signup';
//import { Text } from 'react-native';


const RootStack = createStackNavigator();

function Root() {
    return (
      <RootStack.Navigator>
        {/*login*/}
        <RootStack.Screen 
          name="login" 
          component={login}
          options={{headerShown: false}}
        />
        <RootStack.Screen 
          name="signup" 
          component={signup}
          options={{headerShown: false}}
        />


        {/*tab*/}
        <RootStack.Screen 
          name="BottomTab" 
          component={Tabs}
          options={{headerShown: false}}
        />


        {/*general*/}
        <RootStack.Screen 
          name="GeneralAdd" 
          component={General_ADD}
          options={{headerShown: false}}
         />

        <RootStack.Screen 
          name="GeneralDetail" 
          component={GeneralDetailsScreen}
          options={{headerShown: true}}
        />

        {/*group*/}
        <RootStack.Screen 
          name="GroupAdd" 
          component={Group_ADD}
          options={{headerShown: false}}
        />
        <RootStack.Screen 
          name="GroupDetail" 
          component={GroupDetailsScreen}
          options={{headerShown: true }}/>

        <RootStack.Screen 
          name="GroupAddItem" 
          component={GroupAddItem}
          options={{headerShown: true }}/>
        
        <RootStack.Screen 
          name="Group_itemDetail" 
          component={Group_itemDetail}
          options={{headerShown: true }}/>
        
        {/*social */}
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

        
        {/*break away */}
        <RootStack.Screen 
          name="BreakAwayADD" 
          component={BreakAwayADD}
          options={{headerShown: false }}/>
        
        <RootStack.Screen 
          name="BreakAwayItemDetail" 
          component={BreakAwayItemDetail}
          options={{headerShown: false }}/>

        <RootStack.Screen 
          name="BreakAwayItemChangeOut" 
          component={BreakAwayItemChangeOut}
          options={{headerShown: false }}/>

        <RootStack.Screen 
          name="BreakAwayHesitate" 
          component={BreakAwayHesitate}
          options={{headerShown: false }}/>

        <RootStack.Screen 
          name="BreakAwayChangeOut" 
          component={BreakAwayChangeOut}
          options={{headerShown: false }}/>
        
        <RootStack.Screen 
          name="BreakAwaySpaceDetail" 
          component={BreakAwaySpaceDetail}
          options={{headerShown: false }}/>

        {/*notification & message*/}
        <RootStack.Screen 
          name="Notification" 
          component={Notification}
          options={{headerShown: true }}/>

      </RootStack.Navigator>
    );
  }
  
  
  export default Root;