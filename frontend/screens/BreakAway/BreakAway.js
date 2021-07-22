import * as React  from 'react';
import { ScrollView,
         Pressable,
         View,
         Text,
         SafeAreaView, 
         FlatList, 
         StyleSheet, 
         TouchableOpacity, 
         KeyboardAvoidingView,
         Image,
         Alert,
         TextInput } from "react-native";
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)
import { ProgressBar } from "react-native-paper";
import BreakAwaySpace from '../../Data/BreakAwaySpace';
import BreakAwayItems from '../../Data/BreakAwayItems';
import colors from '../../config/colors'
import { useState } from 'react';

import * as SQLite from 'expo-sqlite'
const database = SQLite.openDatabase('db.SwappyDataBase'); // returns Database object
import { deleteHesitateItem, deleteSpace } from '../../localStorageApi/api';

import { Dimensions } from 'react-native';
let ScreenWidth = Dimensions.get("window").width;

const LEVELPOINTS = 20


export default class BreakAway extends React.Component {


    state = {
      spaceData: [],
      hesitateData: [],
      itemData: [],
      shouldShow: false,
      newSpaceName:'',
    }
  

  static navigationOptions = {
    title: 'BreakAway',
    
  }


  renderSpace = ({ item }) => (
    //console.log(this.props.navigation);
    <TouchableOpacity
        onLongPress = {() => this.handleDelete(item)}
        onPress =  {() => this.props.navigation.navigate("BreakAwaySpaceDetail", {spaceId: item.id, complete: item.progress, spaceName: item.spaceName})}
        style={styles.button}
      >
      <View style = {styles.buttonTitleC}>
        <Text style = {styles.buttonTitle}>{item.spaceName}</Text>
      </View>
      
      <View style = {styles.probarC}>
          <ProgressBar
            progress = {((item.progress) % LEVELPOINTS) / LEVELPOINTS} 
            style={styles.probarStyle} 
            color = {colors.function_100}/> 
      </View>
      
    </TouchableOpacity> 
      
  );

  handleDelete = (item) => {

    console.log(item);
    Alert.alert(
      "刪除此空間？",
      "",
      [
        {
          text: "確定",
          onPress: () => {
            //console.log("Cancel Pressed");
            deleteSpace(item.id);
        },
          style: "cancel"
        },
        { text: "取消", onPress: () => console.log("OK Pressed") }
      ]);
  }

  // deleteSpaceAlert = () => 
  
  handleAddSpace = () =>{

  }
  

  renderImage = ({ item }) => (
    
    <TouchableOpacity
      onPress = {() => this.props.navigation.navigate("BreakAwayItemDetail", {itemId: item.id, title: item.title, source: JSON.parse(item.image), spaceId: item.spaceName, story: item.story, uploadDate: item.uploadDate})} 
      style={{width:ScreenWidth* 0.3, height: ScreenWidth* 0.3, margin:ScreenWidth* 0.03, backgroundColor:'red'}}
      >
      <Image 
        style={{ width: "100%", height: "100%"  }}
        source={{uri: JSON.parse(item.image)[0].uri}}/>
    </TouchableOpacity>
  );

  getSpaces = () => {
      // database.transaction(tx => {
      //   tx.executeSql(
      //     "DROP TABLE MyHesitatingItems"
      //   );}
      // );
    database.transaction(tx => {
        tx.executeSql('SELECT * FROM MySpaces', 
        null,
        (txObj, resultSet) => {
            //console.log('Success', resultSet);
            let spacesData = resultSet.rows._array;
            this.setState({
              spaceData: spacesData,
            });
            console.log(this.state.spaceData);
    },
        (txObj, error) => console.log('Error', error))
    });
}

getHesitateItems = () => {
  database.transaction(tx => {
      tx.executeSql('SELECT * FROM MyHesitatingItems', 
      null,
      (txObj, resultSet) => {
          //console.log('Success', resultSet);
          let hesitateData = resultSet.rows._array;
          this.setState({
            hesitateData: hesitateData,
          });
          //console.log(hesitateData);
          
  },
      (txObj, error) => console.log('Error', error))
  });
}

  


  componentDidMount() {
    //database._db.close();
    //this.getSpaces();
    this.setState({
      //spaceData: BreakAwaySpace,
      itemData: BreakAwayItems,
    });
  }
  

