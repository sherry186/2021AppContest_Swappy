import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import colors from '../../config/colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, gql } from '@apollo/client';

const SIGN_UP_MUTATION = gql`
mutation signUp($email: String!, $password: String!, $phone: String!, $username: String!) {
  signUp(input: { 
    email: $email, 
    password: $password,
    username: $username,
    phone: $phone,
  }) {
    token
    user {
      id 
      email
      username 
      phone
    }
  }
}`;

const signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone]  = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const navigation = useNavigation();


  // mutation[0] : A function to trigger the mutation
  // mutation[1] : result object 
  //{ data,error, loading }
  const [signUp, { data, error, loading }] = useMutation(SIGN_UP_MUTATION);
  

  if (error) {
    Alert.alert('Error signing up. Try again');
    console.log(error);
  }

  if (data) {
    // save token
    
    AsyncStorage
      .setItem('token', data.signUp.token)
      .then(() => {
        // redirect home
        Alert.alert('signed up successfully!');
        navigation.navigate("login");
      })
  }




  const handlesubmit = () => {
    signUp({variables: { email, password, phone, username}})
  }
  
  return (
    <View style={{ flex: 1 , backgroundColor: colors.function_100}}>
      <View style = {{flex: 1, borderTopStartRadius:20, borderTopRightRadius:20, backgroundColor: colors.mono_40, alignItems:'center', justifyContent:'center'}}>
          <TextInput
              style={styles.input}
              placeholder='使用者名稱'
              onChangeText={setUsername}
              value = {username}/>

          <TextInput
              style={styles.input}
              placeholder='電子郵件'
              onChangeText={setEmail}
              value = {email}/>

          <TextInput
              style={styles.input}
              placeholder='手機號碼'
              onChangeText={setPhone}
              value = {phone}/>

          <TextInput
              style={styles.input}
              placeholder='密碼'
              onChangeText={setPassword}
              value = {password}/>

          <TextInput
              style={styles.input}
              placeholder='重新確認密碼'
              onChangeText={setCheckPassword}
              value = {checkPassword}/>


          <TouchableOpacity
              title = 'Submit'
              onPress={handlesubmit}
              style = {styles.submit}>
                {loading && <ActivityIndicator />}
              <Text
                style = {styles.buttonText}>註冊</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default signup;




const styles = StyleSheet.create({
  input: {
    margin:10,
    height: 40,
    width: 300,
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth: 0
  },
  submit: {
    borderRadius: 10,
    display:'flex',
    margin: 30,
    backgroundColor: colors.function_100,
    height: 40,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: colors.function_100,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  buttonText: {
    color: colors.mono_40,
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
});