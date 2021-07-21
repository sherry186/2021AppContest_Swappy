import * as React  from 'react';
import { ScrollView,
         Pressable,
         View,
         Text,
         SafeAreaView, 
         FlatList, 
         StyleSheet, 
         TouchableOpacity, 
         Image,
         Alert } from "react-native";
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
    }
  

  static navigationOptions = {
    title: 'BreakAway',
    
  }


  renderSpace = ({ item }) => (
    //console.log(this.props.navigation);
    <TouchableOpacity
        onLongPress = {() => this.handleDelete(item)}
        onPress =  {() => this.props.navigation.navigate("BreakAwaySpaceDetail", {spaceId: item.id, complete: item.progress})}
        style={styles.button}
      >
      <Text>{item.spaceName}</Text>
      <Text></Text>
      <ProgressBar
        progress = {(item.progress) % LEVELPOINTS} 
        style={styles.probarStyle} 
        color = {'#FEBC5F'}/> 
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
    
  

  renderImage = ({ item }) => (
    <TouchableOpacity
      onPress = {() => this.props.navigation.navigate("BreakAwayItemDetail", {itemId: item.id, title: item.title, source: JSON.parse(item.image), spaceId: item.spaceName, story: item.story, uploadDate: item.uploadDate})} 
      style={{flexDirection: 'row', width:70, height: 80, margin:10, backgroundColor:'red'}}
      >
      <Image 
        style={{ width: 70, height: 80  }}
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
        
          <FlatList
              style = {{margin: 20}}
              data={this.state.hesitateData}
              renderItem={this.renderImage}
              horizontal = {true}
              keyExtractor={item => item.id}
          />
          <View style = {{flex:3}}>
              <FlatList
                  style = {{bottom: 150}}
                  data={this.state.spaceData}
                  renderItem={this.renderSpace}
                  keyExtractor={item => item.id}
              /> 
              <TouchableOpacity 
                style={styles.button2}
                onPress={() => navigate("BreakAwayADD")}>
                <Text>ADD</Text>
               </TouchableOpacity>
          </View>
          

          

        {
          this.state.shouldShow ? (
          <View style={{flexDirection: 'row', height: 20}}>
            <View style={styles.center, {flex:1}}>
              <TouchableOpacity 
                style={styles.buttonRound}
                onPress={() => navigate("BreakAwayHesitate")}
                >
                <Text>Hesitate</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.center, {flex:1}}>
              <TouchableOpacity 
                style={styles.buttonRound}
                onPress={() => navigate("BreakAwayChangeOut")}
                >
                <Text>ChangeOut</Text>
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
              <Text>Camera</Text>
            </TouchableOpacity>
        </View>

       
      </View>
        
       
    )
  }

}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   },
    container: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center'
    },
    probarStyle: {
      width: 300,
      height: 10,
      backgroundColor: "#E0E0E0"
    },
    item: {
      backgroundColor: colors.function_100,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    image:{
      width: ScreenWidth*0.2, 
      height: ScreenWidth*0.2,  
    },
    imageContainer:{
      flex:1, 
      left: 10, 
      margin : 10, 
      justifyContent:'center', 
      alignItems:'center', 
      flexDirection: 'row'
    },
    button: {
      //flex:1,
      margin: 4,
      width: 350,
      height: 60,
      
      backgroundColor: "#E0E0E0",
      alignItems: 'center',
      alignSelf: 'center',
      //justifyContent: 'center',
    },
    button2: {
      margin: 4,
      width: 350,
      height: 60,
      bottom: 200,
      backgroundColor: "#E0E0E0",
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    buttonRound: {
      position: 'absolute',
      width: 60,
      height: 60,
      borderRadius: 30,
      bottom: 50,
      backgroundColor: "#E0E0E0",
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: colors.mono_40,
      fontSize: 10,
      fontWeight: 'bold',
    },
  });