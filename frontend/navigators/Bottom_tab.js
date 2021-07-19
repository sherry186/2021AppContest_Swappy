import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ViewPagerAndroidComponent } from 'react-native';
//import { NavigationContainer } from '@react-navigation/native';
import { Assets, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//import TopBarNavigator from './ggtab';  //dot dot slash is going up a path
import Social from './SocialNav';
import Personal from '../screens/Personal';
import BreakAway from '../screens/BreakAway/BreakAway';
import Home from "./Home_Nav";
import colors from "../config/colors";



const Tab = createBottomTabNavigator();

const Tabs = () => {
  return(
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
          
          keyboardHidesTabBar: true,
          showLabel: false,
          //labelStyle: { fontSize: 20 },
          style: { 
              borderTopColor: colors.mono_60,
              borderTopWidth: 1,
              position: 'absolute',
              bottom: 0,
              elevation: 0,
              left:0,
              right:0,
              backgroundColor: colors.mono_40,
              height:65,
              }

      }}>
      <Tab.Screen 
        name = "Home"
        component = {Home} 
        options={{
          cardStyle: {backgroundColor: colors.function_100},
          tabBarIcon:({focused})=>(
          <View style = {{alignContent: 'center', justifyContent:'center', top: 10}}>
            <Image
              source={require('../assets/bottomtab/home.png')}
              resizeMode='contain'
              style={{
                width: 50,
                height: 50,
                tintColor: focused? colors.function_100 : colors.mono_60
              }}
            /> 
          </View>
        )
      }}></Tab.Screen>
      
      <Tab.Screen name = "BreakAway" component = {BreakAway}options={{
        tabBarIcon:({focused})=>(
          <View style = {{alignContent: 'center', justifyContent:'center', top: 10}}>
          <Image
            source={require('../assets/bottomtab/breakAway.png')}
            resizeMode='contain'
            style={{
              width: 50,
              height: 50,
              tintColor: focused? colors.function_100 : colors.mono_60
            }}
          /> 
        </View>
      
        )
      }}></Tab.Screen>
      <Tab.Screen name = "Social" component = {Social}options={{
        tabBarIcon:({focused})=>(
          <View style = {{alignContent: 'center', justifyContent:'center', top: 10}}>
          <Image
            source={require('../assets/bottomtab/social.png')}
            resizeMode='contain'
            style={{
              width: 50,
              height: 50,
              tintColor: focused? colors.function_100 : colors.mono_60
            }}
          /> 
        </View>
        )
      }}></Tab.Screen>
      <Tab.Screen name = "Personal" component = {Personal}options={{
        tabBarIcon:({focused})=>(
          <View style = {{alignContent: 'center', justifyContent:'center', top: 10}}>
            <Image
              source={require('../assets/bottomtab/personal.png')}
              resizeMode='contain'
              style={{
                width: 50,
                height: 50,
                tintColor: focused? colors.function_100 : colors.mono_60
              }}
            /> 
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