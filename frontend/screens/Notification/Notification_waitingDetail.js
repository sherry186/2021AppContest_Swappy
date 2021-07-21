import React, {useEffect, useState} from 'react';
import * as SQLite from 'expo-sqlite';
const database = SQLite.openDatabase('db.SwappyDataBase'); // returns Database object


import { View,
        Platform,
       Text,
       Button, 
       Image, 
       FlatList, 
       SafeAreaView, 
       ScrollView, 
       TouchableOpacity,
       StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/core';
import colors from '../../config/colors';
import Notification_requesting from './Notification_requesting';


/* 2. Get the param */
function Notification_waitingDetail ({ route, navigation }) {

    
 

  
  
  // render(){  
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const { id, mything_title, mything_source, requestFor_title, requestFor_source } = route.params;
    
    const navigation1 = useNavigation();

    const handleDelete = () =>(
        <View></View>
    );

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1,
        });
        setImage(result.uri)
    }; 

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

    return (
     
        <View style = {{flex:1, height: "100%"}}>

            <View style = {{flex: 1, flexDirection:'row', backgroundColor: colors.mono_40, width: "100%", alignItems: 'center', justifyContent:'center' }}>
                <View>
                  <Text>對方的物品</Text>
                  <Image
                    style={{ width: 200, height: 200 }}
                    source = {requestFor_source}/>
                  <Text>{requestFor_title}</Text>
                </View>

                <View>
                  <Text>你的物品</Text>
                  {
                    mything_title == null? 
                    (
                        <View>
                        <TouchableOpacity 
                            style={styles.buttonAddContainer}
                            onPress={pickImage}
                        >
                            <Image
                                style={{ width: 200, height: 200 }}
                                source={image == null ? require("../../assets/notification/點擊上傳圖片.png"): {uri: image}}/>
                        </TouchableOpacity>


                        {/* <Image 
                            source={{ uri: image }}
                            style={{ width: 200, height: 200 }}/> */}
                        </View>

                        
                    ): 
                    (

                        <View>
                        <Image
                            source = {mything_source}/>
                            <Text>{mything_title}</Text>
                        </View>
                    )
                  }
                </View>
              
            </View>

            <View style = {{flex: 1, alignItems:'center', justifyContent: 'center'}}>
                <TouchableOpacity
                    onPress = {handleDelete}>
                    <Text style = {{color : colors.warning_100}}>撤回</Text>
                </TouchableOpacity>
            </View>
            
              
         </View>
    );
  // }

}

export default Notification_waitingDetail;

const styles = StyleSheet.create({
 

});