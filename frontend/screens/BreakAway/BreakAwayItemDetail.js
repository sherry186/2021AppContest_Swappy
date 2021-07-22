import * as React from 'react';

import { View,
       Text,
       Button, 
       Image, 
       FlatList, 
       SafeAreaView, 
       ScrollView, 
       TouchableOpacity,
       StyleSheet } from "react-native";
import BreakAwaySpace from '../../Data/BreakAwaySpace';

import * as SQLite from 'expo-sqlite'
const database = SQLite.openDatabase('db.SwappyDataBase'); // returns Database object

import { deleteHesitateItem, createMyStoriesTable, createStoryItem, updateProgress } from '../../localStorageApi/api';


/* 2. Get the param */
export default class BreakAwayItemDetail extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      spaceName: '',
    }
  }

  renderImage = ({ item }) => (
    <Image 
      style={{ width: 100, height: 100  }}
      source={item}/>
  );

  handleChangeOut = (itemId, title, source, story, spaceId) =>{
    const JSONimage = JSON.stringify(source);
    createStoryItem(title, story, JSONimage, spaceId);
    const changeOutPoints = 2.0;
    updateProgress(spaceId, changeOutPoints);
    this.props.navigation.navigate("BreakAwayItemChangeOut", {id: itemId, title: title, source: source})
  }

  handleKeep = (itemId, title, source, story, spaceId) =>{
    const JSONimage = JSON.stringify(source);
    createStoryItem(title, story, JSONimage, spaceId);
    deleteHesitateItem(itemId);

    const keepPoints = 2.0
    updateProgress(spaceId, keepPoints);
    this.props.navigation.goBack()
  }


  getSpaceName = (spaceId) => {
    database.transaction(tx => {
        tx.executeSql('SELECT spaceName FROM MySpaces WHERE id = ? LIMIT 1', 
        [spaceId],
        (txObj, resultSet) => {
            //console.log('Success', resultSet);
            let spaceName = resultSet.rows._array[0].spaceName;
            //console.log(spaceName);
            this.setState({
              spaceName,
            });
    },
        (txObj, error) => console.log('Error', error))
    })
};

componentDidMount() {
  createMyStoriesTable();
}
  
  render(){  
    const { itemId, title, source, spaceId, story, uploadDate} = this.props.route.params;
    this.getSpaceName(spaceId);
    //console.log('source', source);
    return (
      <View style={{ flex: 1, top: "5%", bottom:"20%", alignItems: 'center'}}>
        
        <FlatList
              style = {{margin: 20}}
              data={source}
              renderItem={this.renderImage}
              horizontal = {true}
          />
        <Text>Space: {this.state.spaceName}</Text>
        <Text>Story: {story}</Text>
       
        <View style= {{flexDirection: 'row'}}>
            <TouchableOpacity
                  onPress={()=>this.handleChangeOut(itemId, title, source, story, spaceId)}
                  title = '換出'
                  style = {styles.item}>
                  <Text style = {styles.buttonText}>換出</Text> 
            </TouchableOpacity>
            <TouchableOpacity
                  onPress={()=>this.handleKeep(itemId, title, source, story, spaceId)}
                  title = '留下'
                  style = {styles.item}>
                  <Text style = {styles.buttonText}>留下</Text> 
            </TouchableOpacity>
        </View>
        
      </View>
    );
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