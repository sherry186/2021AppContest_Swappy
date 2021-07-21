import React, { useState } from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text } from "react-native";

import Notification_invitation from "../screens/Notification/Notification_invitation";
import Notification_requesting from "../screens/Notification/Notification_requesting";
import colors from "../config/colors";

const Tab = createMaterialTopTabNavigator();

function Notification() {
        
    return(  
        <Tab.Navigator
            initialRouteName="requesting"
            
            tabBarOptions={{
                showLabel: false,
                showIcon: true,
                indicatorStyle:{color: colors.mono_40},
                style: { 
                    elevation: 0,
                    top: 0,
                    left: 79,
                    width: 252,
                    height: 40,
                    backgroundColor: colors.mono_40,
                }
             }}
        >   
            
            <Tab.Screen 
                name = "requesting"
                component = {Notification_requesting}
                options={{ 
                    tabBarIcon:({focused})=>(
                        <View style =  {{right: 40,  width: 120,}}>
                            <Text style = {{ bottom: 8, color: focused? colors.function_100 : colors.mono_60, fontSize: 20 }}>Requesting</Text>
                        </View>
                      )}}
            
            />
            <Tab.Screen 
                name = "invitation"
                component = {Notification_invitation}
                options={{ 
                    tabBarIcon:({focused})=>(
                        <View style =  {{ right: 30, width:120}}>
                            <Text style = {{ bottom: 8, color: focused? colors.function_100 : colors.mono_60, fontSize: 20 }}>Invitation</Text>
                        </View>
                    )}}
            />
        </Tab.Navigator>
        
    )
    
} 

export default Notification;