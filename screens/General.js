import * as React from 'react';
import { View, Text } from 'react-native';
import SearchBar from '../Components/SearchBar';
import { StyleSheet,  SafeAreaView, FlatList, StatusBar } from "react-native";
import { useState } from "react";

import GeneralItems from '../Data/GeneralItems';


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
        data={GeneralItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
    );
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

export default General;