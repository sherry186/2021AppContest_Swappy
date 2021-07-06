import { styleSheets } from 'min-document';
import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    View, 
    TextInput,
    TouchableOpacity,
    FlatList,
    ScrollView} from 'react-native';
//import GroupItems from '../../Data/GroupItems';


export default class GroupDetailsScreen extends React.Component {

  

  handleback =() =>{
        
    this.props.navigation.goBack()
  } 

  renderItem = ({ item }) => (
    //console.log(this.props.navigation);
    <TouchableOpacity 
      style={styles.tag}>      
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
  

  renderPost = ({ item }) => (
    <TouchableOpacity 
      style={styles.item}>      
      <Text style={styles.title}>{item.dis}</Text>
      <TouchableOpacity>
        <Text style={styles.title}>{this.props.route.params.items[item.tag].name}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  render() {
    const{ navigate } = this.props.navigation;
    const { title, items, post } = this.props.route.params

    return(
      <ScrollView style={styles.container}>
          <Text>{title}</Text>
          
          <View style= {{flex:1, flexDirection: 'row'}}>
           <FlatList
              data={items}
              renderItem={this.renderItem}
              keyExtractor={item => item.ID}
            />
          </View>

          <View style= {{flex:1, flexDirection: 'row'}}>
           <FlatList
              data={post}
              renderItem={this.renderPost}
              keyExtractor={item => item.ID}
            />
          </View>
          
          <TouchableOpacity
            title = 'add'
            onPress={() => {this.props.navigation.navigate('GroupAddItem')}}
            style = {styles.item}>
            <Text
              style = {styles.buttonText}>add</Text>
          </TouchableOpacity>

          <TouchableOpacity
            title = 'back'
            onPress={this.handleback}
            style = {styles.item}>
            <Text
              style = {styles.buttonText}>back</Text>
            </TouchableOpacity>
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
    paddingTop: 23
  },
  tag:{
    flex:1,
    flexDirection:'row',
    margin:5,
    backgroundColor: '#f9c2ff',
    width: 40,
    height: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 7,
  },
  buttonText: {
    //color: '#fff',
    fontSize: 20,
    left: 10,
    fontWeight: 'bold',
  },
});