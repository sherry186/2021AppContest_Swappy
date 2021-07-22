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

  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const navigation = useNavigation();
 
  const windowHeight = useWindowDimensions().height;

  const handleSearch = (se) => {
    console.log("search", search)
    const searchedItems = _.filter(fullData, post => {
      return contains(post.person, post.title, post.post, se)
    })
    setSearch(se);
    setData(searchedItems);
    //this.setState({data,  se});
  };

  const handleCollected = (id) =>{
    //const {data} = this.state;
    let arr = data.map((item, index)=>{
      if(id == index){
        item.collected = !item.collected;
      }
      return {...item}
    })
    console.log("selection handler1 ==>", arr)
    setData(arr)
  };

  const renderChat = ({ item }) => (
    //console.log(this.props.navigation);
    <View style={styles.ChatC}>
        <TouchableOpacity style = {styles.Chat} onPress={() => navigation.navigate('MainDetail', {title: item.title, person: item.person, post: item.post, comment: item.comment, hideName: item.hideName})}>
          <Text style={styles.post}>{item.title}</Text>
          <Text style={styles.person}>{item.hideName? "匿名" : item.person}</Text>
          <Text style={styles.person}>{item.post}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: 10, height: 20, position: 'absolute', top: 0, right: 20, backgroundColor: 'transparent'} }
                          onPress={()=>handleCollected(item.id)}>
          <Image
            style ={{width:10, height: 20, tintColor: item.collected? colors.warning_80: colors.brown_40}}
            source={require('../../assets/Social/collect.png')}/>
        </TouchableOpacity>
    </View>
      
          
  );

  useEffect(() => {
    const posts = SocialItems
    let arr = posts.map((item, index)=>{
      item.collected = false
      return {...item}
    })

    setData(arr);
    setFullData(SocialItems);
    // this.setState({
    //   data: arr,
    //   fullData: SocialItems,
    // });
  }, []);
  
  

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
            data={data}
            renderItem={renderChat}
            keyExtractor={item => item.id}
          />

          ) : <Text>Loading</Text>

          }
        </View>
        <View style = {{height: 78,backgroundColor: colors.mono_40,}}></View>
      </ScrollView>


      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigate('MainAdd')}>
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