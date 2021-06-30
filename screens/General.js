import * as React from 'react';
import { View, Text, StyleSheet,  SafeAreaView, FlatList, StatusBar } from 'react-native';
import { useState, useEffect } from "react";
import { SearchBar } from 'react-native-elements';
import _ from "lodash";

import GeneralItems from '../Data/GeneralItems';


const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
);
  

const renderItem = ({ item }) => (
    <Item title={item.title} />
);

const contains = (data, query) => {
  let formatData = data.toLowerCase();
  let formatQuery = query.toLowerCase();

  if (formatData.includes(formatQuery)) {
    return true;
  }
  return false;
}

function General() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);

  function handleSearch(search) {
    console.log(search);
    const data = _.filter(fullData, general => {
      return contains(general.title, search)
    })
    setData(data);
    setSearch(search);
  }

  useEffect(() => {
    setData(GeneralItems);
    setFullData(GeneralItems);
  }, [])

    return (
      <SafeAreaView style={styles.container}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={(text)=>handleSearch(text)}
          value={search}
          lightTheme
        />
        <FlatList
          data={data}
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