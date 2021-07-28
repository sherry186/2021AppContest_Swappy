import { styleSheets } from 'min-document';
import React, { useState, useEffect } from 'react';
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
    ScrollView, 
    KeyboardAvoidingView,
    } from 'react-native';

import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
// import * as SQLite from "expo-sqlite";
import colors from '../../config/colors';
import * as SQLite from 'expo-sqlite';

import { useMutation,  gql } from '@apollo/client';
import { createMyStoriesTable, createStoryItem, updateProgress } from '../../localStorageApi/api';

let ScreenWidth = Dimensions.get("window").width;


const database = SQLite.openDatabase('db.SwappyDataBase'); // returns Database object

  const CREATE_GENERALITEM = gql`
  mutation createGeneralItem ($title: String!, $description: String!, $category: String!, $exchangeMethod: String!, $image: String) {
    createGeneralItem(input: {
      title: $title
      description: $description
      category: $category
      exchangeMethod: $exchangeMethod
      image: $image
    }) {
      id
      owner {
        username
        id
      }
      description
    }
  }`;

const BreakAwayChangeOut = () => {
  const [itemName, setitemName] = useState('');
  const [description, setDescription] = useState('');
  const [dropdown, setDropdown] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState(0);
  const [dummyData, setdummyData] = useState([ {way: '面交'}, {way: '郵寄'}]);
  const [data1, setData1] = useState([]);

  const [image, setImage] = useState([]);

  const navigation = useNavigation();
  const windowHeight = useWindowDimensions().height;

  const [createItem, { data, error, loading }] = useMutation(CREATE_GENERALITEM);
  //from general ADD

  const [spaceData, setSpaceData] = useState([]);
  const [story, setStory] = useState('');
  const [space, setSpace] = useState(0);

  //from hesitate

  useEffect(() => {
    console.log(dummyData);
    let arr = dummyData.map((item, index)=>{
      item.isSelected = false
      return {...item};
    });
    setdummyData(arr);
    console.log(dummyData);
  }, []);

  useEffect(() => {
    createMyStoriesTable();
    console.log();

    database.transaction(tx => {
      tx.executeSql('SELECT * FROM MySpaces', 
      null,
      (txObj, resultSet) => {
          //console.log('Success', resultSet);
          let spacesData = resultSet.rows._array;
          setData1(spacesData);
          //console.log(data);
  },
      (txObj, error) => console.log('Error', error))
  });
  }, []);

  const addToStory = (title, source, story, spaceId) =>{
    createStoryItem(title, story, source, spaceId);

    const keepPoints = 2.0
    updateProgress(spaceId, keepPoints);
  }

  const renderImage = ({ item }) => (
    <SafeAreaView style = {styles.imageContainer}>
      <Image 
        style={styles.image}
        source={{uri: item.uri}}/>
    </SafeAreaView> 
  );


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
  // console.log(error);
  // console.log(data);

  useEffect(() => {
    if (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  useEffect(()=> {
    const _deliveryMethod = deliveryMethodHandler()
    setDeliveryMethod(_deliveryMethod);
    console.log(deliveryMethod);
  }, [dummyData])

  useEffect(() => {
    //setData(BreakAwaySpace);
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    
  },[]);


  

  const selectionHandler = (ind) => {
    console.log(dummyData);
    let arr = dummyData.map((item, index)=>{
      if(ind == index){
        item.isSelected = !item.isSelected;
      }
      return {...item}
    });
    //console.log("selection handler ==>", arr);
    setdummyData(arr);
  };

  const // summarizes the delivery method into 3 categories:
  // 0: Not yet selected, 2: FacetoFace only, 1: byPost only, 3: FacetoFace AND byPost
  deliveryMethodHandler = () => {
    let facetoFace = dummyData[0].isSelected;
    let byPost = dummyData[1].isSelected;
    if(facetoFace == true && byPost == true) {
      return '3';
    } 
    if(facetoFace == true) {
      return '2';
    }
    if(byPost == true) {
      return '1';
    }
    return '0';
  }

  const handlesubmit =() =>{
    const dummyImageURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEX09PTMzMzJycnPz8/d3d3V1dXi4uLo6Ojw8PDx8fH39/ft7e3Y2NjQ0NDp6enb29uHE20LAAACaklEQVR4nO3b6W6CQBhGYUTWD9T7v9uylLIN6jCk8Cbn+deEGo6DMOAYRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIJyFiuzshLesStJAdVZdufEV38LFydkZm6w+IrBJrK86itkxgU1ifnaKmz363QvUvsbjmoNYdjuXPPMQz6R7lfLsGKeq3bd76LvfHwnFIXt0tOKYwjuF51kVtjMUbzqFVmR1/cpK30idwv7qH98yz0SVwvI+XP19JygqhY9xehMnXokihfl0/hZ77a5I4WM2zXz5DKJI4XwKvjHLNGeGRmE1L7w7N7fKeRLSKCy+KGwCnedZjcJofruXuo7SbpwdiRqFlk4D42y9rf0eyOtEjcL5BzFeb2rV5oRApNAmj6QcjyRs8g4sE0UKJ4nxemJq8yGeJ6oURpY/uic26frppy0uJvNEmcI2JM/yovlz8cxlGbhIFCrcsA6cX0/kC52Bt3hMlC90Bk5HUbzQPYL9KA6b6BXmk8/YZuCYqFdYj/f47wL/EtUKrR6/LXsfOCSKFbaBQ+KnwGa79sqpVWjp7x1Ec6B+DhQsHAK7xM+BeoVjYLPzr499eoXTwO+IFfoHihXuWbWgVVh792kV7lt3IlRoe0ZQqvCLax+FZ8c4UUghheebFu6jU1gk++gU7l3t3f2rRmGAyxcGr329cuEh60stunBh2Z3y6yxM/wX52S1u/bf3Ryzzdq9tuIDnYWv1q7NTNlhy0O8t/Nb6/SfLbnHoYbpjSep/sjLfOZ0ZXfTXJKPgH69deAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDyA0uAKIxQw0bjAAAAAElFTkSuQmCC'
    if(image.length == 0) {
      createItem({variables: { title: itemName, description: description, category: dropdown, exchangeMethod: deliveryMethod}});
      addToStory(itemName, dummyImageURI, story, space)
    } else {
      for (let i = 0; i < image.length; i++) {
        console.log(typeof(image[i].uri));
        createItem({variables: { title: itemName, description: description, category: dropdown, exchangeMethod: deliveryMethod, image: image[i].uri}});
        addToStory(itemName, image[i].uri, story, space)
      }
    }

    
    navigation.navigate('General');
  } 

  const onValueChange = (flag,value) => {
    setDropdown(value);
  };  

  //from general add

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
              setSpaceData(spacesData);
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

  //from breakAwayHesitate



  return(
    <View style={{flex:1, flexDirection: 'column',  }}>
      {/* <Text style={styles.buttonText}>Item Name</Text> */}
      <KeyboardAvoidingView style={{backgroundColor: colors.mono_40 ,height: windowHeight *0.15 ,flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
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
       {/* duplicate from breakAwayHesitate */} 

      <KeyboardAvoidingView style = {styles.line}></KeyboardAvoidingView>
      
        <ScrollView >
          <View style ={styles.textContainer}>
              <Text style = {styles.text}>物品標題</Text>
          </View>

          <View style ={styles.textInputContainer}>
              <TextInput
                  style={styles.input}
                  //placeholder='ItemName'
                  onChangeText={setitemName}
                  value = {itemName}/>
          </View>
          

          <View style ={styles.textContainer}>
            <Text style={styles.text}>物品種類</Text> 
          </View>


        <View style ={styles.textInputContainer}>
          <View style = {{flex: 0.5}}></View>
            <View style = {{flex: 3.5, justifyContent: 'center'}}>
                <Picker
                    mode={'dropdown'}
                    //style={{height: 25,width:200}}
                    selectedValue={dropdown}
                    onValueChange={(value)=>onValueChange(2,value)}>
                    <Picker.Item label="書籍" value="key0" />
                    <Picker.Item label="衣服與配件" value="key1" />
                    <Picker.Item label="玩具" value="key2" />
                    <Picker.Item label="特色周邊品" value="key3" />
                    <Picker.Item label="小型生活器具" value="key4" />
                    <Picker.Item label="家電用品" value="key5" />
                    <Picker.Item label="其他" value="key6" />
                  </Picker>
            </View>
          <View style = {{flex: 6}}></View>
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
                    spaceData.map((item, index)=>{
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
            <Text style={styles.text}>交付方式</Text> 
        </View>

        
          <View style={styles.textInputContainer}>
            <View style = {{flex: 0.5}}></View>
            <View style = {{flex: 9.5, flexDirection: 'row'}}>
            {
              dummyData.map((item, index)=>{
                return(
                  <TouchableOpacity
                    onPress={()=>selectionHandler(index)}
                    title = 'upload'
                    style = {item.isSelected ? styles.wayS : styles.waySd}>
                    <Text style = {styles.buttonText}>{item.way}</Text> 
                  </TouchableOpacity>
                );
              })
            }
            </View>
          </View>

          <View style ={styles.textContainer}>
              <Text style={styles.text}>物品說明</Text>
          </View>

          <View style = {{flex:3}}>
              <TextInput
                  style={styles.inputStory}
                  //placeholder='second hand, not brandnew'
                  multiline = {true}
                  onChangeText={setDescription}
                  value = {description}/>
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

export default BreakAwayChangeOut;


const styles = StyleSheet.create({
 
  input: {
    flex: 1,
    marginHorizontal:"5%",
    height: 40,
    borderColor: colors.mono_80,
    borderWidth: 1
  },
  wayS: {
    backgroundColor: colors.mono_60,
    width: "20%",
    height: 25,
    margin: 5,
    borderRadius:2,
    justifyContent:'center',
    alignItems:'center', 
  },
  waySd: {
    backgroundColor: colors.function_100,
    width: "20%",
    height: 25,
    margin: 5,
    borderRadius:2,
    justifyContent:'center',
    alignItems:'center',
  },
  buttonText: {
    color: colors.mono_40,
    fontSize: 15,
    fontWeight: 'bold',
  },
  item: {
    height:70,
    width:70,
    alignItems: 'center',
    justifyContent: 'center',
    
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
    alignItems:'center',
    //justifyContent:'center',
    flexDirection:'row',
    height:"100%",
    width: "100%",
    backgroundColor: "transparent",      
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
    width: ScreenWidth*0.3,
    height: 40,
    borderColor: colors.mono_80,
    borderWidth: 1
  },
  input3: {
    flex: 1,
    width: ScreenWidth*0.5,
    height: 40,
    borderColor: colors.mono_80,
    borderWidth: 1
  },
  inputStory:{
    margin: "5%",
    height: 150,
    borderColor: colors.mono_80,
    borderWidth: 1,
    textAlignVertical: 'top',
  },
});