  render() {
    this.getSpaces();
    this.getHesitateItems();
    // const[grvalue, grsetValue] = useState('');
    const{ navigate } = this.props.navigation;
    //console.log(this.props.navigation);
    const{ shouldShow } = this.state;

    return(
      <View style={{flex:1, flexDirection: 'column'}}> 
          <View style = {{height:30, backgroundColor: 'transparent'}}></View>
          <View style = {{flex:1.2, alignItems: 'center', justifyContent:'center', backgroundColor: 'transparent'}}>
              <FlatList
                  data={this.state.hesitateData}
                  renderItem={this.renderImage}
                  horizontal = {true}
                  keyExtractor={item => item.id}
              />
          </View>
          <View style = {styles.line}></View>

          <View style = {{flex: 3,justifyContent:'center', alignItems:'center', backgroundColor: 'transparent'}}>
              <View style = {{flex:3, width:"100%",}}>
                <View style = {{flex: 3,  justifyContent:'center', backgroundColor:'transparent' }}>
                    <FlatList
                          data={this.state.spaceData}
                          renderItem={this.renderSpace}
                          keyExtractor={item => item.id}
                      /> 
                </View>
                <View style = {{flex: 0.7, alignItems:'center', backgroundColor: 'transparent'}}>
                  
                  <View style = {styles.inputContainer}>
                       <TextInput
                         style={styles.input}
                         placeholderTextColor = {colors.function_100}
                         onChangeText={(text) => this.setState({newSpaceName: text})}
                         value={this.state.newSpaceName} />   
                       <TouchableOpacity
                         onPress = {() => this.setState({newSpaceName: ""})}
                         style ={{
                           right: "1%",
                           width: "7%", 
                           height: "100%",
                           justifyContent: 'center',
                           alignItems:'center'}}
                       >
                         <Image
                           style ={{
                             width: 15, 
                             height: 15,
                             }} 
                           source = {require('../../assets/breakAway/delete.png')}/>
                       </TouchableOpacity>

                       <TouchableOpacity
                         onPress = {()=>this.handleAddSpace()}
                         style ={{
                           right: 0,  
                           width: "7%", 
                           height: "100%",
                           justifyContent:'center',
                           alignItems:'center'}}
                       >
                         <Image
                           style ={{
                             width: 15, 
                             height: 15,
                             }} 
                           source = {require('../../assets/breakAway/ok.png')}/>
                       </TouchableOpacity>
                   </View>                

                </View>
              </View>
              <View style = {{flex:0.4, backgroundColor: 'green', }}></View>

          </View>
          

          
        <View style = {{flex:1.5, justifyContent:'center', alignItems:'center', backgroundColor:'transparent'}}>
            {
              this.state.shouldShow ? (
              <View style={{flexDirection: 'row', height: 20,alignItems:'center'}}>
                <View style={{flex:1, alignItems:'center',left: ScreenWidth*0.11, backgroundColor:'transparent'}}>
                  <TouchableOpacity 
                    style={styles.buttonRoundhech}
                    onPress={() => navigate("BreakAwayHesitate")}
                    >
                    <Image
                      style = {styles.buttonRoundhech}
                      source = {require('../../assets/breakAway/猶豫.png')}/>
                    <Text style = {styles.hech}>猶豫</Text>
                  </TouchableOpacity>
                </View>
              
                <View style={{flex:1, alignItems:'center', right: ScreenWidth*0.11, backgroundColor:'transparent'}}>
                  <TouchableOpacity 
                    style={styles.buttonRoundhech}
                    onPress={() => navigate("BreakAwayChangeOut")}
                    >
                    <Image
                      style = {styles.buttonRoundhech}
                      source = {require('../../assets/breakAway/換出.png')}/>
                    <Text style = {styles.hech}>換出</Text>
                  </TouchableOpacity>
                </View>                
              </View>
              ) : null
            }

          
            <View style={{margin: 20, flexDirection:'column'}}>
                <TouchableOpacity 
                  style={styles.buttonRound}
                  onPress={() => this.setState({shouldShow: !shouldShow})}
                  >
                  <Image
                      style = {styles.buttonRound}
                      source = {require('../../assets/breakAway/camera.png')}/>
                </TouchableOpacity>
            </View>
        </View>
       
      </View>
        
       
    )
  }

}

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: colors.function_100,
    width: "90%",
    alignSelf:"center",
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   },
  probarStyle: {
    width: "100%",
    borderRadius: 5,
    height: 10,
    backgroundColor: colors.mono_60
  },  
  probarC:{
    flex: 7,
    height:'100%', 
    justifyContent:'center', 
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 32,
  },
  image:{
    width: ScreenWidth*0.2, 
    height: ScreenWidth*0.2,  
  },  
  button: {
    //flex:1,
    margin: 4,
    width: "90%",
    height: 45,
    flexDirection:'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    alignSelf: 'center',
    //justifyContent: 'center',
  },
  buttonTitle:{
    fontSize:15,
    fontWeight:'bold',
    color: colors.function_100,
  },
  buttonTitleC:{
    flex: 2, 
    height: '100%', 
    alignItems: 'center', 
    justifyContent:'center', 
    backgroundColor: 'transparent'
  },
  button2: {
    margin: 4,
    width: 350,
    height: 60,
    backgroundColor: "#E0E0E0",
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonRoundhech: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRound: {
    width: 65,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    //top: 14,
    color: colors.mono_80,
    left: 10,
    height: "90%",
    width: "85%",
    borderWidth: 0,
  },
  inputContainer:{
    flexDirection: 'row',
    margin:10,
    height: "50%",
    width: "90%",
    borderWidth: 1,
    //borderRadius:6,
    borderColor: colors.mono_80,
    backgroundColor: 'transparent',
  },
  hech:{
    fontSize:10,
    color: colors.mono_100,
  }
});