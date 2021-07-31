import React from 'react';
import { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import colors from '../../config/colors';
import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)
//import { ScreenHeight } from 'react-native-elements/dist/helpers';
// import { Icon, InlineIcon } from '@iconify/react';
// import collectionItem from '@iconify/icons-zmdi/collection-item';

let ScreenWidth = Dimensions.get("window").width;
let ScreenHeight = Dimensions.get("window").height;


const Personal = () => {


  const [username, setUsername] = useState('');
  const [stars, setStars] = useState(0);
  const [maxstars, setMaxstars] = useState([1, 2, 3, 4, 5]);
  const [defaultImage, setDefaultImage] = useState(null);
  const [source, setSource] = useState(null);


  const navigation = useNavigation();

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [3, 3],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
      
  //     setSource({uri: result.uri});
  //   }
  // }; 

  useEffect(()=>{
    setUsername('@sylvey');
    setStars(4.2);
    setDefaultImage(require('../../assets/personal/DefaultProfile.png'));
  })

  // useEffect(() => {
  //   //setData(BreakAwaySpace);
  //   (async () => {
  //     if (Platform.OS !== 'web') {
  //       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== 'granted') {
  //         alert('Sorry, we need camera roll permissions to make this work!');
  //       }
  //     }
  //   })();
    
  // },[]);




    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <TouchableOpacity 
            style = {{top: ScreenHeight*0.05, left: ScreenWidth*0.1,}}>
            {/* onPress = {pickImage}> */}
            <Image
              style={{ width: ScreenWidth*0.3, height: ScreenWidth*0.3, borderRadius: ScreenWidth*0.15 }}
              source={source? source: defaultImage} />

          </TouchableOpacity>
          
          <Text style={{ top: ScreenHeight*0.07, left: ScreenWidth*0.1, fontSize: ScreenWidth*0.06, color:"#629D89", fontWeight: 'bold', }}>{username}</Text>
          <View style = {{ top: ScreenHeight*0.075, left: ScreenWidth*0.1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{frontSize: ScreenWidth*0.04, color:"#629D89" }}>{stars} </Text>
            {
              maxstars.map((item, index)=>{
                return(
                  <Image 
                    source = {Math.round(stars)>=item? require('../../assets/personal/star_full.png') :  require('../../assets/personal/star_empty.png')}
                    style = {{height: ScreenWidth*0.04, width:ScreenWidth*0.04}}/>

                );
              })

            }
          </View>
          
          
        </View>

        <View style = {styles.line}></View>

        <View style={{ flex: 3 }}>
          
          <TouchableOpacity
            style={styles.item}
            onPress = {() => navigation.navigate("ResetUser")}
          >
            <Image 
                style={styles.image}
                source={require('../../assets/personal/個人資料設定.png')}/>
            <Text style={styles.buttonText}>個人資料設定</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
          >
            <Image 
                style={styles.image}
                source={require('../../assets/personal/關於swappy.png')}/>
            <Text style={styles.buttonText}>關於swappy</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    )
  

}

export default Personal;

const styles = StyleSheet.create({
  container: {
    top: 20,
    flex: 1.4,
  },
  line:{
    left: ScreenWidth*0.1,
    backgroundColor: colors.mono_60,
    width: ScreenWidth*0.8,
    height: 1.5,
  },
  image: {
    top:3,
    width: 20, 
    height: 20, 
  },
  boxContainer: {
    margin: 5,
    backgroundColor: '#f9c2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    left: ScreenWidth*0.1,
    flexDirection: 'row',

    //backgroundColor: '#fff',
    paddingVertical: 20,
    margin: 1,
  },
  buttonText: {
    marginHorizontal: 20,
    alignContent: 'center',
    color: '#8D8D8D',
    fontSize: 15,
    fontWeight: 'bold',
  },
});