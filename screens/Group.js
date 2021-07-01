import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Group_ADD from '../screens/Group_add';
import Group_HOME from '../screens/Group_home';
import GroupDetails from '../screens/GroupDetail';



const MyStack = createStackNavigator();

function Group() {
  return (
    <MyStack.Navigator>
      <MyStack.Screen name="Home" component={Group_HOME} />
      <MyStack.Screen name="ADD" component={Group_ADD} />
      <MyStack.Screen name="Detail" component={GroupDetails} />
    </MyStack.Navigator>
  );
}


export default Group;


