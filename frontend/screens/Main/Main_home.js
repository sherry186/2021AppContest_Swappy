import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView, 
  Text, 
  SafeAreaView,  
  FlatList, 
  StyleSheet, 
  Image,
  useWindowDimensions,
  TouchableOpacity
 } from "react-native";
import { SearchBar } from 'react-native-elements';
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)
import  { useNavigation } from '@react-navigation/core';
import SocialItems from '../../Data/SocialItems';
import { TextInput } from 'react-native';
import colors from '../../config/colors';

import { useQuery, useMutation,  gql } from '@apollo/client';

const RENDER_POST = gql`
  query getPosts {
    getPosts {
    title
    description
    id
    author{
      username
    }
  }
}`;

const ADD_TO_COLLECTION = gql`
mutation addToCollection($postId: ID!){
  addToCollection(postId: $postId)
}`;

const REMOVE_FROM_COLLECTION = gql`
mutation removeFromCollection($postId: ID!){
  removeFromCollection(postId: $postId)
}`;


const contains = (data1, data2, data3, query) => {
  let formatData1 = data1? data1.toLowerCase(): null;
  let formatData2 = data2.toLowerCase();
  let formatData3 = data3.toLowerCase();

  let formatQuery = query.toLowerCase();

  if(formatData1) {
    if (formatData1.includes(formatQuery) || formatData2.includes(formatQuery) || formatData3.includes(formatQuery)) {
      return true;
    }
  }
  else{
    if (formatData2.includes(formatQuery) || formatData3.includes(formatQuery)) {
      return true;
    }
  }
  return false;
}



const Main_HOME = () => {

  
  const [search, setSearch] = useState('');
  const [data1, setData1] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [selected, setSelected] = useState(new Map());
  const navigation = useNavigation();
 
  const windowHeight = useWindowDimensions().height;

  const { data, error, loading } = useQuery(RENDER_POST, {pollInterval: 500});
  const [addToCollection] = useMutation(ADD_TO_COLLECTION);
  const [removeFromCollection] = useMutation(REMOVE_FROM_COLLECTION);


  const handleSearch = (se) => {
    console.log("search", search)
    const searchedItems = _.filter(data.getPosts, post => {
      return contains(post.author?.username, post.title, post.description, se)
    })
    setSearch(se);
    setData1(searchedItems);
    console.log(data1);
    //this.setState({data,  se});
  };

  const handleCollected = (collected, id) =>{
    if(collected) {
      addToCollection(id);
    } else {
      removeFromCollection(id);
    }
    
  };

  const renderChat = ({ item }) => {
    let collected = false;
    return (
    <View style={styles.ChatC}>
        <TouchableOpacity style = {styles.Chat} onPress={() => navigation.navigate('MainDetail', {title: item.title, person: item.author, post: item.description, comment: item.comments, hideName: item.hideUser})}>
          <Text style={styles.post}>{item.title}</Text>
          <Text style={styles.person}>{item.author == null? "匿名" : item.author.username}</Text>
          <Text style={styles.person}>{item.description}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: 10, height: 20, position: 'absolute', top: 0, right: 20, backgroundColor: 'transparent'} }
                          onPress={()=>{collected = !collected; handleCollected(collected, item.id)}}>
          <Image
            style ={{width:10, height: 20, tintColor: collected? colors.warning_80: colors.brown_40}}
            source={require('../../assets/Social/collect.png')}/>
        </TouchableOpacity>
    </View>
      
          
  )};

  // useEffect(() => {
  //   const posts = SocialItems
  //   let arr = posts.map((item, index)=>{
  //     item.collected = false
  //     return {...item}
  //   })

  //   setData(arr);
  //   setFullData(SocialItems);
  //   // this.setState({
  //   //   data: arr,
  //   //   fullData: SocialItems,
  //   // });
  // }, []);
  
  

  return(
    <SafeAreaView 
      style={{
        minHeight: Math.round(windowHeight),
        flex: 1,
        height: "60%",
        alignItems: "center",
        //justifyContent: 'center',
        backgroundColor: colors.mono_40,
        bottom: 68,
        }}>

      <View style = {styles.margin}></View>

      <View style = {{top: "15%", height: "10%", width: "90%", flexDirection:'row'}}>
        <View style = {{flex : 5, alignItems: 'center', justifyContent: 'center'}}>
          <SearchBar
            containerStyle = {{ height: "80%", alignItems: 'center', backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
            inputContainerStyle = {{height: 28, width: 264, borderRadius: 7, backgroundColor: colors.mono_60}}
            inputStyle= {{margin: 0, fontSize: 15}}
            placeholder="標題、內容、發文者"
            onChangeText={handleSearch}
            value={search}
          />
        </View>
      </View>

      <ScrollView style = {{top: "5%", alignContent: 'center'}}>
        <View>
          {data ? (<FlatList
            data={search == ''? data.getPosts: data1}
            renderItem={renderChat}
            keyExtractor={item => item.id}
          />

          ) : <Text>loading...</Text>

          }
        </View>
        <View style = {{height: 78,backgroundColor: colors.mono_40,}}></View>
      </ScrollView>


      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('MainAdd')}>
        <Image
            style = {styles.button}
            source = {require("../../assets/Social/add.png")}/>
      </TouchableOpacity>
      
      
    </SafeAreaView>
        

      
    )
  

}

export default Main_HOME;

const styles = StyleSheet.create({
    margin: {
      position: 'relative',
      height: "10%",
      backgroundColor: colors.mono_40,
    },
    Chat: { 
        backgroundColor: 'transparent',
        marginVertical: 8,
        marginHorizontal: 16,
      },
    ChatC: {
      marginTop: 30,
      height: 99,
      width: 352,
      backgroundColor: colors.mono_40,
      //left: 30,
      //alignItems: 'center',
      justifyContent: 'center',
      bottom: 10,
      
      shadowColor: colors.mono_100,
      shadowOffset: { width: 10, height: 10 },
      shadowOpacity: 0.5,
      shadowRadius: 0,
      elevation: 3,
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
      width: 65,
      height: 65,
      position: 'absolute',
      borderRadius: 31.5,
      backgroundColor: 'transparent',
      bottom: "10%",
      //right: 169,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 10,
      fontWeight: 'bold',
    },
  });