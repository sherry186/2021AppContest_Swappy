import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import General_ADD from '../screens/General/General_add';
import General_HOME from '../screens/General/General_home';
import GeneralDetails from '../screens/General/GeneralDetail';



const MyStack = createStackNavigator();

function General() {
  return (
    <MyStack.Navigator>

      <MyStack.Screen 
        name="Home" 
        component={General_HOME}
        options={{
          title:"",
          headerStyle:{
            backgroundColor: 'transparent',
            height: 0
          }
        }} />
      <MyStack.Screen 
        name="ADD" 
        component={General_ADD}
        options={{
          title:"",
          headerStyle:{
            backgroundColor: 'transparent',
            
          }
        }}/>
      <MyStack.Screen 
        name="Detail" 
        component={GeneralDetails}
        options={{
          title:"",
          headerStyle:{
            backgroundColor: 'transparent',
            
          }
        }}/>
    </MyStack.Navigator>
  );
}


export default General;