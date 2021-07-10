import { styleSheets } from 'min-document';
import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity, 
    TextInput,
    } from 'react-native';

import { Picker } from '@react-native-picker/picker';



// const dummyData = [
//   {way:'faceToFace'},
//   {way:'byPost'}
// ];


export default class General_ADD extends React.Component {

  static navigationOptions = {
    title: 'General_ADD',
  }
  constructor(props) {
    super(props);
    this.state = { 
      Gname: '', 
      Discription: '',
      dropdown:' ',
      dummyData: [
        {way: 'Face'},
        {way: 'Post'},
      ] };
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
    const {Gname, Discription, dummyData} = this.state;
    let arr = dummyData.map((item, index)=>{
      if(ind == index){
        item.isSelected = !item.isSelected;
      }
      return {...item}
    })
    console.log("selection handler ==>", arr)
    this.setState({dummyData: arr})
  }

  handlesubmit =() =>{
    
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
    return(
      <View style={styles.container}>
        <Text style={styles.buttonText}>Item Name</Text>
        <TextInput
            style={styles.input}
            placeholder='ItemName'
            onChangeText={(text) => this.setState({Gname: text})}
            value = {this.state.Gname}/>

        <Text style={styles.buttonText}>Discription</Text>
        <TextInput
            style={styles.input}
            placeholder='second hand, not brandnew'
            onChangeText={(text) => this.setState({Discription: text})}
            value = {this.state.Discription}/>

        <Text style={styles.buttonText}>item sort</Text>
        {/* <Picker
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
          </Picker> */}

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
        
        

        <TouchableOpacity
            title = 'upload'
            onPress={this.handleupload}
            style = {styles.item}>
            <Text
              style = {styles.buttonText}>Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity
            title = 'Submit'
            onPress={this.handlesubmit}
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
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemS: {
    backgroundColor: '#7a42f4',
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