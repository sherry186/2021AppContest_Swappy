import * as React from 'react';
import { View, Text } from 'react-native';
import SearchBar from '../Components/SearchBar';
import { StyleSheet,  SafeAreaView, FlatList, StatusBar } from "react-native";
import { useState } from "react";


const Social_DATA = [
    {
      id: '0',
      person: 'Jane',
      post: "This app is really good. Thank you WYL.",
    },
    {
      id: '1',
      person: 'Sherry',
      post: "This app is quite bad. I don't like it", 
    },
    {
      id: '2',
      person: 'Sylvia',
      post: "I found that some people really like this app, so I try to.....",
    },
];

const Post = ({ person, post }) => (
    <View style={styles.Chat}>
      <Text style={styles.person}>{person}</Text>
      <Text style={styles.post}>{post}</Text>
    </View>
);
  

const renderChat = ({ item }) => (
    <Post person = {item.person} post = {item.post} />
);

function updateSearch(value) {
    //do your search logic or anything
    console.log(value)
}

function Social() {
    const [value, setValue] = useState('')
    return (
        <SafeAreaView style={styles.container}>
            <SearchBar value={value}
                    updateSearch={updateSearch}/>
            <FlatList
              data={Social_DATA}
              renderItem={renderChat}
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
    Chat: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    person: {
      fontSize: 12,
    },
    post: {
      fontSize: 16,
    },
});

export default Social;