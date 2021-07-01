import React, { useState } from "react";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Main from './MainNav';
import MyCollection from './MyCollectionNav';

const SocialTab = createMaterialTopTabNavigator();

function SocialTabs(){
        const insets = useSafeAreaInsets();
    return(  
        <SocialTab.Navigator
            initialRouteName="Main"
            tabBarOptions={{
                activeTintColor: "#e91e63",
                labelStyle: { fontSize: 12 },
                style: { backgroundColor: 'white', marginTop: insets.top}
             }}
        >   
            <SocialTab.Screen 
                name = "Main"
                component = {Main}
                options={{ tarBarLabel: 'MainNav'}}
            />
            <SocialTab.Screen 
                name = "My Collection"
                component = {MyCollection}
                options={{ tarBarLabel: 'MyCollection'}}
            />
        </SocialTab.Navigator>
    )
} 

export default function Social(){
    return <SocialTabs/>
}