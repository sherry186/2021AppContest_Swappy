import React, {useEffect, useState} from 'react';
import * as SQLite from 'expo-sqlite';
const database = SQLite.openDatabase('db.SwappyDataBase'); // returns Database object
import { Paragraph, Dialog, Portal } from 'react-native-paper';
import GeneralItems from '../../Data/GeneralItems';



import { View,
        Platform,
       Text,
       Button, 
       Image, 
       TextInput,
       FlatList, 
       SafeAreaView, 
       ScrollView, 
       TouchableOpacity,
       StyleSheet,
       Dimensions } from "react-native";
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

let ScreenWidth = Dimensions.get("window").width;
let ScreenHeight = Dimensions.get("window").height;



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

    const renderItem = ({ item }) => (
      <SafeAreaView style={styles.boxContainer}>
        <View style={styles.buttons}>
          <TouchableOpacity 
            style={styles.item}
            onPress={() => navigation.navigate('GeneralDetail', {itemID: item.id, title: item.title, sort: item.category, des: item.description, method: item.exchangeMethod, image: item.image})}>
              <Image
                source =  {item.image? {uri: `http://swappy.ngrok.io/images/${item.image}`} : require('../../assets/general/商品呈現.png')}
                style ={{height: ScreenHeight*0.13, width: ScreenHeight*0.13,}}/>
              
              <View style = {{marginLeft: 16}}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style = {{marginTop: "5%", color: colors.function_100}}>#{item.category}</Text>
              </View>   
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );

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

    //pop-up related definition
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    return (
        <Portal.Host>
          <View style = {{flex:1, height: "100%"}}>

              <View style = {{flex: 1, flexDirection:'row', backgroundColor: colors.mono_40, width: "100%", alignItems: 'center', justifyContent:'center' }}>
                  <View>
                    <View style = {{alignSelf: 'center'}}>
                      <Text>對方的物品</Text>
                    </View>
                    
                    <Image
                      style={{ width: 200, height: 200 }}
                      //source = {requestFor_source}
                      source = {requestFor_source? {uri: `http://swappy.ngrok.io/images/${requestFor_source}`} : require('../../assets/general/商品呈現.png')}
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
                                  onPress={showDialog}
                              >
                                  <Image
                                      style={{ width: 200, height: 200 }}
                                      source={image == null ? require("../../assets/notification/點擊上傳圖片.png"): {uri: image}}/>
                              </TouchableOpacity>
                              <Portal>
                                <Dialog visible={visible} onDismiss={hideDialog} style = {{marginTop : 150, marginLeft : 0, width: Dimensions.get("window").width}}>
                                  <Dialog.Title>上傳物品選擇</Dialog.Title>
                                  <ScrollView style = {{top: "5%", alignContent: 'center'}}>
                                    <View>
                                      <FlatList
                                        data={GeneralItems}
                                        renderItem={renderItem}
                                      />
                                    </View>
                                  </ScrollView>
                                </Dialog>
                              </Portal>

                              <TextInput
                                  //style={styles.input}
                                  placeholderTextColor = {colors.function_100}
                                  onChangeText={(text) => setTitle(text)}
                                  value={title} /> 
                    
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
        </Portal.Host>
    );
  // }

}

export default Notification_waitingDetail;

const styles = StyleSheet.create({
  margin: {
    position: 'relative',
    height: "10%",
    backgroundColor: colors.mono_40,
  },
  boxContainer: {
    marginTop: ScreenHeight*0.03,
    height: ScreenHeight*0.13,
    width: ScreenWidth*0.85,
    backgroundColor: colors.mono_40,
    //left: 30,
    //alignItems: 'center',
    justifyContent: 'center',
    bottom: ScreenHeight*0.03,
    borderColor: colors.mono_60,
    borderWidth: 1,
    
    // shadowColor: colors.mono_100,
    // shadowOffset: { width: 10, height: 10 },
    // shadowOpacity: 0.5,
    // shadowRadius: 0,
    // elevation: 3,
  },
  item: {
    flexDirection:'row',
    backgroundColor: 'transparent',
    //padding: 20,
    height: "100%",
    //marginVertical: 8,
    //marginHorizontal: 16,
  },
  title: {
    fontSize: 33,
  },
  buttons: {
    //flexDirection: 'row'
    flex:1,
    backgroundColor: 'transparent',
  },
  button: {
    width: 65,
    height: 65,
    position: 'absolute',
    borderRadius: 31.5,
    backgroundColor: 'transparent',
    bottom: "10%",
    //right: 169,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});