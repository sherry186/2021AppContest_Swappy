import React, { useState, useEffect } from 'react';
import {View,ScrollView, Text, SafeAreaView,  FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SearchBar } from 'react-native-elements';
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)

import SocialItems from '../../Data/SocialItems';
import { TextInput } from 'react-native';



const contains = (data1, data2, data3, query) => {
  let formatData1 = data1.toLowerCase();
  let formatData2 = data2.toLowerCase();
  let formatData3 = data3.toLowerCase();

  let formatQuery = query.toLowerCase();

  if (formatData1.includes(formatQuery) || formatData2.includes(formatQuery) || formatData3.includes(formatQuery)) {
    return true;
  }
  return false;
}



const Main_HOME = () => {

  // state = {
  //   search: '',
  //   data: [],
  //   fullData: [],
  // };
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);

 

  const handleSearch = (se) => {
    console.log("search", search)
    const data = _.filter(fullData, post => {
      return contains(post.person, post.title, post.post, se)
    })
    this.setState({ data,  se});
  };

  handleCollected = (id) =>{
    const {data} = this.state;
    let arr = data.map((item, index)=>{
      if(id == index){
        item.collected = !item.collected;
      }
      return {...item}
    })
    console.log("selection handler1 ==>", arr)
    this.setState({data: arr})
  };

  renderChat = ({ item }) => (
    //console.log(this.props.navigation);
    <View style={styles.ChatC}>
        <TouchableOpacity style = {styles.Chat} onPress={() => this.props.navigation.navigate('MainDetail', {title: item.title, person: item.person, post: item.post, comment: item.comment, hideName: item.hideName})}>
          <Text style={styles.post}>{item.title}</Text>
          <Text style={styles.person}>{item.hideName? "匿名" : item.person}</Text>
          <Text style={styles.person}>{item.post}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={item.collected?{width: 70, height: 30, position:'absolute', right: 20, top: 20, backgroundColor: '#ee6e73'} : {width: 70, height: 30, position:'absolute', right: 20, top: 20}}
                          onPress={()=>this.handleCollected(item.id)}>
          <Text>{item.collected? "uncollect": "collect"}</Text>
        </TouchableOpacity>
    </View>
      
          
  );

  componentDidMount() {
    const posts = SocialItems
    let arr = posts.map((item, index)=>{
      item.collected = false
      return {...item}
    })

    this.setState({
      data: arr,
      fullData: SocialItems,
    });
  }
  

  render() {
    const { search } = this.state;
    // const[grvalue, grsetValue] = useState('');
    const{ navigate } = this.props.navigation;
    //console.log(this.props.navigation);

    return(
      <View style={styles.container}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.handleSearch}
          value={search}
          lightTheme
        />
        <FlatList
          data={this.state.data}
          renderItem={this.renderChat}
          keyExtractor={item => item.id}
        />
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigate('MainAdd')}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
        
      
      </View>

        

      
    )
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center'
    },
    Chat: {
        
        backgroundColor: '#f9c2ff',
        
        marginVertical: 8,
        marginHorizontal: 16,
      },
    ChatC: {
        flexDirection: 'row',
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