import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main_ADD from '../screens/Main/Main_add';
import MyCollection_HOME from '../screens/MyCollection/MyCollection_home';
import MainDetails from '../screens/Main/Main_detail';


const MStack = createStackNavigator();

function MyCollection() {
  return (
    <MStack.Navigator>

      <MStack.Screen 
        name="Home" 
        component={MyCollection_HOME}
        options={{
          title:"",
          headerStyle:{
            backgroundColor: 'transparent',
            height: 0
          }
        }} />
      <MStack.Screen 
        name="ADD" 
        component={Main_ADD}
        options={{
          title:"",
          headerStyle:{
            backgroundColor: 'transparent',
            
          }
        }}/>
      <MStack.Screen 
        name="Detail" 
        component={MainDetails}
        options={{
          title:"",
          headerStyle:{
            backgroundColor: 'transparent',
            
          }
        }}/>
    </MStack.Navigator>
  );
}


export default MyCollection;