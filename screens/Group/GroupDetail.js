import * as React from 'react';

import { ScrollView, View, Text, Button, TouchableOpacity, StyleSheet, FlatList } from "react-native";


function handleTag({item}){
  <TouchableOpacity 
      style={styles.item}
      //onPress={() => this.props.navigation.navigate('GroupDetail', {title: item.title, data: item.items })}>
      >
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
}

function GroupDetailsScreen({ route, navigation }) {
    /* 2. Get the param */
    const {title, data } = route.params;
    return (
      <ScrollView style={{ flex: 1 }}>
        <Text>{title}</Text>

        <View>
          <FlatList
            data={data}
            renderItem={handleTag}
            keyExtractor={item=>item.ID}
          />
        </View>
        
      </ScrollView>
    );
  }

export default GroupDetailsScreen;



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
  text:
  {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  }
});