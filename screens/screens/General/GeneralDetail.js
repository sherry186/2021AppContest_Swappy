import * as React from 'react';

import { View, Text, Button, Image, FlatList, SafeAreaView, ScrollView } from "react-native";


/* 2. Get the param */
export default class GeneralDetailsScreen extends React.Component {
    
  renderImage = ({ item }) => (
    <SafeAreaView style = {{flex:1, flexDirection: 'row'}}>
      <Image 
      style={{flexDirection: 'row', width: 60, height: 60,  }}
      source={item.source}/>
    </SafeAreaView> 
  );
  
  render(){  
    const { itemID, title, sort, des, method, image } = this.props.route.params;
    return (
      <ScrollView style={{ flex: 1}}>
        <Text>Details Screen</Text>
        <Text>Item Name: {title}</Text>
        <Text>sort: {sort}</Text>
        <Text>des: {des}</Text>
        <FlatList
              data={image}
              renderItem={this.renderImage}
              horizontal = {true}
              keyExtractor={item => item.id}
          />
        <Text>method: {method.faceToface? 'face to face' : ''}{method.post? 'post' : ''}</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </ScrollView>
    );
  }

}