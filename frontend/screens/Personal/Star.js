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
       StyleSheet, 
       Dimensions} from "react-native";
import { useNavigation } from '@react-navigation/core';
import colors from '../../config/colors';
//import Notification_requesting from './Notification_requesting';

let ScreenWidth = Dimensions.get("window").width;
let ScreenHeight = Dimensions.get("window").height;
/* 2. Get the param */
function Star ({ route, navigation }) {

  
  // render(){  
    //const { id, mythingTitle, mythingImage, requestForTitle, requestForTag, requestForImage, status, statusToMe} = route.params;


    
    return (
     
        <View style = {{flex: 1, alignItems: 'center'}}>    
            <View style = {{flex:1}}>
                <Image
                    style ={{height:ScreenWidth*0.1, width: ScreenWidth*0.1}}
                    source = {require("../../assets/personal/禮物.png")}/>
            </View>   
            
            {/* <View style ={{flexDirection:'row'}}>
                <View style = {{flex:1}}></View>
                <View style = {styles.itemBox}>
                    <Image
                        style = {styles.image}
                        source = {}/>
                </View>
                <View style = {styles.itemBox}>
                    <Image
                        style = {styles.image}/>
                </View>
                <View style = {{flex:1}}></View>
            </View> */}
               
            
        </View>
        
    
    );
  // }

}

export default Star;

const styles = StyleSheet.create({
    itemBox: {
        flex: 5,
        alignItems:'center'
    },
    image:{
        width: ScreenWidth*0.4,
        height: ScreenWidth*0.4,
    }
});