import React, { useState, useEffect }  from 'react';
import {Platform, ScrollView, TextInput, View, Text, SafeAreaView,  FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)
import BreakAwaySpace from '../../Data/BreakAwaySpace';
import { Picker } from '@react-native-picker/picker';
import { createMyHesitatingItemsTable, createHesitateItem } from '../../localStorageApi/api';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/core';

export default function BreakAwayHesitate () {
  // state = {
  //   data: [],
  //   Limit: '100',
  //   image: null,
  //   story:'',
  //   title: '',
  //   space: '',
  // };

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


  const renderItem = ({ item }) => (
    //console.log(this.props.navigation);
    <TouchableOpacity 
            style={styles.button}
            >
      <Text>{item.title}</Text>
    </TouchableOpacity>   
  );

  const renderImage = ({ item }) => (
    <SafeAreaView style = {{flex:1, left: 10, flexDirection: 'row'}}>
      <Image 
        style={{width: 120, height: 120,  }}
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
        aspect: [4, 3],
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
     <View style={{flex:1, flexDirection: 'column'}}>
       <View style = {{flex: 1}}></View> 

       <View style={{flex:0.5, flexDirection: 'column'}}>
         <View style = {{flex: 5, flexDirection:'row'}}>
              {/* <Image 
                style = {{ width: 100, height: 60 }}
                source = {{uri: image1}}/>
              <Image 
                style = {{width: 100, height: 60 }}
                source = {{uri: image2}}/>
              <Image 
                style = {{  width: 100, height: 60 }}
                source = {{uri: image3}}/>
              <Image 
                style = {{ width: 100, height: 60 }}
                source = {{uri: image4}}/>
              <Image 
                style = {{  width: 100, height: 60 }}
                source = {{uri: image5}}/> */}

            <FlatList
              style = {{margin: 20}}
              data={image}
              renderItem={renderImage}
              horizontal = {true}
              keyExtractor={item => item.id}
            />

            <View >
              <TouchableOpacity 
                  style={styles.buttonRound}
                  onPress={pickImage}
                  >
                  <Text>ADD</Text>
              </TouchableOpacity>
            </View>
         </View>  
       </View>

       <View style = {{flex: 5,}}>
          <Text>猶豫上限時間</Text>
          <TextInput
              style={styles.input}
              //placeholder='100'
              onChangeText={setLimit}
              value = {Limit}/>

          <Text>物品位置</Text>  
          <Picker
            mode={'dropdown'}
            style={{height: 40,width:200}}
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
          
          <Text>屬於他們的故事</Text>
          <TextInput
              style={styles.input}
              //placeholder='100'
              multiline = {true}
              onChangeText={setStory}
              value = {story}/>
          <TouchableOpacity
              title = 'Submit'
              onPress={handlesubmit}
              style = {styles.item}>
              <Text
                style = {styles.buttonText}>Submit</Text>
          </TouchableOpacity>
       </View>
       
       
      
     </View>
       
      
   )
  

}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   },
    container: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center'
    },
    probarStyle: {
      width: 300,
      height: 10,
      backgroundColor: "#E0E0E0"
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    button: {
      flex:1,
      margin: 4,
      width: 350,
      height: 60,
      backgroundColor: "#E0E0E0",
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    buttonRound: {
      //margin: 50,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "#E0E0E0",
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 10,
      fontWeight: 'bold',
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
      },
  });