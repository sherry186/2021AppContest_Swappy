import React from 'react';
import {
    Text,
    StyleSheet,
    View, 
    TextInput,
    TouchableOpacity,
    Dimensions,
    Image,
    Switch} from 'react-native';
import { useState, useEffect } from 'react';
import  { useNavigation } from '@react-navigation/core';

import SocialItems from '../../Data/SocialItems';
import Social from '../../navigators/SocialNav';
import { offsetLimitPagination } from '@apollo/client/utilities';
import colors from '../../config/colors';
import { useQuery, useMutation,  gql } from '@apollo/client';
import { color } from 'jimp';

let ScreenWidth = Dimensions.get("window").width;

const CREATE_POST = gql`
mutation createPost ($title: String!, $description: String!, $hideUser: Boolean!) {
  createPost(title: $title, description:$description, hideUser: $hideUser) {
    id
    title
    description
    author {
      username
      id
    }
  }
}`;

const Main_ADD = () => {
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState('');
  const [hide, setHide] = useState(false);

  const navigation = useNavigation();

  const [createPost, { data, error, loading }] = useMutation(CREATE_POST);

  const handlesubmit =() =>{
    
    createPost({variables: {title: title, description: article, hideUser: hide}});
    // nextId = SocialItems.length.toString;
    // if(hide == false)
    // {
    //     item = {id: nextId, 
    //       person: 'Sylvia', 
    //       title: title,
    //       post: article }
        
    //     SocialItems.push(item)
    // }
    // else
    // {
    //     item = {id: nextId, 
    //       person: 'SomeBody', 
    //       title: title,
    //       post: article }
      
    //     SocialItems.push(item)
    // }

    navigation.goBack()
  } 



  return(
    <View style={styles.container}>
      <TextInput
          style={styles.title}
          placeholderTextColor ={colors.mono_80}
          
          placeholder="標題"
          onChangeText={(text) => setTitle(text)}
          value = {title}/>

      <TextInput
          style={styles.post}
          placeholder="在想什麼嗎?"
          multiline = {true}
          onChangeText={(text) => setArticle(text)}
          value = {article}/>
      <Text></Text>
      <Text></Text>
      <View style = {{flexDirection:'row', alignItems:'center'}}>
      
      <Switch
          style = {styles.switch}
          onValueChange = {()=>{setHide(previousState => !previousState)}}
          value = {hide}
          />
      <Text style = {styles.Text}>{hide? '匿名':'顯示名稱'}</Text>
      </View>
         

      
      <TouchableOpacity
          title = 'Submit'
          onPress={handlesubmit}
          style = {styles.item}>
          <Image
            style = {{height: 70, width:70,}} 
            source = {require('../../assets/breakAway/upload.png')}/>
      </TouchableOpacity>
     
    </View>
  )
}

export default Main_ADD;


const styles = StyleSheet.create({
  uploadContainer:{
    flex:1,
    justifyContent:'center',
    height:"100%",
    backgroundColor:"red",  
    alignItems:'center',
    justifyContent:'center',    
  },
  title: {
    margin:15,
    height: 60,
    
    borderColor: colors.mono_80,
    borderWidth: 1,
    fontSize:20,
    paddingLeft: 10,
  },
  switch:{
    //marginRight: 350,
    marginVertical: 8,
  },
  post: {
    margin: 15,
    height: 200,
    borderColor: colors.mono_80,
    borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 10,
    textAlignVertical: 'top',
    //

  },
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
    paddingTop: 23
  },
  // item: {
  //   backgroundColor: '#f9c2ff',
  //   padding: 20,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  // },
  buttonText: {
    //color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Text: {
    //color: '#fff',
    fontSize: 15,
    marginRight: ScreenWidth*0.05,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  item: {
    position:'absolute',
    bottom: 0,
    alignSelf:'center',
    height:70,
    width:70,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});