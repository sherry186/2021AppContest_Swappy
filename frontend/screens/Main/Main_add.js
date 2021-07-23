import React from 'react';
import {
    Text,
    StyleSheet,
    View, 
    TextInput,
    TouchableOpacity,
    Switch} from 'react-native';
import { useState, useEffect } from 'react';
import  { useNavigation } from '@react-navigation/core';

import SocialItems from '../../Data/SocialItems';
import Social from '../../navigators/SocialNav';
import { offsetLimitPagination } from '@apollo/client/utilities';

import { useQuery, useMutation,  gql } from '@apollo/client';

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

  const handleupload = () =>{

  }

  return(
    <View style={styles.container}>
      <TextInput
          style={styles.title}
          placeholder="Title"
          onChangeText={(text) => setTitle(text)}
          value = {title}/>

      <TextInput
          style={styles.post}
          placeholder="What's on your mind?"
          multiline = {true}
          onChangeText={(text) => setArticle(text)}
          value = {article}/>
      <Text></Text>
      <Text></Text>

      <Switch
          style = {styles.switch}
          onValueChange = {(value)=>{setHide(value)}}
          value = {hide}
          />
        <Text 
          style = {styles.Text}>
            hide name {hide? 'on':'off'}</Text> 

      <TouchableOpacity
          title = 'Submit'
          onPress={handlesubmit}
          style = {styles.item}>
          <Text
            style = {styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Main_ADD;


const styles = StyleSheet.create({
  title: {
    margin:15,
    height: 60,
    borderColor: '#7a42f4',
    borderWidth: 1,
    fontSize:40,
    paddingLeft: 10,
  },
  switch:{
    marginRight: 350,
    marginVertical: 8,
  },
  post: {
    margin: 15,
    height: 200,
    borderColor: '#7a42f4',
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  buttonText: {
    //color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Text: {
    //color: '#fff',
    fontSize: 15,
    marginRight: 290,
    textAlign: 'right',
    fontWeight: 'bold',
  },
});