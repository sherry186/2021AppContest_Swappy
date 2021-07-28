import { styleSheets } from 'min-document';
import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity, 
    TextInput,
    Image,
    } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import * as SQLite from "expo-sqlite";
import colors from '../../config/colors';
import { useNavigation } from '@react-navigation/core';

import { useMutation,  gql } from '@apollo/client';
import { createMyStoriesTable, createStoryItem, updateProgress } from '../../localStorageApi/api';


const database = SQLite.openDatabase('db.SwappyDataBase'); // returns Database object


const CREATE_GENERALITEM = gql`
mutation createGeneralItem ($title: String!, $description: String!, $category: String!, $exchangeMethod: String!, $image: String) {
  createGeneralItem(input: {
    title: $title
    description: $description
    category: $category
    exchangeMethod: $exchangeMethod
    image: $image
  }) {
    id
    owner {
      username
      id
    }
    description
  }
}`;


const BreakAwayChangeOut = () => {
  const [ItemName, setItemName] = useState('');
  const [Description, setDescription] = useState('');
  const [story, setStory] = useState('');
  const [dropdown, setDropdown] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [space, setSpace] = useState('');
  const [dummyData, setdummyData] = useState([ {way: '面交'}, {way: '郵寄'}]);
  const [data1, setData1] = useState([]);
  const navigation = useNavigation();

  //const [image, setImage] = useState([]);

  const [createItem, { data, error, loading }] = useMutation(CREATE_GENERALITEM);

  useEffect(() => {
    let arr = dummyData.map((item, index)=>{
      item.isSelected = false
      return {...item};
    })
    setdummyData(arr);
    console.log('arr data ==>', arr)
  }, []);

  useEffect(() => {
    createMyStoriesTable();
    console.log();

    database.transaction(tx => {
      tx.executeSql('SELECT * FROM MySpaces', 
      null,
      (txObj, resultSet) => {
          //console.log('Success', resultSet);
          let spacesData = resultSet.rows._array;
          setData1(spacesData);
          //console.log(data);
  },
      (txObj, error) => console.log('Error', error))
  });
  }, []);

  const addToStory = (title, source, story, spaceId) =>{
    createStoryItem(title, story, source, spaceId);

    const keepPoints = 2.0
    updateProgress(spaceId, keepPoints);
  }

  const selectionHandler = (ind) => {
    //alert("jie")
    let arr = dummyData.map((item, index)=>{
      if(ind == index){
        item.isSelected = !item.isSelected;
      }
      return {...item}
    })
    console.log("selection handler ==>", arr)
    setdummyData(arr);
  }

  // summarizes the delivery method into 3 categories:
  // 0: Not yet selected, 1: FacetoFace only, 2: byPost only, 3: FacetoFace AND byPost
  const deliveryMethodHandler = () => {
    let facetoFace = dummyData[0].isSelected;
    let byPost = dummyData[1].isSelected;
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

  const handlesubmit =() =>{
    //add item to DataBase
    // database.transaction(tx => {
    //   tx.executeSql(
    //     `INSERT INTO GeneralItems (title, category, description, method, image) VALUES (?, ?, ?, ?, ?)`, 
    //     [ItemName, dropdown, Description, deliveryMethodHandler(),  ItemName + ' image'],
    //     (txObj, resultSet) => console.log('Success', resultSet),
    //     (txObj, error) => console.log('Error', error))
    // })

    //add to general Item storage
    createItem({variables: { title: ItemName, description: Description, category: dropdown, exchangeMethod: deliveryMethod}});

    //add to sotry collection
    const dummyImageURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEX09PTMzMzJycnPz8/d3d3V1dXi4uLo6Ojw8PDx8fH39/ft7e3Y2NjQ0NDp6enb29uHE20LAAACaklEQVR4nO3b6W6CQBhGYUTWD9T7v9uylLIN6jCk8Cbn+deEGo6DMOAYRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIJyFiuzshLesStJAdVZdufEV38LFydkZm6w+IrBJrK86itkxgU1ifnaKmz363QvUvsbjmoNYdjuXPPMQz6R7lfLsGKeq3bd76LvfHwnFIXt0tOKYwjuF51kVtjMUbzqFVmR1/cpK30idwv7qH98yz0SVwvI+XP19JygqhY9xehMnXokihfl0/hZ77a5I4WM2zXz5DKJI4XwKvjHLNGeGRmE1L7w7N7fKeRLSKCy+KGwCnedZjcJofruXuo7SbpwdiRqFlk4D42y9rf0eyOtEjcL5BzFeb2rV5oRApNAmj6QcjyRs8g4sE0UKJ4nxemJq8yGeJ6oURpY/uic26frppy0uJvNEmcI2JM/yovlz8cxlGbhIFCrcsA6cX0/kC52Bt3hMlC90Bk5HUbzQPYL9KA6b6BXmk8/YZuCYqFdYj/f47wL/EtUKrR6/LXsfOCSKFbaBQ+KnwGa79sqpVWjp7x1Ec6B+DhQsHAK7xM+BeoVjYLPzr499eoXTwO+IFfoHihXuWbWgVVh792kV7lt3IlRoe0ZQqvCLax+FZ8c4UUghheebFu6jU1gk++gU7l3t3f2rRmGAyxcGr329cuEh60stunBh2Z3y6yxM/wX52S1u/bf3Ryzzdq9tuIDnYWv1q7NTNlhy0O8t/Nb6/SfLbnHoYbpjSep/sjLfOZ0ZXfTXJKPgH69deAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDyA0uAKIxQw0bjAAAAAElFTkSuQmCC'
    console.log(space);
    addToStory(ItemName, dummyImageURI, story, space)
    //Navigate back to home page
    navigation.navigate('Home')
  }

  const onValueChange = (flag,value) => {
    setDropdown(value);
  }; 

  const handleupload = () =>{

  }

  return (
      <View style={styles.container}>
        <Text style={styles.buttonText}>Item Name</Text>
        <TextInput
            style={styles.input}
            placeholder='ItemName'
            onChangeText={(text) => setItemName(text)}
            value = {ItemName}/>

        <Text style={styles.buttonText}>Description</Text>
        <TextInput
            style={styles.input}
            placeholder='second hand, not brandnew'
            onChangeText={(text) => {setDescription(text); console.log(Description)}}
            value = {Description}/>

        <Text style={styles.buttonText}>Story</Text> 
        <TextInput
            style={styles.input}
            placeholder='before you change out, say something about it'
            onChangeText={(text) => {setStory(text)}}
            value = {story}/>

        <Text style={styles.buttonText}>item sort</Text>
        <Picker
            mode={'dropdown'}
            style={{height: 25,width:200}}
            selectedValue={dropdown}
            onValueChange={(value)=>onValueChange(2,value)}>
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
            dummyData.map((item, index)=>{
              return(
                <TouchableOpacity
                  onPress={()=>selectionHandler(index)}
                  title = 'upload'
                  //onPress={this.handleupload}
                  style = {item.isSelected ? styles.item : styles.itemS}>
                  <Text style = {styles.buttonText}>{item.way}</Text> 
                </TouchableOpacity>
              );
            })
          }
        </View>
        
        <View style ={styles.textInputContainer}>
          <View style = {{flex: 0.5}}></View>
            <View style = {{flex: 3.5, justifyContent: 'center'}}>
                <Picker
                  mode={'dropdown'}
                  //style={styles.input3}
                  selectedValue={space}
                  // onValueChange={(value)=>onValueChange(2 ,value)}
                  onValueChange= {(itemValue, itemIndex) => setSpace(itemValue)}>
                  {
                    data1.map((item, index)=>{
                      return(
                        <Picker.Item label= {item.spaceName} value= {item.id} />
                      );
                    })
                  }
                </Picker>
            </View>
            <View style = {{flex: 6}}></View>
          </View>

        <TouchableOpacity
            title = 'upload'
            onPress={handleupload}
            style = {styles.item}>
            <Text
              style = {styles.buttonText}>Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity
            title = 'Submit'
            onPress={handlesubmit}
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

export default BreakAwayChangeOut;

// export default class BreakAwayChangeOut extends React.Component {

//   static navigationOptions = {
//     title: 'General_ADD',
//   }
//   constructor(props) {
//     super(props);
//     this.state = { 
//       ItemName: '', 
//       Description: '',
//       story: '',
//       dropdown:' ',
//       deliveryMethod: 0, // 0: Not yet selected, 1: FacetoFace only, 2: byPost only, 3: FacetoFace AND byPost
//       dummyData: [ 
//         {way: 'faceToFace'},
//         {way: 'byPost'},
//       ] 
//   };
       

//     dataBase.transaction(tx => {
//       // tx.executeSql(
//       //   "DROP TABLE GeneralItems"
//       // );
//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS GeneralItems (
//           id INTEGER PRIMARY KEY AUTOINCREMENT, 
//           title TEXT, 
//           category TEXT, 
//           description TEXT, 
//           method INT, 
//           image TEXT DEFAULT "No image")`
//       )
//     })
//   }

  

//   componentDidMount(){
//     let arr = this.state.dummyData.map((item, index)=>{
//       item.isSelected = false
//       return {...item};
//     })
//     this.setState({dummyData: arr});
//     console.log('arr data ==>', arr)
//   }

//   selectionHandler = (ind) => {
//     //alert("jie")
//     const {ItemName, Description, dummyData} = this.state;
//     let arr = dummyData.map((item, index)=>{
//       if(ind == index){
//         item.isSelected = !item.isSelected;
//       }
//       return {...item}
//     })
//     console.log("selection handler ==>", arr)
//     this.setState({dummyData: arr})
//   }

//   // summarizes the delivery method into 3 categories:
//   // 0: Not yet selected, 1: FacetoFace only, 2: byPost only, 3: FacetoFace AND byPost
//   deliveryMethodHandler = () => {
//     let facetoFace = this.state.dummyData[0].isSelected;
//     let byPost = this.state.dummyData[1].isSelected;
//     if(facetoFace == true && byPost == true) {
//       return 3;
//     } 
//     if(facetoFace == true) {
//       return 2;
//     }
//     if(byPost == true) {
//       return 1;
//     }
//     return 0;
//   }

//   handlesubmit =() =>{
//     //add item to DataBase
//     dataBase.transaction(tx => {
//       tx.executeSql(
//         `INSERT INTO GeneralItems (title, category, description, method, image) VALUES (?, ?, ?, ?, ?)`, 
//         [this.state.ItemName, this.state.dropdown, this.state.Description, this.deliveryMethodHandler(),  this.state.ItemName + ' image'],
//         (txObj, resultSet) => console.log('Success', resultSet),
//         (txObj, error) => console.log('Error', error))
//     })
//     //Navigate back to home page
//     this.props.navigation.navigate('Home')
//   } 

//   onValueChange = (flag,value) => {
//     if(flag ==1){
//     this.setState({selected:value});
//     }else{
//       this.setState({dropdown:value});
//     }
//   };  

//   handleupload = () =>{

//   }

//   render() {
//     const{ navigate } = this.props.navigation;
//     //const { source } = this.props.route.params;
//     return(
//       <View style={styles.container}>
//         <Text style={styles.buttonText}>Item Name</Text>
//         <TextInput
//             style={styles.input}
//             placeholder='ItemName'
//             onChangeText={(text) => this.setState({ItemName: text})}
//             value = {this.state.ItemName}/>

//         <Text style={styles.buttonText}>Description</Text>
//         <TextInput
//             style={styles.input}
//             placeholder='second hand, not brandnew'
//             onChangeText={(text) => {this.setState({Description: text}); console.log(this.state.Description)}}
//             value = {this.state.Description}/>

//         <Text style={styles.buttonText}>Story</Text> 
//         <TextInput
//             style={styles.input}
//             placeholder='before you change out, say something about it'
//             onChangeText={(text) => {this.setState({story: text})}}
//             value = {this.state.story}/>

//         <Text style={styles.buttonText}>item sort</Text>
//         <Picker
//             mode={'dropdown'}
//             style={{height: 25,width:200}}
//             selectedValue={this.state.dropdown}
//             onValueChange={(value)=>this.onValueChange(2,value)}>
//             <Picker.Item label="書籍" value="key0" />
//             <Picker.Item label="衣服與配件" value="key1" />
//             <Picker.Item label="玩具" value="key2" />
//             <Picker.Item label="特色周邊品" value="key3" />
//             <Picker.Item label="小型生活器具" value="key4" />
//             <Picker.Item label="家電用品" value="key5" />
//             <Picker.Item label="其他" value="key6" />
//           </Picker>

//         <View style={{flexDirection: 'row'}}>
//           {
//             this.state.dummyData.map((item, index)=>{
//               return(
//                 <TouchableOpacity
//                   onPress={()=>this.selectionHandler(index)}
//                   title = 'upload'
//                   //onPress={this.handleupload}
//                   style = {item.isSelected ? styles.item : styles.itemS}>
//                   <Text style = {styles.buttonText}>{item.way}</Text> 
//                 </TouchableOpacity>
//               );
//             })
//           }
//         </View>
        
        

//         <TouchableOpacity
//             title = 'upload'
//             onPress={this.handleupload}
//             style = {styles.item}>
//             <Text
//               style = {styles.buttonText}>Upload</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//             title = 'Submit'
//             onPress={this.handlesubmit}
//             style = {styles.item}>
//             <Text
//               style = {styles.buttonText}>Submit</Text>
//         </TouchableOpacity>

//         {/* <Button
//             title = 'Go to home screen'
//             onPress={() => navigate('Home')}/> */}
//       </View>
//     )
//   }

// }

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