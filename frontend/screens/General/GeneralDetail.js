import React, {useEffect, useState} from 'react';
import * as SQLite from 'expo-sqlite';
const database = SQLite.openDatabase('db.SwappyDataBase'); // returns Database object


import { View,
       Text,
       Button, 
       Image, 
       FlatList, 
       SafeAreaView, 
       ScrollView, 
       TouchableOpacity,
       StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/core';
import colors from '../../config/colors';


/* 2. Get the param */
function GeneralDetailsScreen ({ route, navigation }) {

    
  const renderImage = ({ item }) => (
    <SafeAreaView style = {{flex:1, flexDirection: 'row'}}>
      <Image 
      style={{flexDirection: 'row', width: 60, height: 60,  }}
      source={item.source}/>
    </SafeAreaView> 
  );

  const handleRequest = ({item}) =>(
    <SafeAreaView style = {{flex:1, flexDirection: 'row'}}>
      <Image 
      style={{flexDirection: 'row', width: 60, height: 60,  }}
      source={item.source}/>
    </SafeAreaView> 
  );// 理論上應該是一個Navigation，還要再改
  
  // render(){  
    const { itemID, title, sort, des, method, image } = route.params;
    
    return (
      <View style={{ flex: 1, top: "5%", alignItems: 'center'}}>
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
              <Text style = {{right: "15%", fontSize: 20, color: colors.function_100}}>{title}</Text>
          </View>
        </View>
        
        <View style = {{flex: 10, backgroundColor: colors.mono_40, width: "100%", alignItems: 'center' }}>
            <Image
              style = {{flex: 5, height: "50%", width: "80%"}}
              source = {require('../../assets/general/商品呈現.png')}
            />
            <View style = {{flex: 0.5, backgroundColor: colors.function_100, width:"100%", flexDirection: 'row', borderEndColor: colors.mono_80, borderEndWidth: 2,}}>
              <TouchableOpacity
                style = {{width: "20%", backgroundColor: colors.mono_40, alignItems: 'center', justifyContent:'center'}}
                >
                {/* <Image
                  style ={{height:"50%", width: "50"}}
                  source = {require("../../assets/general/heartEmpty.png")}/> */}
              </TouchableOpacity>
            </View>
            
            <View style = {{flex: 4.5}}>
              <Text>Item Name: {title}</Text>
              <Text>category: {sort}</Text>
              <Text>description: {des}</Text>

              <Text>method: {method == 1 || method == 3? 'face to face' : ''}{method == 2 || method == 3? 'post' : ''}</Text>
              <TouchableOpacity
                    //onPress={()=>this.handleRequest()}
                    title = 'request'

                    style = {styles.item}>
                    <Text style = {styles.buttonText}>request</Text> 
                  </TouchableOpacity>
            </View>
            
        </View>
        
      </View>
    );
  // }

}

export default GeneralDetailsScreen;

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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemS: {
    backgroundColor: '#7a42f4',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  buttonText: {
    //color: '#fff',
    fontSize: 15,
    left: 5,
    fontWeight: 'bold',
  },
});