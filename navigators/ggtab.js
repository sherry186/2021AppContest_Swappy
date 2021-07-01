import React, { useState } from "react";
import { Text, View, Button } from 'react-native'
import { StyleSheet,  SafeAreaView, FlatList, StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import General from './General';
import Group from './Group';

const GgTab = createMaterialTopTabNavigator();

function GgTabs(){
        const insets = useSafeAreaInsets();
    return(  
        <GgTab.Navigator
            initialRouteName="General"
            tabBarOptions={{
                activeTintColor: "#e91e63",
                labelStyle: { fontSize: 12 },
                style: { backgroundColor: 'white', marginTop: insets.top}
             }}
        >   
            <GgTab.Screen 
                name = "General"
                component = {General}
                options={{ tarBarLabel: 'General'}}
            />
            <GgTab.Screen 
                name = "Group"
                component = {Group}
                options={{ tarBarLabel: 'Group'}}
            />
        </GgTab.Navigator>
    )
} 

export default function TopBarNavigator(){
    return <GgTabs />
}