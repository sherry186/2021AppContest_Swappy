import React, { useState } from "react";
import { Text, View, Button } from 'react-native'
import { StyleSheet,  SafeAreaView, FlatList, StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import SearchBar from '../Components/SearchBar';


const GENERAL_DATA = [
    {
      id: '0',
      title: 'Jacket',
    },
    {
      id: '1',
      title: 'Purse',
    },
    {
      id: '2',
      title: 'Book',
    },
  ];

  const GROUP_DATA = [
    {
      id: '0',
      title: 'Jo-Malone',
    },
    {
      id: '1',
      title: 'Hermes',
    },
    {
      id: '2',
      title: 'Dior',
    },
  ];

  
const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  function updateSearch(value) {
    //do your search logic or anything
    console.log(value)
}

function General() {
    const [value, setValue] = useState('')
    return (
        <SafeAreaView style={styles.container}>
            <SearchBar value={value}
                    updateSearch={updateSearch}/>
      <FlatList
        data={GENERAL_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
    );
}

function Group() {
    const [value, setValue] = useState('')
    return (
        <SafeAreaView style={styles.container}>
            <SearchBar value={value}
                    updateSearch={updateSearch}/>
      <FlatList
        data={GROUP_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });

export default function TopBarNavigator(){
    return <GgTabs />
}

