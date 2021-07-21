import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView,  
  FlatList, 
  StyleSheet,
  ScrollView, 
  useWindowDimensions,
  TouchableOpacity,
  Image } from "react-native";
import  { useNavigation } from '@react-navigation/core';
import { SearchBar } from 'react-native-elements';
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)
import colors from '../../config/colors';
import GroupItems from '../../Data/GroupItems';



const contains = (data, query) => {
  let formatData = data.toLowerCase();
  let formatQuery = query.toLowerCase();

  if (formatData.includes(formatQuery)) {
    return true;
  }
  return false;
}



const Group_HOME = () => {

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     search: '',
  //     data: [],
  //     fullData: [],
  //   };
  // }
  
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const navigation = useNavigation();
 
  const windowHeight = useWindowDimensions().height;

  const toNotification = () => {
    navigation.navigate("Notification")
  }

  const toMessage = () => {
    navigation.navigate("MessageHome")
  }

  const handleSearch = (search) => {
    console.log("search", search)
    const data1 = _.filter(fullData, group => {
      return contains(group.title, search)
    })
    setSearch(search);
    setData(data1);
    //this.setState({ data,  search});
  };

  const renderItem = ({ item }) => (
    //console.log(this.props.navigation);
    <SafeAreaView style={styles.boxContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.buttons}>
          <TouchableOpacity 
            style={styles.item}
            onPress={() => navigation.navigate('GroupDetail', {title: item.title, items: item.items, post: item.post})}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  useEffect(()=> {
    //setData(GroupItems);
    setFullData(GroupItems);
  });
  


  return(
    <SafeAreaView style={{
        minHeight: Math.round(windowHeight),
        flex: 1,
        height: "60%",
        alignItems: "center",
        //justifyContent: 'center',
        backgroundColor: colors.mono_40,
        bottom: 68,
      }}>
      <View style = {styles.margin}></View>
      <View style = {{top: "15%", height: "10%", width: "90%", flexDirection:'row'}}>
          <View style = {{flex : 5, alignItems: 'center', justifyContent: 'center'}}>
              <SearchBar
                containerStyle = {{ height: "80%", alignItems: 'center', backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
                inputContainerStyle = {{height: 28, width: 264, borderRadius: 7, backgroundColor: colors.mono_60}}
                inputStyle= {{margin: 0,fontSize: 15}}
                placeholder="標題、種類、物品資訊"
                onChangeText={handleSearch}
                value={search}
              />
          </View>

          <TouchableOpacity 
             style={{flex: 1, width: 60, height: 60, alignItems:'center', justifyContent:'center', backgroundColor: 'transparent'}}
             onPress={toMessage}>
            <Image
              style = {{width: 24, height: 21.99}}
              source = {require("../../assets/general&group/message.png")}/>
            
          </TouchableOpacity>

         <TouchableOpacity 
             style={{flex: 1, left: 0,alignItems:'center', justifyContent:'center',  width: 60, height: 60, backgroundColor: 'transparent'}}
             onPress={toNotification}>
            <Image
              style = {{width: 24, height: 21.99}}
              source = {require("../../assets/general&group/notification.png")}/>
          </TouchableOpacity>    

      </View>
      
      <ScrollView style = {{top: "5%", alignContent: 'center'}}>
        <View>
            <FlatList
              data={search == ''? fullData : data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
        </View>
        
        <View style = {{height: 78,backgroundColor: colors.mono_40,}}></View>
      </ScrollView>

      <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('GroupAdd')}>
         <Image
            // style = {{width: 65, height: 65 }}
            source = {require("../../assets/general/add.png")}/>
      </TouchableOpacity>
    </SafeAreaView>
  )
  

}

export default Group_HOME;

const styles = StyleSheet.create({
  margin: {
    position: 'relative',
    height: "10%",
    backgroundColor: colors.mono_40,
  },
  boxContainer: {
    marginTop: 30,
    height: 99,
    width: 352,
    backgroundColor: colors.mono_40,
    //left: 30,
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
    //width: 65,
    //height: 65,
    position: 'absolute',
    borderRadius: 31.5,
    backgroundColor: 'transparent',
    bottom: "10%",
    right: 169,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});