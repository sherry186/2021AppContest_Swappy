import React, { useState } from "react";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text, View } from "react-native";
import Main from './MainNav';
import MyCollection from './MyCollectionNav';

const SocialTab = createMaterialTopTabNavigator();
import colors from "../config/colors";
function SocialTabs(){
        const insets = useSafeAreaInsets();
    return(  
        
        <SocialTab.Navigator
            initialRouteName="Main"
            tabBarOptions={{
                showLabel: false,
                showIcon: true,
                indicatorStyle:{color: colors.function_100},
                
                style: { 
                    marginTop:12,
                    elevation: 0,
                    top: 63,
                    left: 79,
                    width: 252,
                    height: 40,
                    backgroundColor: 'transparent',
                }
             }}
        >   
            <SocialTab.Screen 
                name = "Main"
                component = {Main}
                options={{ 
                    tabBarIcon:({focused})=>(
                        <View style =  {{display: 'flex', right: 10, width: 100,}}>
                            <Text style = {{ bottom: 8, color: focused? colors.function_100 : colors.mono_60, fontSize: 20,}}>全部</Text>
                        </View>
                      )}}
            />
            <SocialTab.Screen 
                name = "My Collection"
                component = {MyCollection}
                options={{ 
                    tabBarIcon:({focused})=>(
                        <View style =  {{display: 'flex', right: 10, width: 100,}}>
                            <Text style = {{ bottom: 8, color: focused? colors.function_100 : colors.mono_60, fontSize: 20,}}>收藏</Text>
                        </View>
                      )}}
            />
        </SocialTab.Navigator>
    )
} 

export default function Social(){
    return <SocialTabs/>
}