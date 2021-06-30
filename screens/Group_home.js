import * as React from 'react';

import { View, Text, SafeAreaView,  FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SearchBar } from 'react-native-elements';
import { useState } from "react";

const GENERAL_DATA = [
  {
    id: '0',
    title: 'Group 1',
  },
  {
    id: '1',
    title: 'Group 2',
  },
  {
    id: '2',
    title: 'Group 3',
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

export default class Group_HOME extends React.Component {

  state = {
    search: '',
  };

  static navigationOptions = {
    title: 'Group_HOME',
  }

  updateSearch = (search) => {
    this.setState({ search });
  };
  

  render() {
    const { search } = this.state;
    // const[grvalue, grsetValue] = useState('');
    const{ navigate } = this.props.navigation;
    //console.log(this.props.navigation);

    return(
      <SafeAreaView style={styles.container}>
        <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
      />
      <FlatList
        data={GENERAL_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
        <TouchableOpacity 
            style={styles.button}
            onPress={() => navigate('ADD')}>
            <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center'
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
    button: {
      width: 60,
      height: 60,
      position: 'absolute',
      borderRadius: 30,
      backgroundColor: '#ee6e73',
      bottom: 150,
      right: 175,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 10,
      fontWeight: 'bold',
    },
  });
