import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
//import { NavigationContainer } from '@react-navigation/native';
import { Assets, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from '../screens/Home';  //dot dot slash is going up a path
import Personal from '../screens/Personal';
import Record from '../screens/Record';
import Social from '../screens/Social';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return(
    <Tab.Navigator
      tabBarOptions={{
        showLabel:false,
        style:{
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height:90,
          ...styles.shadow
        }

      }}>
      <Tab.Screen name = "Home" component = {Home} options={{
        tableBarIcon:({focus})=>(
          <View style={{alignItems:'center', justifyContenet: 'center', top: 10}}>
            <Image
              source={require('../assets/Home.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#e32f45': '#748c94'
              }}
            />
              <Text style ={{color: focused ? '#e32f45': '#748c94', fontSize : 12}}>Home</Text>
          </View>
        )
      }}></Tab.Screen>
      <Tab.Screen name = "Personal" component = {Personal}options={{
        tableBarIcon:({focus})=>(
          <View style={{alignItems:'center', justifyContenet: 'center', top: 10}}>
            <Image
              source={require('../assets/Personal.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#e32f45': '#748c94'
              }}
            />
              <Text style ={{color: focused ? '#e32f45': '#748c94', fontSize : 12}}>Personal</Text>
          </View>
        )
      }}></Tab.Screen>
      <Tab.Screen name = "Record" component = {Record}options={{
        tableBarIcon:({focus})=>(
          <View style={{alignItems:'center', justifyContenet: 'center', top: 10}}>
            <Image
              source={require('../assets/Record.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#e32f45': '#748c94'
              }}
            />
              <Text style ={{color: focused ? '#e32f45': '#748c94', fontSize : 12}}>Record</Text>
          </View>
        )
      }}></Tab.Screen>
      <Tab.Screen name = "Social" component = {Social}options={{
        tableBarIcon:({focus})=>(
          <View style={{alignItems:'center', justifyContenet: 'center', top: 10}}>
            <Image
              source={require('../assets/Social.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#e32f45': '#748c94'
              }}
            />
              <Text style ={{color: focused ? '#e32f45': '#748c94', fontSize : 12}}>Social</Text>
          </View>
        )
      }}></Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow:{
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})
// function Root() {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Home">
//           <Stack.Screen name="Home" component={Home}/>
//           <Stack.Screen name="Personal" component={Personal} />
//           <Stack.Screen name="Record" component={Record} />
//           <Stack.Screen name="Social" component={Social} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }
  
  export default Tabs;