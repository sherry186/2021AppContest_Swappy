import React, { useState } from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text } from "react-native";

import Notification_invitation from "../screens/Notification/Notification_invitation";
import Notification_requesting from "../screens/Notification/Notification_requesting";


export default class Notification extends React.Component{
    

    render (){
        const Tab = createMaterialTopTabNavigator();
        return(  
            <Tab.Navigator
                initialRouteName="invitation"
                
                tabBarOptions={{
                    tabBarVisible: false,
                    activeTintColor: "#e91e63",
                    labelStyle: { fontSize: 25 },
                    style: { 
                        marginTop:12,
                        elevation: 0,
    
                        backgroundColor: 'white',
                        height:60
                    }
                 }}
            >   
                <Tab.Screen 
                    name = "invitation"
                    component = {Notification_invitation}
                    options={{ tarBarLabel: 'invitation'}}
                />
                <Tab.Screen 
                    name = "requesting"
                    component = {Notification_requesting}
                    options={{ tarBarLabel: 'requesting'}}
                
                />
            </Tab.Navigator>
            
        )
    }
    
} 
