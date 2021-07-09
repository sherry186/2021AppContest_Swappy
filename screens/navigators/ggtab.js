import React, { useState } from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text } from "react-native";
import General from './GeneralNav';
import Group from './GroupNav';



export default class TopBarNavigator extends React.Component{
    

    render (){
        const GgTab = createMaterialTopTabNavigator();
        return(  
            <GgTab.Navigator
                initialRouteName="General"
                
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
    
} 

// export default function TopBarNavigator(){
//     return <GgTabs />
// }