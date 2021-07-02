import React, { useState } from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import General from './GeneralNav';
import Group from './GroupNav';

const GgTab = createBottomTabNavigator();

function GgTabs(){
        const insets = useSafeAreaInsets();
    return(  
        <GgTab.Navigator
            initialRouteName="General"
            tabBarOptions={{
                activeTintColor: "#e91e63",
                labelStyle: { fontSize: 20 },
                style: { 
                    position: 'absolute',
                    top: 100,
                    elevation: 0,
                    left:0,
                    right:0,
                    backgroundColor: 'white',
                    height:60,
                    }
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