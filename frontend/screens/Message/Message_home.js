import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SearchBar } from 'react-native-elements';
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)
import { useNavigation } from '@react-navigation/core';
//import InvitationData from '../../Data/InvitationData';
//import GroupItems from '../../Data/GroupItems';

import MessageData from '../../Data/MessageData';
import colors from '../../config/colors';
//import { isTypeSystemExtensionNode } from 'graphql';



function Message_home () {

  const[data, setData] = useState([]);
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
      //console.log(this.props.navigation);
      <View style = {{flexDirection: 'row', height: 60, justifyContent: 'center', alignItems: 'center'}}>
            <Image
                style = {{flex: 1, height: "100%"}}
                source = {item.profile}/>

            <View style = { styles.item }>
              
              <TouchableOpacity 
                  style = {{ backgroundColor: 'transparent'}}>
                  <Text style={styles.title}>{item.nameShow}</Text>
                  <Text style={styles.title}>{item.message[item.message.length - 1].content} </Text>
                  
              </TouchableOpacity>
            </View>

      </View>
      

  );

 
  useEffect(() => {
    const datafilter = _.filter(MessageData, item => {
        if(item.owner[0].name == "sylvia" || item.owner[1].name == "sylvia")
        {
            return true;
        }
        return false;
    })

    let arr = datafilter.map((item, index)=>{
        if(item.owner[0].name == "sylvia")
        {
            item.profile = item.owner[1].profile
            item.nameShow = item.owner[1].name
        }
        else if(item.owner[1].name == "sylvia")
        {
            item.profile = item.owner[0].profile
            item.nameShow = item.owner[0].name
        }
        return {...item}
    })

    setData(arr);
    
  });
 

  return(
    <ScrollView style = {{ height: "100%", width: "100%", backgroundColor: colors.mono_40 }}>
      {/* <View style={styles.container}> */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      {/* </View> */}
    </ScrollView>
    
  )


}

export default Message_home;

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
      height: "100%",
      marginVertical: 8,
      width: "60%",
    },
    title: {
      fontSize: 12,
    },   
});