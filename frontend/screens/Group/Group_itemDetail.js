import React, {useEffect, useState} from 'react';
import * as SQLite from 'expo-sqlite';
const database = SQLite.openDatabase('db.SwappyDataBase'); // returns Database object
//import { useNavigation } from '@react-navigation/core';

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
function Group_itemDetail ({route, navigation}) {
  
  // constructor(props) {
  //   super(props);
  //   this.state = { Gname: '', Tags: '', };
  // }
  const naviagation = useNavigation();
  const { dis, method, tagname, image} = route.params;
  const [Gname, setGname] = useState('');
  const [Tags, setTags] = useState('');

 

  const handleRequest = () =>{
    naviagation.navigate('Notification',{ screen: 'requesting' });
  };// 理論上應該是一個Navigation，還要再改
  
  // render(){  
    
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
              {/* <Text style = {{right: "15%", fontSize: 20, color: colors.function_100}}></Text> */}
          </View>
        </View>
        
        <View style = {{flex: 10, backgroundColor: colors.mono_40, width: "100%", alignItems: 'center' }}>
            <Image
              style = {{flex: 5, height: "50%", width: "80%", marginBottom: 10}}
              source = {image? {uri: `http://swappy.ngrok.io/images/${image}`} : require('../../assets/general/商品呈現.png')}
            />
           
            <View style = {styles.line}></View>
            
            <View style = {{flex: 4.4, width: "100%"}}>
              <View style = {{flex: 0.5,flexDirection: 'row'}}></View>
              <View style = {{flex: 1,flexDirection: 'row'}}>
                <View style = {styles.margin}></View>
                <Text style = {styles.textT}>交付方式 </Text>
                <Text>{method == "BOTH"? "面交、寄送":null}{method == "FACETOFACE"? "面交": null}{method == "BYPOST"? "寄送": null}</Text>
              </View>
              
              <View style = {{flex: 1, flexDirection: 'row'}}>
                <View style = {styles.margin}></View>
                <Text style = {styles.textT}>物品品項 </Text>
                <Text>{tagname}</Text>
              </View>
              <View style = {{flex:1, flexDirection: 'row'}}>
                <View style = {styles.margin}></View>
                <Text style = {styles.textT}>物品說明 </Text> 
              </View>
              
              <View style = {{flex:7, flexDirection: 'row', height: "10%"}}>
                <View style = {styles.margin}></View>
                <ScrollView style = {styles.desContainer}>
                  <Text>{dis}</Text>
                </ScrollView>
                <View style = {styles.margin}></View>
              </View>

              <View style = {{flex: 3,}}></View>

              <View style = {styles.buttonsC}>
                  <TouchableOpacity 
                      style={styles.buttons}
                      onPress={handleRequest}
                      >
                      <Image
                        source = {require('../../assets/general/request.png')}/>
                  </TouchableOpacity>
              </View>
                           
            </View>
            
        </View>
        
      </View>
    );


}
export default Group_itemDetail;

const styles = StyleSheet.create({
  buttonsC:{
    width: "100%",
    position: 'absolute',
    bottom: "30%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  buttonText:{
    color: colors.mono_40,
    fontSize: 15,
    fontWeight: 'bold',
  },
  buttons: {
    width: "25%",
    height: 42,
    borderRadius: 8,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  button:{
    width: "10%", 
    backgroundColor: 'transparent', 
    alignItems: 'center', 
    justifyContent:'center'},
  line:{
    height: 2,
    backgroundColor: colors.mono_60,
    width: "82%",
  },
  buttonImage :{
    width: 23, 
    height:20.97, 
    backgroundColor:'transparent'},
  textT:{
    color: colors.function_100,
  },
  margin: { 
    width: "10%", 
    backgroundColor: 'transparent', 
    alignItems: 'center', 
    justifyContent:'center'
  },
  desContainer: {
    width: "80%", 
    borderColor: colors.mono_60, 
    borderWidth: 2
  },
  

});