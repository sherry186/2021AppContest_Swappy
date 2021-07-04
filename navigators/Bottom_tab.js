import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
//import { NavigationContainer } from '@react-navigation/native';
import { Assets, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TopBarNavigator from './ggtab';  //dot dot slash is going up a path
import Social from './SocialNav';
import Personal from '../screens/Personal';
import Record from './RecordNav';




const Tab = createBottomTabNavigator();

const Tabs = () => {
  return(
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
          activeTintColor: "#e91e63",
          keyboardHidesTabBar: true,
          labelStyle: { fontSize: 20 },
          style: { 
              position: 'absolute',
              bottom: 0,
              elevation: 0,
              left:0,
              right:0,
              backgroundColor: 'white',
              height:60,
              }

      }}>
      <Tab.Screen name = "Home" component = {TopBarNavigator} options={{
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

  
export default Tabs;