import { styleSheets } from 'min-document';
import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity, 
    TextInput,
    Image,
    } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import colors from '../../config/colors';


import * as SQLite from 'expo-sqlite'
const database = SQLite.openDatabase('db.SwappyDataBase'); // returns Database object

import { deleteHesitateItem } from '../../localStorageApi/api';

// const dummyData = [
//   {way:'faceToFace'},
//   {way:'byPost'}
// ];


export default class BreakAwayItemChangeOut extends React.Component {

  static navigationOptions = {
    title: 'General_ADD',
  }
  constructor(props) {
    super(props);
    this.state = { 
      ItemName: '', 
      Description: '',
      dropdown:' ',
      deliveryMethod: 0, // 0: Not yet selected, 1: FacetoFace only, 2: byPost only, 3: FacetoFace AND byPost
      dummyData: [ 
        {way: 'faceToFace'},
        {way: 'byPost'},
      ] 
  };
       

    database.transaction(tx => {
      // tx.executeSql(
      //   "DROP TABLE GeneralItems"
      // );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS GeneralItems (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          title TEXT, 
          category TEXT, 
          description TEXT, 
          method INT, 
          image TEXT DEFAULT "No image")`
      )
    })
  }

  

  componentDidMount(){
    let arr = this.state.dummyData.map((item, index)=>{
      item.isSelected = false
      return {...item};
    })
    this.setState({dummyData: arr});
    console.log('arr data ==>', arr)
  }

  selectionHandler = (ind) => {
    //alert("jie")
    const {ItemName, Description, dummyData} = this.state;
    let arr = dummyData.map((item, index)=>{
      if(ind == index){
        item.isSelected = !item.isSelected;
      }
      return {...item}
    })
    console.log("selection handler ==>", arr)
    this.setState({dummyData: arr})
  }

  // summarizes the delivery method into 3 categories:
  // 0: Not yet selected, 1: FacetoFace only, 2: byPost only, 3: FacetoFace AND byPost
  deliveryMethodHandler = () => {
    let facetoFace = this.state.dummyData[0].isSelected;
    let byPost = this.state.dummyData[1].isSelected;
    if(facetoFace == true && byPost == true) {
      return 3;
    } 
    if(facetoFace == true) {
      return 2;
    }
    if(byPost == true) {
      return 1;
    }
    return 0;
  }

  handlesubmit =(itemId) =>{
    //add item to DataBase
    database.transaction(tx => {
      tx.executeSql(
        `INSERT INTO GeneralItems (title, category, description, method, image) VALUES (?, ?, ?, ?, ?)`, 
        [this.state.ItemName, this.state.dropdown, this.state.Description, this.deliveryMethodHandler(),  this.state.ItemName + ' image'],
        (txObj, resultSet) => console.log('Success', resultSet),
        (txObj, error) => console.log('Error', error))
    })

    
    deleteHesitateItem(itemId);
    //Navigate back to home page
    this.props.navigation.navigate('Home')
  } 

  onValueChange = (flag,value) => {
    if(flag ==1){
    this.setState({selected:value});
    }else{
      this.setState({dropdown:value});
    }
  };  

  handleupload = () =>{

  }

  render() {
    const{ navigate } = this.props.navigation;
    const { source, title, itemId } = this.props.route.params;
    console.log(source);
    return(
      <View style={styles.container}>
        <Text style={styles.buttonText}>Item Name</Text>
        <TextInput
            style={styles.input}
            placeholder='ItemName'
            onChangeText={(text) => this.setState({ItemName: text})}
            value = {this.state.ItemName}/>

        <Text style={styles.buttonText}>Description</Text>
        <TextInput
            style={styles.input}
            placeholder='second hand, not brandnew'
            onChangeText={(text) => {this.setState({Description: text}); console.log(this.state.Description)}}
            value = {this.state.Description}/>

        <Text style={styles.buttonText}>item sort</Text>
        <Picker
            mode={'dropdown'}
            style={{height: 25,width:200}}
            selectedValue={this.state.dropdown}
            onValueChange={(value)=>this.onValueChange(2,value)}>
            <Picker.Item label="書籍" value="key0" />
            <Picker.Item label="衣服與配件" value="key1" />
            <Picker.Item label="玩具" value="key2" />
            <Picker.Item label="特色周邊品" value="key3" />
            <Picker.Item label="小型生活器具" value="key4" />
            <Picker.Item label="家電用品" value="key5" />
            <Picker.Item label="其他" value="key6" />
          </Picker>

        <View style={{flexDirection: 'row'}}>
          {
            this.state.dummyData.map((item, index)=>{
              return(
                <TouchableOpacity
                  onPress={()=>this.selectionHandler(index)}
                  title = 'upload'
                  //onPress={this.handleupload}
                  style = {item.isSelected ? styles.item : styles.itemS}>
                  <Text style = {styles.buttonText}>{item.way}</Text> 
                </TouchableOpacity>
              );
            })
          }
        </View>
        
        <Image 
            style={{ width: 100, height: 100  }}
            source={source}/>

        {/* <TouchableOpacity
            title = 'upload'
            onPress={this.handleupload}
            style = {styles.item}>
            <Text
              style = {styles.buttonText}>Upload</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
            title = 'Submit'
            onPress={()=>this.handlesubmit(itemId)}
            style = {styles.item}>
            <Text
              style = {styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        {/* <Button
            title = 'Go to home screen'
            onPress={() => navigate('Home')}/> */}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  picker: {
    width: 100,
    height: 10,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
    paddingTop: 23
  },
  item: {
    backgroundColor: colors.mono_60,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemS: {
    backgroundColor: colors.function_100,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  buttonText: {
    //color: '#fff',
    fontSize: 15,
    left: 3,

    fontWeight: 'bold',
  },
});