import { styleSheets } from 'min-document';
import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity, 
    TextInput,
    ScrollView,
    useWindowDimensions,
    SafeAreaView,
    FlatList,
    Image,
    Dimensions,
    KeyboardAvoidingView,
    } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import colors from '../../config/colors';

import { useMutation,  gql } from '@apollo/client';

const ADD_GROUP_ITEM = gql`
  mutation createGroupItem($groupId:ID!, $tag: String, $description: String!, $exchangeMethod: ExchangeMethod!, $image: String){
    createGroupItem(groupId:$groupId, input: {
      tag: $tag
      description: $description
      exchangeMethod: $exchangeMethod
      image: $image
    })
  }`;

let ScreenWidth = Dimensions.get("window").width;

function GroupAddItem ({route, navigation}) {

  const [Gname, setGname] = useState('');
  const [Discription, setDiscription] = useState('');
  //const [Ihave, setIhave] = useState([]);
  const [tag, setTag] = useState('');
  const [dummyData, setDummyData] = useState([{way: 'faceToFace'},
                                               {way: 'byPost'}]);
  const [exchangeMethod, setExchangeMethod] = useState('NOTSELECTED')
  const [image, setImage] = useState([]);

  const [createGroupItem, { data, error, loading }] = useMutation(ADD_GROUP_ITEM);

  const windowHeight = useWindowDimensions().height;

  const {tags, id} = route.params;

  // useEffect(()=>{
  //    let arr = dummyData.map((item, index)=>{
  //      item.isSelected = false
  //      return {...item};
  //    })
  //    const {tags} = route.params;
  //    let arr2 = tags.map((item, index)=>{
  //      item.isSelected = false
  //      return {...item};
  //    })
  //    const tags2 = tags
  //    let arr3 = tags2.map((item, index)=>{
  //      item.isSelected = false
  //      return {...item}
  //    })

  //   setDummyData(arr);
  //   setIhave(arr2);

  //   // this.setState({dummyData: arr, Ihave: arr2, Iwant: arr3});
  //    console.log('arr data ==>', arr)
  // }, []);

  const pickImage = async () => {
    if(image.length < 5)
    {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        
        setImage([...image, {id: image.length, uri: result.uri}]);
      }
    }
    else
    {
      alert("最多只能5張照片喔qq")
    }
    
  };

  const renderImage = ({ item }) => (
    <SafeAreaView style = {styles.imageContainer}>
      <Image 
        style={styles.image}
        source={{uri: item.uri}}/>
    </SafeAreaView> 
  );

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

  const selectionHandlerSort = (ind) => {
    
    // let arr2 = Ihave.map((item, index)=>{
    //   if(ind == index){
    //     item.isSelected = !item.isSelected;
    //   }
    //   return {...item}
    // })
    // console.log("selection handler ==>", arr2)
    setTag(tags[ind]);
    console.log(tag);
  }

  const selectionHandler = (ind) => {
    //alert("jie")
    //const {Gname, Discription, Ihave, Iwant, dummyData} = this.state;
    let arr1 = dummyData.map((item, index)=>{
      if(ind == index){
        item.isSelected = !item.isSelected;
      }
      return {...item}
    })
    //console.log("selection handler1 ==>", arr1)
    setDummyData(arr1)

    if(dummyData[0].isSelected == true && dummyData[1].isSelected == true) {
      setExchangeMethod("BOTH");
    } else if (dummyData[0].isSelected == true && dummyData[1].isSelected == false) {
      setExchangeMethod("FACETOFACE");
    } else if (dummyData[0].isSelected == false && dummyData[1].isSelected == true) {
      setExchangeMethod("BYPOST");
    } else {
      setExchangeMethod("NOTSELECTED");
    }
    //console.log(exchangeMethod);
  }

  const handlesubmit =() =>{
    console.log(id, typeof(tag), typeof(Discription), typeof(exchangeMethod));
    if(image.length == 0) {
      createGroupItem({ variables: { groupId: id, tag: tag, description: Discription, exchangeMethod: exchangeMethod}});
    } else {
      for (let i = 0; i < image.length; i++) {
        console.log(typeof(image[i].uri));
        createGroupItem({ variables: { groupId: id, tag: tag, description: Discription, exchangeMethod: exchangeMethod, image: image[i].uri}});
      }
    }

    navigation.goBack()
  } 

  const handleupload = () =>{

  }

  
    return(
      <View style={{flex:1, flexDirection: 'column',  }}>
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
       {/* duplicate from breakAwayHesitate */} 

      <KeyboardAvoidingView style = {styles.line}></KeyboardAvoidingView>



      <ScrollView >
          <View style ={styles.textContainer}>
              <Text style={styles.text}>交付方式 </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            {
              dummyData.map((item, index)=>{
                return(
                  <TouchableOpacity
                    onPress={()=>selectionHandler(index)}
                    title = 'method'
                    //onPress={this.handleupload}
                    style = {{flexDirection:'row',
                    marginHorizontal: ScreenWidth*0.05,
                    marginVertical:ScreenWidth*0.03,
                    backgroundColor: item.isSelected? colors.function_100: colors.mono_60,
                    width: ScreenWidth*0.3,
                    height: ScreenWidth*0.1,
                    alignItems:'center',
                    justifyContent: 'center',
                    borderRadius: ScreenWidth*0.02,}}>
                    <Text style = {styles.buttonText}>{item.way}</Text> 
                  </TouchableOpacity>
                );
              })
            }
          </View>
          <View style ={styles.textContainer}>
            <Text style={styles.text}>物品說明</Text>
          </View>

          <View style = {styles.textInputContainer}>
            <TextInput
                style={styles.input}
                multiline ={true}
                onChangeText={(text) => setDiscription(text)}
                value = {Discription}/>
          </View>

          <View style ={styles.textContainer}>
            <Text style={styles.text}>物品種類</Text>
          </View>


            <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
              {
                tags.map((item, index)=>{
                  return(
                    <TouchableOpacity
                      onPress={()=>selectionHandlerSort(index)}
                      title = 'sort'
                      //onPress={this.handleupload}
                      style = {{
                        flexDirection:'row',
                        marginHorizontal: ScreenWidth*0.05,
                        marginVertical:ScreenWidth*0.03,
                        backgroundColor: item.isSelected? colors.function_100: colors.mono_60,
                        width: ScreenWidth*0.3,
                        height: ScreenWidth*0.1,
                        alignItems:'center',
                        justifyContent: 'center',
                        borderRadius: ScreenWidth*0.02,
                        }}>
                      <Text style = {styles.buttonText}>{item}</Text> 
                    </TouchableOpacity>
                  );
                })
              }
            </ScrollView>


                
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
  // }

}

export default GroupAddItem;

const styles = StyleSheet.create({
  itemS: {
    backgroundColor: '#7a42f4',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
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
    fontSize: ScreenWidth*0.03,
    color:colors.mono_40,
    fontWeight: '900',
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
    flexDirection: 'row',
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
  input:{
    margin: "5%",
    height: 150,
    borderColor: colors.mono_80,
    borderWidth: 1,
    textAlignVertical: 'top',
    width: "90%"
  },
});