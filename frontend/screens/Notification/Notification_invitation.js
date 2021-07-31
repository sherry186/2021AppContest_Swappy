import React, { useState, useEffect } from 'react';

import { View, Dimensions, Text, SafeAreaView,  FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SearchBar } from 'react-native-elements';
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)
import { useNavigation } from '@react-navigation/core';
import InvitationData from '../../Data/InvitationData';
import GroupItems from '../../Data/GroupItems';
import colors from '../../config/colors';

import { useQuery, useMutation,  gql } from '@apollo/client';

let ScreenWidth = Dimensions.get("window").width;
const RENDER_INVITATIONS = gql`
  query getInvitedRequests{
    getInvitedRequests {
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

const UPDATE_STATUS = gql`
  mutation updateStatus($id: ID!, $status: Status!){
    updateStatus(id: $id, status: $status)
  }`;


const Notification_invitation = () => {

  //const[data, setData] = useState([]);
  const[groupItems, setGroupItems] = useState([]);

  const navigation = useNavigation();

  const[invitationData, setInvitationData] = useState([]);
  const { data, error, loading } = useQuery(RENDER_INVITATIONS, {pollInterval: 500});
  const [updateStatus, _] = useMutation(UPDATE_STATUS);

  console.log(data);
  // console.log(loading, data, error);
  // useEffect(()=> {
  //   console.log(data);
  //   if(data){
  //     setInvitationData(data.getInvitedRequests);
  //     console.log(invitationData);
  //   }
  //   if(loading) {
  //     console.log('loading...')
  //   }
  // },[])

  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //     setInvitationData(data.getInvitedRequests);
  //     console.log(invitationData);
  //   }
  // }, [data]);

  const handleYes = (requestId) => {
    updateStatus({variables: {id: requestId,status: "SUCCESS"}});
  }

  const handleNo = (requestId) => {
    updateStatus({variables: {id: requestId,status: "FAIL"}});
  }

  const renderItem = ({ item }) => (
      //console.log(this.props.navigation);
      <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        
        <View style = {styles.complete}>

            <View style = { styles.item }>
              <TouchableOpacity 
                  onPress = {()=>navigation.navigate("NotificationInvatationDetail",{ 
                    id: item.id,  
                    requestFor_title: item.requestersItem == null ? null : item.requestersItem.title, 
                    requestFor_source: item.requestersItem == null ? null : item.requestersItem.image, 
                    mything_title: item.requestedItem.title ? item.requestedItem.title : null, 
                    mything_source: item.requestedItem.image ? item.requestedItem.image : null})}
                  style = {{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', borderRadius: ScreenWidth*0.2}}>
                  <Text style={styles.title}>{item.requester.username} </Text>
                  <Text style={styles.title}>{item.requestedItem.title}</Text>
                  <Text style={styles.title}>{'general'}</Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.yn}>
              <TouchableOpacity
                  onPress = {()=>handleYes(item.id)}
                  style={styles.ynButton}>
                  <Text style ={{fontWeight: '900', fontSize: 20, color : colors.main_80}}>Y</Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.yn}>
              <TouchableOpacity
                  onPress = {()=>handleNo(item.id)}
                  style={styles.ynButton}>
                  <Text style ={{fontWeight: '900', fontSize: 20, color : colors.warning_100}}>N</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
      
  );

  useEffect(() => {
    //setData(InvitationData);
    setGroupItems(GroupItems);
    // this.setState({
    //   data: InvitationData,
    //   groupItems: GroupItems,
    // });
  });
 
  // const { search } = this.state;
  // // const[grvalue, grsetValue] = useState('');
  // const{ navigate } = this.props.navigation;
  // //console.log(this.props.navigation);
  return(
    <View style = {{ height: "100%", width: "100%", backgroundColor: colors.mono_40 }}>
      <View style={styles.container}>
        { data ? ( <FlatList
            data={data.getInvitedRequests}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          /> ) : <Text>loading ...</Text>
        }
      </View>
    </View>
    
  )


}

export default Notification_invitation;

const styles = StyleSheet.create({
    margin: {
      width: "5%",
      backgroundColor:"transparent",
    },
    container: {
      flex: 1,
      backgroundColor: "transparent",
      width: "100%",
    },
    complete:{ 
      flexDirection: 'row',
      marginTop: 10,
      height: 90, 
      width:"90%",
      backgroundColor: 'transparent',
      justifyContent:'center',

      
    },
    item: {
      flex: 6,
      justifyContent: 'center',
      borderRadius: ScreenWidth*0.01,
      backgroundColor: colors.mono_60,
      padding: 20,
      marginVertical: 8,
      width: "60%",
    },
    yn:{
      flex: 1,
      height: "100%",
      backgroundColor: "transparent",
      alignItems: 'center',
      justifyContent: 'center',
    },
    ynButton:{
      width:60, 
      height:60, 
      borderRadius:30, 
      backgroundColor: "transparent", 
      alignItems:'center', 
      justifyContent:'center'
    },
    title: {
      justifyContent:'center',
      fontSize: 12,
      color: colors.mono_100,
      fontWeight: 'bold',
    },
 });