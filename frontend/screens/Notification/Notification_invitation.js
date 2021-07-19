import React, { useState, useEffect } from 'react';

import { View, Text, SafeAreaView,  FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SearchBar } from 'react-native-elements';
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)

import InvitationData from '../../Data/InvitationData';
import GroupItems from '../../Data/GroupItems';
import colors from '../../config/colors';


const Notification_invitation = () => {

  const[data, setData] = useState([]);
  const[groupItems, setGroupItems] = useState([]);


  const renderItem = ({ item }) => (
      //console.log(this.props.navigation);
      <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        
        <View style = {styles.complete}>

            <View style = { styles.item }>
              <TouchableOpacity 
                  style = {{ backgroundColor: 'transparent'}}>
                  <Text style={styles.title}>{item.requester} </Text>
                  <Text style={styles.title}>{item.itis}</Text>
                  <Text style={styles.title}>{item.general? 'general' : 'group'}</Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.yn}>
              <TouchableOpacity
                  style={styles.ynButton}>
                  <Text>Y</Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.yn}>
              <TouchableOpacity
                  style={styles.ynButton}>
                  <Text>N</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
      

  );

  useEffect(() => {
    setData(InvitationData);
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
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
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
    margin: {

    },
    complete:{ 
      flexDirection: 'row',
      marginTop: 20,
      height: 90, 
      width:"90%",
      backgroundColor: 'transparent',
      justifyContent:'center',
    },
    item: {
      flex: 6,
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
      fontSize: 12,
    },
    
   
  });