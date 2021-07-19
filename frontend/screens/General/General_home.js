//import * as React from 'react';
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView,  
  FlatList, 
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity} from "react-native";
import { SearchBar } from 'react-native-elements';
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)
import  { useNavigation } from '@react-navigation/core';

import { useQuery, gql } from '@apollo/client';

// import GeneralItems from '../../Data/GeneralItems';
// import * as SQLite from 'expo-sqlite'
// const database = SQLite.openDatabase('db.SwappyDataBase'); // returns Database object

import colors from '../../config/colors';

const GENERAL_ITEMS = gql`
query generalItemsList {
  generalItemsList {
    id
    title
    owner {
      username
    }
    description
    exchangeMethod
    category
    image
	}
}`;


const contains = (data, query) => {
  let formatData = data.toLowerCase();
  let formatQuery = query.toLowerCase();

  if (formatData.includes(formatQuery)) {
    return true;
  }
  return false;
}



const General_HOME = () => {

  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  const { data, error, loading } = useQuery(GENERAL_ITEMS);


  useEffect(() => {
    if (error) {
      Alert.alert('Error fetching general items', error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setItems(data.generalItemsList);
      setAllItems(data.generalItemsList);
      console.log(items);
    }
  }, [data]);

  const navigation = useNavigation();

  const toNotification = () => {
    navigation.navigate("Notification")
  }

  const toAdd = () =>{
    navigation.navigate("GeneralAdd")
  }

  const handleSearch = (search) => {
    console.log("search", search)
    const searchedItems = _.filter(allItems, general => {
      return contains(general.title, search)
    })
    setSearch(search);
    setItems(searchedItems);
    // this.setState({ data,  search});
  };

  const renderItem = ({ item }) => (
    //console.log(this.props.navigation);
    <View style={styles.boxContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity 
          style={styles.item}
          onPress={() => navigation.navigate('GeneralDetail', {itemID: item.id, title: item.title, sort: item.category, des: item.description, method: item.exchangeMethod, image: item.image})}>
            <Text>Item Detail</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity 
          style={styles.item}
          onPress={() => {
            // database.transaction(tx => {
            //   tx.executeSql('DELETE FROM GeneralItems WHERE id = ?', [item.id]);
            // })
          }}>
            <Text>Delete Item</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );

 

  


  return(
    
    <View style={styles.container}>
      <View style = {styles.margin}></View>
      <View style = {{flex : 1, top: 65, flexDirection:'row'}}>
          <View style = {{flex : 6}}>
              <SearchBar
                containerStyle = {{left: 18,  height: 28, alignContent: 'center', justifyContent: 'center', backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
                inputContainerStyle = {{height: 28, width: 264, borderRadius: 7, backgroundColor: colors.mono_60}}
                inputStyle= {{margin: 0,fontSize: 15}}
                placeholder="標題、種類、物品資訊"
                onChangeText={handleSearch}
                value={search}
              />
          </View>
          
          <TouchableOpacity 
             style={{flex: 1, width: 60, height: 60, backgroundColor: 'transparent'}}
             onPress={toNotification}>
            <Image
              style = {{width: 24, height: 21.99}}
              source = {require("../../assets/general&group/message.png")}/>
            
          </TouchableOpacity>
         <TouchableOpacity 
             style={{flex: 1, left: 0,  width: 60, height: 60, backgroundColor: 'transparent'}}
             onPress={toNotification}>
            <Image
              style = {{width: 24, height: 21.99}}
              source = {require("../../assets/general&group/notification.png")}/>
          </TouchableOpacity>   
      </View>
      
      <View style = {{flex: 6, alignContent: 'center', justifyContent: 'center'}}>
        <FlatList
            data={items}
            renderItem={renderItem}
          />
      </View>
     
      <TouchableOpacity 
          style={styles.button}
          onPress={toAdd}>
          <Image
            // style = {{width: 65, height: 65 }}
            source = {require("../../assets/general/add.png")}/>
      </TouchableOpacity>
    </View>
  )
  

}

export default General_HOME;

const styles = StyleSheet.create({
    margin: {
      flex: 1,
      height: 50,
      backgroundColor: colors.mono_40,
    },
    container: {
      flex: 1,
      backgroundColor: colors.mono_40,
      bottom: 65,
      // alignItems: 'center',
      // justifyContent: 'center'
    },
    boxContainer: {
      marginTop: 30,
      height: 99,
      width: 352,
      backgroundColor: colors.mono_40,
      left: 30,
      alignItems: 'center',
      justifyContent: 'center',
      bottom: 10,
      
      shadowColor: colors.mono_100,
      shadowOffset: { width: 10, height: 10 },
      shadowOpacity: 0.5,
      shadowRadius: 0,
      elevation: 3,
    },
    item: {
      backgroundColor: '#E2E6EC',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    buttons: {
      flexDirection: 'row'
    },
    button: {
      // width: 65,
      // height: 65,
      position: 'absolute',
      borderRadius: 31.5,
      backgroundColor: 'transparent',
      top: 500,
      // right: 169,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 10,
      fontWeight: 'bold',
    },
  });