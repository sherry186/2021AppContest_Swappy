import React, { useState, useEffect } from 'react';

import { View, Text, SafeAreaView,  FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SearchBar } from 'react-native-elements';
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)
import  { useNavigation } from '@react-navigation/core';

import GroupItems from '../../Data/GroupItems';
import RequestingFail from '../../Data/RequestingFail';
import RequestingSuccess from '../../Data/RequestingSuccess';
import RequestingWaiting from '../../Data/RequestingWaiting';
import Notification_invitation from './Notification_invitation';
import colors from '../../config/colors';


const Notification_requesting = () => {

  // constructor(props){
  //   super(props);
  //   this.state ={
  //     fail: [],
  //     success: [],
  //     waiting:[],
  //   };
  // }
  
  const[fail, setFail] = useState([]);
  const[success, setSuccess] = useState([]);
  const[waiting, setWaiting] = useState([]);
  const navigation = useNavigation();

  const renderFail = ({ item }) => (
    //console.log(this.props.navigation);
    <TouchableOpacity 
      onPress = {()=>navigation.navigate("NotificationFailDetail",{ 
        id: item.id,
        mything_title: item.mything.title, 
        mything_source: item.mything.source, 
        requestFor_title:item.requestFor.title, 
        requestFor_source: item.requestFor.source})}
      style={styles.success}>
      <Text style={styles.title}>Fail</Text>
    </TouchableOpacity>
  );

  const renderSuccess = ({ item }) => (
    //console.log(this.props.navigation);
    <TouchableOpacity 
      onPress = {()=>navigation.navigate("NotificationSuccessDetail",{ 
        id: item.id,
        mything_title: item.mything.title, 
        mything_source: item.mything.source, 
        requestFor_title:item.requestFor.title, 
        requestFor_source: item.requestFor.source})}
      style={styles.fail}>
      <Text style={styles.title}>{item.requestFor.title}</Text>
    </TouchableOpacity>
  );

  const renderWaiting = ({ item }) => (
    //console.log(this.props.navigation);
    <TouchableOpacity 
      onPress = {()=>navigation.navigate("NotificationWaitingDetail",{ 
        id: item.id,
        mything_title: item.mything.title, 
        mything_source: item.mything.source, 
        requestFor_title:item.requestFor.title, 
        requestFor_source: item.requestFor.source})} 
      style={styles.waiting}>
      <Text style={styles.title}>Waiting</Text>
    </TouchableOpacity>
  );

  // componentDidMount() {
  //   this.setState({
  //     fail: RequestingFail,
  //     success: RequestingSuccess,
  //     waiting: RequestingWaiting,
  //   });
  // }

  useEffect(()=>{
    setFail(RequestingFail);
    setSuccess(RequestingSuccess);
    setWaiting(RequestingWaiting);
  })
  

    // const[grvalue, grsetValue] = useState('');
    //const{ navigate } = this.props.navigation;
    //console.log(this.props.navigation);

  return(
    <ScrollView style={styles.container}>

      <FlatList
        data={success}
        renderItem={renderSuccess}
        keyExtractor={item => item.id}
      />

      <FlatList
        data={waiting}
        renderItem={renderWaiting}
        keyExtractor={item => item.id}
      />

      <FlatList
        data={fail}
        renderItem={renderFail}
        keyExtractor={item => item.id}
      />
      
      
    </ScrollView>
  )
  

}

export default Notification_requesting;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center'
    },
    success: {
      backgroundColor: colors.function_100,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    fail: {
      backgroundColor: colors.warning_60,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    waiting: {
      backgroundColor: colors.mono_60,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    button: {
      width: 60,
      height: 60,
      position: 'absolute',
      borderRadius: 30,
      backgroundColor: '#ee6e73',
      bottom: 150,
      right: 175,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 10,
      fontWeight: 'bold',
    },
  });