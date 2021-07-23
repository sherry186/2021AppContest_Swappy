import { styleSheets } from 'min-document';
import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity, 
    TextInput,
    ScrollView,
    Dimensions,
    } from 'react-native';


let ScreenWidth = Dimensions.get("window").width;

function GroupAddItem ({route, navigation}) {

  

  const [Gname, setGname] = useState('');
  const [Discription, setDiscription] = useState('');
  const [Ihave, setIhave] = useState([]);
  const [dummyData, setDummyData] = useState([{way: 'faceToFace'},
                                               {way: 'byPost'}]);

  const [image, setImage] = useState([]);
  

  useEffect(()=>{
     let arr = dummyData.map((item, index)=>{
       item.isSelected = false
       return {...item};
     })
     const {tags} = route.params;
     let arr2 = tags.map((item, index)=>{
       item.isSelected = false
       return {...item};
     })
     const tags2 = tags
     let arr3 = tags2.map((item, index)=>{
       item.isSelected = false
       return {...item}
     })

    setDummyData(arr);
    setIhave(arr2);

    // this.setState({dummyData: arr, Ihave: arr2, Iwant: arr3});
     console.log('arr data ==>', arr)
  }, []);


  const selectionHandlerSort = (ind) => {
    
    let arr2 = Ihave.map((item, index)=>{
      if(ind == index){
        item.isSelected = !item.isSelected;
      }
      return {...item}
    })
    console.log("selection handler ==>", arr2)
    setIhave(arr2)
  }

  const selectionHandler = (ind) => {
    //alert("jie")
    //const {Gname, Discription, Ihave, Iwant, dummyData} = this.state;
    let arr1 = dummyData.map((item, index)=>{
      if(ind == index){
        item.isSelected = !item.isSelected;
      }
      return {...item}
    })
    //console.log("selection handler1 ==>", arr1)
    setDummyData(arr1)
  }

  const handlesubmit =() =>{
    navigation.goBack()
  } 

  const handleupload = () =>{

  }

  
    return(
      <View style={styles.container}>
        <Text style={styles.buttonText}>Item Name</Text>
        <TextInput
            style={styles.input}
            placeholder='ItemName'
            onChangeText={(text) => setGname(text)}
            value = {Gname}/>

        <Text style={styles.buttonText}>Discription</Text>
        <TextInput
            style={styles.input}
            placeholder='second hand, not brandnew'
            onChangeText={(text) => setDiscription(text)}
            value = {Discription}/>

        <Text style={styles.buttonText}>I have</Text>
        <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
          {
            Ihave.map((item, index)=>{
              return(
                <TouchableOpacity
                  onPress={()=>selectionHandlerSort(index)}
                  title = 'sort'
                  //onPress={this.handleupload}
                  style = {item.isSelected ? styles.item : styles.itemS}>
                  <Text style = {styles.buttonText}>{item.name}</Text> 
                </TouchableOpacity>
              );
            })
          }
        </ScrollView>


        <Text style={styles.buttonText}>method: </Text>
        <View style={{flexDirection: 'row'}}>
          {
            dummyData.map((item, index)=>{
              return(
                <TouchableOpacity
                  onPress={()=>selectionHandler(index)}
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
            title = 'Submit'
            onPress={handlesubmit}
            style = {styles.item}>
            <Text
              style = {styles.buttonText}>Submit</Text>
        </TouchableOpacity>

      </View>
    )
  // }

}

export default GroupAddItem;

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