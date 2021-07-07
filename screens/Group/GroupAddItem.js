import { styleSheets } from 'min-document';
import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity, 
    TextInput,
    ScrollView} from 'react-native';




export default class GroupAddItem extends React.Component {

  static navigationOptions = {
    title: 'GroupAddItem',
  }

  

  constructor(props) {
    super(props);
    this.state = { 
      Gname: '', 
      Discription: '', 
      Ihave: [],
      Iwant: [],
      dummyData: [
        {way: 'faceToFace'},
        {way: 'byPost'},
      ]};
  }

  componentDidMount(){
    let arr = this.state.dummyData.map((item, index)=>{
      item.isSelected = false
      return {...item};
    })
    const {tags} = this.props.route.params
    let arr2 = tags.map((item, index)=>{
      item.isSelected = false
      return {...item};
    })

    const tags2 = tags
    let arr3 = tags2.map((item, index)=>{
      item.isSelected = false
      return {...item}
    })
    
    this.setState({dummyData: arr, Ihave: arr2, Iwant: arr3});
    console.log('arr data ==>', arr)
  }

  selectionHandlerSort2 = (ind) => {
    //alert("jie")
    const {Gname, Discription, Ihave, Iwant, dummyData} = this.state;
    let arr3 = Iwant.map((item, index)=>{
      if(ind == index){
        item.isSelected = !item.isSelected;
      }
      return {...item}
    })
    console.log("selection handler ==>", arr3)
    this.setState({Iwant: arr3})
  }

  selectionHandlerSort = (ind) => {
    //alert("jie")
    const {Gname, Discription, Ihave, Iwant, dummyData} = this.state;
    let arr2 = Ihave.map((item, index)=>{
      if(ind == index){
        item.isSelected = !item.isSelected;
      }
      return {...item}
    })
    console.log("selection handler ==>", arr2)
    this.setState({Ihave: arr2})
  }

  selectionHandler = (ind) => {
    //alert("jie")
    const {Gname, Discription, Ihave, Iwant, dummyData} = this.state;
    let arr1 = dummyData.map((item, index)=>{
      if(ind == index){
        item.isSelected = !item.isSelected;
      }
      return {...item}
    })
    console.log("selection handler1 ==>", arr1)
    this.setState({dummyData: arr1})
  }

  handlesubmit =() =>{
    
    this.props.navigation.goBack()
  } 

  handleupload = () =>{

  }

  render() {
    const{ navigate } = this.props.navigation;
    //const{ tags } = this.props.route.params;
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

        <Text style={styles.buttonText}>I have</Text>
        <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
          {
            this.state.Ihave.map((item, index)=>{
              return(
                <TouchableOpacity
                  onPress={()=>this.selectionHandlerSort(index)}
                  title = 'sort'
                  //onPress={this.handleupload}
                  style = {item.isSelected ? styles.item : styles.itemS}>
                  <Text style = {styles.buttonText}>{item.name}</Text> 
                </TouchableOpacity>
              );
            })
          }
        </ScrollView>

        <Text style={styles.buttonText}>I want</Text>
        <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
          {
            this.state.Iwant.map((item, index)=>{
              return(
                <TouchableOpacity
                  onPress={()=>this.selectionHandlerSort2(index)}
                  title = 'sort2'
                  //onPress={this.handleupload}
                  style = {item.isSelected ? styles.item : styles.itemS}>
                  <Text style = {styles.buttonText}>{item.name}</Text> 
                </TouchableOpacity>
              );
            })
          }
        </ScrollView>



        <View style={{flexDirection: 'row'}}>
          {
            this.state.dummyData.map((item, index)=>{
              return(
                <TouchableOpacity
                  onPress={()=>this.selectionHandler(index)}
                  title = 'method'
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
    left: 5,
    fontWeight: 'bold',
  },
});