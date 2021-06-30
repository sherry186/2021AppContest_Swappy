import * as React from 'react';
import SearchBar from '../Components/SearchBar';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";



export default class Group_HOME extends React.Component {

  static navigationOptions = {
    title: 'Group_HOME',
  }

  render() {
    // const[grvalue, grsetValue] = useState('');
    const{ navigate } = this.props.navigation;
    //console.log(this.props.navigation);

    return(
      <View style={styles.container}>
        <TouchableOpacity 
            style={styles.button}
            onPress={() => navigate('ADD')}>
            <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
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
