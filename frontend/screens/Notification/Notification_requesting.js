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

import { useQuery, useMutation,  gql } from '@apollo/client';

const RENDER_REQUESTS = gql`
query getRequestingRequests{
  getRequestingRequests {
    id
    requestedItem {
      title
      image
      id
    }
    guyWhoseItemIsRequested {
      username
      id
    }
    requester {
      username
      id
    }
    requestersItem {
      title
      image
      id
    }
    status
  }
}`;


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

  const[requestData, setRequestData] = useState([]);
  const[failData, setFailData] = useState([]);
  const[successData, setSuccesData] = useState([]);
  const[waitingData, setWaitingData] = useState([]);
  const { data, error, loading } = useQuery(RENDER_REQUESTS);

  console.log('requesintgn page');
  // console.log(loading, data, error);
  useEffect(()=> {
    console.log(data);
    if(data){
      setRequestData(data.getRequestingRequests);
      console.log(requestData);

      //filter request data to waiting, success and fail
      const _waiting = requestData.filter(request => request.status == "WAITING");
      const _success = requestData.filter(request => request.status == "SUCCESS");
      const _fail = requestData.filter(request => request.status == "FAIL");

      console.log(_waiting, _success, _fail);

      setWaitingData(_waiting);
      setSuccesData(_success);
      setFailData(_fail);
    }
    if(loading) {
      console.log('loading...')
    }
  },[])

  useEffect(() => {
    if (data) {
      console.log(data);
      setRequestData(data.getRequestingRequests);
      console.log(requestData);

      //filter request data to waiting, success and fail
      const _waiting = requestData.filter(request => request.status == "WAITING");
      const _success = requestData.filter(request => request.status == "SUCCESS");
      const _fail = requestData.filter(request => request.status == "FAIL");

      console.log(_waiting, _success, _fail);
      setWaitingData(_waiting);
      setSuccesData(_success);
      setFailData(_fail);

    }
  }, [data]);


  

  const renderFail = ({ item }) => (
    //console.log(this.props.navigation);
    <TouchableOpacity 
      // onPress = {()=>navigation.navigate("NotificationFailDetail",{ 
      //   id: item.id,
      //   mything_title: item.requestersItem == null ? null : item.requestersItem.title, 
      //   mything_source: item.requestersItem == null ? null : item.requestersItem.image, 
      //   requestFor_title: item.requestedItem.title, 
      //   requestFor_source: item.requestedItem.image})} 
      style={styles.success}>
      <Text style={styles.title}>{item.requestedItem.title}</Text>
    </TouchableOpacity>
  );

  const renderSuccess = ({ item }) => {
    console.log(item);
    return (
    //console.log(this.props.navigation);
    <TouchableOpacity 
      onPress = {()=>navigation.navigate("NotificationSuccessDetail",{ 
        id: item.id,
        mything_title: item.requestersItem == null ? null : item.requestersItem.title, 
        mything_source: item.requestersItem == null ? null : item.requestersItem.image, 
        requestFor_title: item.requestedItem.title, 
        requestFor_source: item.requestedItem.image})} 
      style={styles.fail}>
      <Text style={styles.title}>{item.requestedItem.title}</Text>
    </TouchableOpacity>
  )};

  const renderWaiting = ({ item }) => {
  return (
    
    //console.log(this.props.navigation);
    <TouchableOpacity 
      onPress = {()=>navigation.navigate("NotificationWaitingDetail",{ 
        id: item.id,
        mything_title: item.requestersItem == null ? null : item.requestersItem.title, 
        mything_source: item.requestersItem == null ? null : item.requestersItem.image, 
        requestFor_title: item.requestedItem.title, 
        requestFor_source: item.requestedItem.image})} 
      style={styles.waiting}>
      <Text style={styles.title}>{item.requestedItem.title}</Text>
    </TouchableOpacity>
  )};

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
        data={successData}
        renderItem={renderSuccess}
        keyExtractor={item => item.id}
      />

      <FlatList
        data={waitingData}
        renderItem={renderWaiting}
        keyExtractor={item => item.id}
      />

      <FlatList
        data={failData}
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