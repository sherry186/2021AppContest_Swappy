import React, { useState, useEffect }  from 'react';
import {Platform, KeyboardAvoidingView, useWindowDimensions, ScrollView, TextInput, View, Text, SafeAreaView,  FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)
import BreakAwaySpace from '../../Data/BreakAwaySpace';
import { Picker } from '@react-native-picker/picker';
import { createMyHesitatingItemsTable, createHesitateItem } from '../../localStorageApi/api';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/core';
import { Dimensions } from 'react-native';
import colors from '../../config/colors';

let ScreenWidth = Dimensions.get("window").width;

export default function BreakAwayHesitate () {

  const [data, setData] = useState([]);
  const [Limit, setLimit] = useState('');
  const [image, setImage] = useState([]);

  // const [image1, setImage1] = useState(null);
  // const [image2, setImage2] = useState(null);
  // const [image3, setImage3] = useState(null);
  // const [image4, setImage4] = useState(null);
  // const [image5, setImage5] = useState(null);

  const [story, setStory] = useState('');
  const [title, setTitle] = useState('');
  const [space, setSpace] = useState('');

  const windowHeight = useWindowDimensions().height;
  const navigation = useNavigation();

  // static navigationOptions = {
  //   title: 'BreakAway_Hesitate',
  // }

  const handlesubmit = () =>{
    createMyHesitatingItemsTable();
    //createHesitateItem = (title, story, image, reminderDate, space)
    createHesitateItem()
    navigation.goBack()
  }


  const renderImage = ({ item }) => (
    <SafeAreaView style = {styles.imageContainer}>
      <Image 
        style={styles.image}
        source={{uri: item.uri}}/>
    </SafeAreaView> 
  );

  
  const onValueChange = (flag,value) => {
    setSpace(value)
  };

  const pickImage = async () => {
    if(image.length < 5)
    {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        
        setImage([...image, {id: image.length, uri: result.uri}]);
      }
    }
    else
    {
      alert("最多只能5張照片喔qq")
    }
    
  };  

  useEffect(() => {
    // this.setState({
    //   data: BreakAwaySpace,
    // });
    setData(BreakAwaySpace);
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    
  },[]);

  return(
    // minHeight: Math.round(windowHeight)
     <View style={{flex:1, flexDirection: 'column',  }}>
       {/* <KeyboardAvoidingView style={{flex:0.3}}></KeyboardAvoidingView> */}
       <KeyboardAvoidingView style={{height: windowHeight *0.15 ,flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <View style = {styles.flatListContainer}>
              <FlatList
                data={image}
                renderItem={renderImage}
                horizontal = {true}
              />
          </View> 

          <View style = {styles.buttonAdd}>
          <TouchableOpacity 
              style={styles.buttonAddContainer}
              onPress={pickImage}
              >
              <Image
                style = {{height:ScreenWidth*0.05, width: ScreenWidth*0.05}}
                source={require("../../assets/breakAway/add.png")}/>
          </TouchableOpacity>
          </View>
           
       </KeyboardAvoidingView>

       <KeyboardAvoidingView style = {styles.line}></KeyboardAvoidingView>

       <ScrollView >
          <View style ={styles.textContainer}>
              <Text style = {styles.text}>物品標題</Text>
          </View>
          
          <View style ={styles.textInputContainer}>
              <TextInput
                  style={styles.input}
                  //placeholder='100'
                  onChangeText={setTitle}
                  value = {title}/>
          </View>
          

          <View style ={styles.textContainer}>
              <Text style={styles.text}>猶豫上限時間</Text>
          </View>
          
          <View style ={styles.textInputContainer}>
              <TextInput
                  style={styles.input2}
                  //placeholder='100'
                  onChangeText={setLimit}
                  value = {Limit}/>
          </View>

          <View style ={styles.textContainer}>
            <Text style={styles.text}>物品位置</Text> 
          </View>
           
          <View style ={styles.textInputContainer}>
            <Picker
              mode={'dropdown'}
              style={styles.input3}
              selectedValue={space}
              onValueChange={(value)=>onValueChange(2 ,value)}>
              {
                data.map((item, index)=>{
                  return(
                    <Picker.Item label= {item.title} value= {item.id} />
                  );
                })
              }
            </Picker>
          </View>
          
          
          <Text style={styles.text}>屬於他們的故事</Text>
          <TextInput
              style={styles.inputStory}
              //placeholder='100'
              multiline = {true}
              onChangeText={setStory}
              value = {story}/>
          
          <View style = {styles.uploadContainer}>
              <TouchableOpacity
                  title = 'Submit'
                  onPress={handlesubmit}
                  style = {styles.item}>
                  <Image
                    style = {{height: 70, width:70,}} 
                    source = {require('../../assets/breakAway/upload.png')}/>
              </TouchableOpacity>
          </View>
          
       </ScrollView>

     </View>
       
      
   )
  

}

const styles = StyleSheet.create({
    item: {
      height:70,
      width:70,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    title: {
      fontSize: 32,
    },
    image:{
      width: ScreenWidth*0.2, 
      height: ScreenWidth*0.2,  
    },
    imageContainer:{
      flex:1, 
      left: 10, 
      margin : 10, 
      justifyContent:'center', 
      alignItems:'center', 
      flexDirection: 'row'
    },
    flatListContainer:{
      flex:4, 
      backgroundColor: "transparent",
      justifyContent: 'center',
      alignItems:'center',      
    },
    buttonAdd: {
      flex: 1.2,
      height: "100%",
      backgroundColor: "transparent",
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonAddContainer: {
      borderColor: colors.mono_80,
      borderWidth: 1,
      width: ScreenWidth*0.2,
      height: ScreenWidth*0.2,
      backgroundColor: "transparent",
      alignItems: 'center',
      justifyContent: 'center',
    },
    line: {
      height: 1,
      backgroundColor: colors.function_100,
      width: "90%",
      alignSelf:"center",
    },
    textContainer:{
      flex:1,
      justifyContent:'center',
      backgroundColor:'transparent',      
    },
    textInputContainer:{
      flex:1,
      justifyContent:'center',
      height:"100%",
      backgroundColor:"transparent",      
    },
    uploadContainer:{
      flex:1,
      justifyContent:'center',
      height:"100%",
      backgroundColor:"transparent",  
      alignItems:'center',
      justifyContent:'center',    
    },
    text:{
      margin: "5%",
      color: colors.mono_80,
      fontWeight: "bold",
    },
    input: {
      flex: 1,
      marginHorizontal:"5%",
      height: 40,
      borderColor: colors.mono_80,
      borderWidth: 1
    },
    input2: {
      flex: 1,
      marginLeft:"5%",
      width: "25%",
      height: 40,
      borderColor: colors.mono_80,
      borderWidth: 1
    },
    input3: {
      flex: 1,
      marginLeft:"5%",
      width: "40%",
      height: 40,
      borderColor: colors.mono_80,
      borderWidth: 1
    },
    inputStory:{
      flex:3,
      margin: "5%",
      height: 150,
      borderColor: colors.mono_80,
      borderWidth: 1,
    },
  });