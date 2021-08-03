import { styleSheets } from 'min-document';
import React from 'react';
import { useEffect, useState } from 'react';

import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity, 
    TextInput,
    Alert,
    Platform,
    useWindowDimensions,
    FlatList,
    SafeAreaView,
    Image,
    Dimensions,
    ScrollView, 
    KeyboardAvoidingView,
    } from 'react-native';
import RecordData from '../../Data/RecordData';
// import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
// import * as ImagePicker from 'expo-image-picker';
// import * as SQLite from "expo-sqlite";
import colors from '../../config/colors';


import { useQuery, gql } from '@apollo/client';

let ScreenWidth = Dimensions.get("window").width;
let ScreenHeight = Dimensions.get("window").height;


const QUERY_MY_REQUESTS = gql`
query getMySuccessfulRequests {
  getMySuccessfulRequestingRequests {
    id
    requestedItem {
      title
      image
      category
    }
  } getMySuccessfulInvitationRequests {
    id
    requestersItem {
      title
      image
      category
    }
  }
}`;


const Record = () => {

  const navigation = useNavigation();
  const { data, error, loading } = useQuery(QUERY_MY_REQUESTS, {pollInterval: 500});
  console.log(data);
  const handleNavigation = (item) => {
    console.log(item);
    
    if (item.status == 2){
      if (item.statusToMe == 1){
        navigation.navigate('Star', {mythingImage: item.mythingImage, requestForImage: item.requestForImage, requestForTitle: item.requestForTitle});
      }
      else{
        navigation.navigate('Complete',{requestForImage: item.requestForImage, requestForTitle: item.requestForTitle});
      }
    }
    else{
      navigation.navigate('RecordDetail', {
        id: item.id,
        mythingTitle: item.mythingTitle, 
        mythingImage: item.mythingImage, 
        requestForTitle: item.requestForTitle, 
        requestForTag: item.requestForTag, 
        requestForImage: item.requestForImage, 
        status: item.status, 
        statusToMe: item.statusToMe})
    }
  }

  const renderRequestingItem = ({ item }) => (
    //console.log(this.props.navigation);
    <SafeAreaView style={styles.boxContainer}>
      <View style={styles.buttons}>
        <TouchableOpacity 
          style={styles.item}
          onPress={() => handleNavigation(item)}
          >
            <Image
              source =  {item.requestedItem.image? {uri: `http://swappy.ngrok.io/images/${item.requestedItem.image}`} : require('../../assets/general/商品呈現.png')}
              style ={{height: ScreenHeight*0.13, width: ScreenHeight*0.13,}}/>
            
            <View style = {{marginLeft: 16}}>
                <Text style={styles.title}>{item.requestedItem.title}</Text>
                <Text style = {{marginTop: "5%", color: colors.function_100}}>#{item.requestedItem.category}</Text>
            </View>   
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );  

  const renderInvitationItem = ({ item }) => (
    //console.log(this.props.navigation);
    <SafeAreaView style={styles.boxContainer}>
      <View style={styles.buttons}>
        <TouchableOpacity 
          style={styles.item}
          onPress={() => handleNavigation(item)}
          >
            <Image
              source =  {item.requestersItem.image? {uri: `http://swappy.ngrok.io/images/${item.requestersItem.image}`} : require('../../assets/general/商品呈現.png')}
              style ={{height: ScreenHeight*0.13, width: ScreenHeight*0.13,}}/>
            
            <View style = {{marginLeft: 16}}>
                <Text style={styles.title}>{item.requestersItem.title}</Text>
                <Text style = {{marginTop: "5%", color: colors.function_100}}>#{item.requestersItem.category}</Text>
            </View>   
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  ); 

    return (
      <View style={{ flex: 1, top: "5%", bottom:"20%", alignItems: 'center'}}>
        
          <View style = {{flex: 1, flexDirection: 'row', height: "7%", backgroundColor: colors.mono_40}}>
            <TouchableOpacity
              style = {{flex:2, width: "20%", backgroundColor: colors.mono_40, alignItems: 'center', justifyContent:'center'}}
              onPress = {()=>navigation.goBack()}
              >
              <Image 
                style = {{height: "25%", width: "25%"}}
                source = {require('../../assets/manyneed/xmark.png')}/>
            </TouchableOpacity>

            <View
              style ={{flex: 8, justifyContent: 'center', alignItems: 'center'}}>
                <Text style = {{right: "15%", fontWeight:'bold', fontSize: 20, color: colors.mono_100}}>所有訂單</Text>
            </View>
          </View>

          <View style = {{flex: 10, backgroundColor: colors.mono_40, width: "100%", alignItems: 'center' }}>
            {data ? (
              <>
              <FlatList
              style = {{marginBottom:60}}
              data = {data.getMySuccessfulInvitationRequests}
              renderItem = {renderInvitationItem}/>
              <FlatList
              style = {{marginBottom:60}}
              data = {data.getMySuccessfulRequestingRequests}
              renderItem = {renderRequestingItem}/>
              </>
            ) : <Text>loading ...</Text>}
            
            
          </View>
      </View>
    )
    


}

export default Record;

const styles = StyleSheet.create({
  item: {
    flexDirection:'row',
    backgroundColor: 'transparent',
    //padding: 20,
    height: "100%",
    //marginVertical: 8,
    //marginHorizontal: 16,
  },
  title: {
    fontSize: 33,
  },
  boxContainer: {
    marginTop: ScreenHeight*0.03,
    height: ScreenHeight*0.13,
    width: ScreenWidth*0.85,
    backgroundColor: colors.mono_40,
    //left: 30,
    //alignItems: 'center',
    justifyContent: 'center',
    bottom: ScreenHeight*0.03,
    borderColor: colors.mono_60,
    borderWidth: 1,
    
    // shadowColor: colors.mono_100,
    // shadowOffset: { width: 10, height: 10 },
    // shadowOpacity: 0.5,
    // shadowRadius: 0,
    // elevation: 3,
  },
  buttons: {
    //flexDirection: 'row'
    flex:1,
    backgroundColor: 'transparent',
  },

})
