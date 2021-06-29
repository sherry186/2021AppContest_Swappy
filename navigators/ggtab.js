import * as React from 'react'
import { Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


function General() {
    return (
      <View 
        style={{ 
            flex: 1, 
            justifyContent: 'center',
            alignItems: 'center', 
            backgroundColor: "#03cafc" }}>
        <Text>general</Text>
      </View>
    );
}

function Group() {
    return (
      <View 
        style={{ 
            flex: 1, 
            justifyContent: 'center',
            alignItems: 'center', 
            backgroundColor: "#03cafc" }}>
        <Text>group</Text>
      </View>
    );
}

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