import React, { useState, useEffect }  from 'react';
import {Platform, KeyboardAvoidingView, useWindowDimensions, ScrollView, TextInput, View, Text, SafeAreaView,  FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)
import BreakAwaySpace from '../../Data/BreakAwaySpace';
import { Picker } from '@react-native-picker/picker';
import { createMyHesitatingItemsTable, createHesitateItem, updateProgress } from '../../localStorageApi/api';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/core';
import { Dimensions } from 'react-native';
import colors from '../../config/colors';
import * as SQLite from 'expo-sqlite'
const database = SQLite.openDatabase('db.SwappyDataBase'); // returns Database object


const DUMMY_IMAGE = 'https://iwfstaff.com.au/wp-content/uploads/2017/12/placeholder-image.png';

import { format } from 'fecha';

let ScreenWidth = Dimensions.get("window").width;

export default function BreakAwayHesitate () {

  const [data, setData] = useState([]);
  const [Limit, setLimit] = useState(0);
  const [image, setImage] = useState([]);

  const [story, setStory] = useState('');
  const [title, setTitle] = useState('');
  const [space, setSpace] = useState(0);

  const windowHeight = useWindowDimensions().height;
  const navigation = useNavigation();

  // static navigationOptions = {
  //   title: 'BreakAway_Hesitate',
  // }

  const getDate = () => {
    //add date function
    function addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    var date = new Date();
    date = addDays(date, parseInt(Limit));

    //convert date to sql datatype
    date = format(date, 'isoDate'); // '2015-11-20'

    return date;
  }

  const handlesubmit = () =>{
    console.log(image);
    const reminderDate = getDate();
    if(image.length == 0) {
      createHesitateItem(title, story, DUMMY_IMAGE, reminderDate, space);
    } else {
      for (let i = 0; i < image.length; i++) {
        console.log(typeof(image[i].uri));
        createHesitateItem(title, story, image[i].uri, reminderDate, space);
      }
    }

    // const JSONimage = JSON.stringify(image);
    // //console.log(JSONimage);
    // const reminderDate = getDate();
    // createHesitateItem(title, story, JSONimage, reminderDate, space);

    const addToHesitatePoints = 2.0
    updateProgress(space, addToHesitatePoints);
    navigation.goBack();
  }


  const renderImage = ({ item }) => (
    <SafeAreaView style = {styles.imageContainer}>
      <Image 
        style={styles.image}
        source={{uri: item.uri}}/>
    </SafeAreaView> 
  );

  
  // const onValueChange = (flag,value) => {
  //   console.log(value);
  //   //setSpace(value);
  //   //console.log(space);
  // };

  const pickImage = async () => {
    if(image.length < 5)
    {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      });
  
      //console.log(result);
  
      if (!result.cancelled) {
        
        setImage([...image, {id: image.length, uri: result.uri}]);
      }
    }
    else
    {
      alert("最多只能5張照片喔qq")
    }
    
  }; 
  
  useEffect(()=> {
    createMyHesitatingItemsTable();
  }, [])

  useEffect(() => {
    // this.setState({
    //   data: BreakAwaySpace,
    // });
      database.transaction(tx => {
          tx.executeSql('SELECT * FROM MySpaces', 
          null,
          (txObj, resultSet) => {
              //console.log('Success', resultSet);
              let spacesData = resultSet.rows._array;
              setData(spacesData);
              //console.log(data);
      },
          (txObj, error) => console.log('Error', error))
      });

    //setData(BreakAwaySpace);
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    
  },[data]);

  return(
    // minHeight: Math.round(windowHeight)
     <View style={{flex:1, flexDirection: 'column',  }}>
       {/* <KeyboardAvoidingView style={{flex:0.3}}></KeyboardAvoidingView> */}
       <KeyboardAvoidingView style={{height: windowHeight *0.15 ,flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <ScrollView 
              style = {{height: "100%" }}
              contentContainerStyle ={{alignItems:'center'}}
              horizontal = {true}
              >
              {
                  image == []? null:(<FlatList
                    data={image}
                    renderItem={renderImage}
                    horizontal = {true}
                  />)
              }
              
              {/* <View style = {styles.buttonAdd}> */}
                  <TouchableOpacity 
                      style={styles.buttonAddContainer}
                      onPress={pickImage}
                      >
                      <Image
                        style = {{height:ScreenWidth*0.05, width: ScreenWidth*0.05}}
                        source={require("../../assets/breakAway/add.png")}/>
                  </TouchableOpacity>
              {/* </View> */}
          </ScrollView>
           
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
              <View style = {{flex: 0.5}}></View>
              <View style = {{flex: 3.5}}>
                <TextInput
                    style={styles.input2}
                    //placeholder='100'
                    keyboardType = 'numeric'
                    onChangeText={ (text)=> {
                      const newText = text.replace(/[^d]+/, '');
                      setLimit(text)
                    }}
                    value = {Limit}/>
                
              </View>
              <View style = {{flex: 6, justifyContent: 'center'}}>
                <Text style = {{fontWeight: 'bold', color: colors.function_100}}>天</Text>
              </View>
              
          </View>

          <View style ={styles.textContainer}>
            <Text style={styles.text}>物品位置</Text> 
           </View>
           
          <View style ={styles.textInputContainer}>
          <View style = {{flex: 0.5}}></View>
            <View style = {{flex: 3.5, justifyContent: 'center'}}>
                <Picker
                  mode={'dropdown'}
                  //style={styles.input3}
                  selectedValue={space}
                  // onValueChange={(value)=>onValueChange(2 ,value)}
                  onValueChange= {(itemValue, itemIndex) => setSpace(itemValue)}>
                  {
                    data.map((item, index)=>{
                      return(
                        <Picker.Item label= {item.spaceName} value= {item.id} />
                      );
                    })
                  }
                </Picker>
            </View>
            <View style = {{flex: 6}}></View>
          </View>
          
          <View style ={styles.textContainer}>
            <Text style={styles.text}>屬於他們的故事</Text>
          </View>
          
          <View style = {{flex:3}}>
            <TextInput
                style={styles.inputStory}
                //placeholder='100'
                //onScroll = {true}
                multiline = {true}
                onChangeText={setStory}
                value = {story}/>
          </View>
          
          
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
    buttonAddContainer: {
      margin: 20,
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
      flexDirection:'row',
      height:"100%",
      width: "100%",
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
      borderWidth: 1,
      color: colors.mono_80
    },
    input2: {
      flex: 1,
      width: ScreenWidth*0.3,
      height: 40,
      borderColor: colors.mono_80,
      borderWidth: 1,
      color: colors.function_100
    },
    input3: {
      flex: 1,
      width: ScreenWidth*0.5,
      height: 40,
      borderColor: colors.mono_80,
      borderWidth: 1,
      color: colors.mono_80
    },
    inputStory:{
      margin: "5%",
      height: 150,
      borderColor: colors.mono_80,
      borderWidth: 1,
    },
  });