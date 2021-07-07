import { styleSheets } from 'min-document';
import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity, 
    TextInput} from 'react-native';




export default class GroupAddItem extends React.Component {

  static navigationOptions = {
    title: 'GroupAddItem',
  }
  constructor(props) {
    super(props);
    this.state = { 
      Gname: '', 
      Discription: '', 
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
    
    this.props.navigation.goBack()
  } 

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