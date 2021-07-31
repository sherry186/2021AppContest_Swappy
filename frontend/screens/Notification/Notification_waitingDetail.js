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

import { useQuery, useMutation,  gql } from '@apollo/client';

const REMOVE_REQUEST = gql`
  mutation removeRequest($id: ID!) {
    removeRequest(id: $id)
  }
`;


function Notification_waitingDetail ({ route }) {

  const [removeRequest, { data, error, loading}] = useMutation(REMOVE_REQUEST);
  
  // render(){  
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const { id, mything_title, mything_source, requestFor_title, requestFor_source } = route.params;
    
    const navigation = useNavigation();

    const handleDelete = () =>{
      removeRequest({variables: {id: id}});
      console.log(id);
      console.log(error);
      console.log(data);
      console.log(loading);

      navigation.navigate("Notification");

    };

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
                    //source = {requestFor_source}
                    source = {requestFor_source? {url: `http://swappy.ngrok.io/images/${requestFor_source}`} : require('../../assets/general/商品呈現.png')}
                    />
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