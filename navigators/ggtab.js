import React, { useState } from "react";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import General from './GeneralNav';
import Group from './GroupNav';

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