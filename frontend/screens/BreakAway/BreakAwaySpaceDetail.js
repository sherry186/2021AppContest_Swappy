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

import _ from "lodash"; //MUST include for filtering lists (i.e. searching)

import * as SQLite from 'expo-sqlite'
const database = SQLite.openDatabase('db.SwappyDataBase'); // returns Database object

import BreakAwayItems from '../../Data/BreakAwayItems';
import CircularProgress from 'react-native-circular-progress-indicator';
/* 2. Get the param */



export default class BreakAwaySpaceDetail extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      hesitate: [], 
      fullData: [],
      hesitateItems: [],
      storyItems: []
    };
  }

  getHesitateItemsBySpace = (spaceName) => {
    database.transaction(tx => {
        tx.executeSql('SELECT * FROM MyHesitatingItems WHERE spaceName = ?', 
        [spaceName],
        (txObj, resultSet) => {
            //console.log('Success', resultSet);
            let item = resultSet.rows._array;
            this.setState({
              hesitateItems: item,
            });
            //console.log(this.state.hesitateItems);
    },
        (txObj, error) => console.log('Error', error))
    })
  };

  getStoryItemsBySpace = (spaceName) => {
    database.transaction(tx => {
        tx.executeSql('SELECT * FROM MyStoryItems WHERE spaceName = ?', 
        [spaceName],
        (txObj, resultSet) => {
            //console.log('Success', resultSet);
            let item = resultSet.rows._array;
            this.setState({
              storyItems: item,
            });
            console.log('storyitems',item);
    },
        (txObj, error) => console.log('Error', error))
    })
};

  renderHesitate = ({ item }) => ( 
    <TouchableOpacity
        style ={{flexDirection: 'row', width:70, height: 80, margin:10, alignItems: 'center', justifyContent: 'center'}}
        onPress = {() => this.props.navigation.navigate("BreakAwayItemDetail", {itemId: item.id, title: item.title, source: JSON.parse(item.image), spaceId: item.spaceName, story: item.story, uploadDate: item.reminderDate})}
        >
        <Image 
          style={{width: 60, height: 60,  }}
          source={JSON.parse(item.image)}/>
    </TouchableOpacity>
    
  )

  renderStory = ({ item }) => ( 
    <TouchableOpacity
      style ={{flexDirection: 'row', width:70, height: 80, margin:10, alignItems: 'center', justifyContent: 'center'}}
      onPress = {() => this.props.navigation.navigate("BreakAwayItemStory", {title: item.title, story: item.story, image: JSON.parse(item.image)})}
      >
        <Image 
          style={{flexDirection: 'row', width: 60, height: 60,  }}
          source={JSON.parse(item.image)}/>
    </TouchableOpacity>
  )



  componentDidMount() {
    const datafilter1 = _.filter(BreakAwayItems, item => {
        return item.spaceId == this.props.route.params.spaceId && item.state == "hesitate"
    })
    const datafilter2 = _.filter(BreakAwayItems, item => {
      return item.spaceId == this.props.route.params.spaceId
  })

    this.setState({
      hesitate: datafilter1,
      fullData: datafilter2,
    });
  }

  
  render(){  
    const { spaceId, complete } = this.props.route.params;
    this.getHesitateItemsBySpace(spaceId);
    this.getStoryItemsBySpace(spaceId);
    console.log(spaceId, complete);
    return (
      <ScrollView style={{ flex: 1}}>
        <View style = {{flex:1, alignContent: 'center', alignItems: 'center', alignSelf:'center'}}>
            <CircularProgress
              value={complete}
              radius={150}
              duration={2000}
              textStyle={{ fontWeight: '100', color: 'red' }}
              maxValue={100}
            />
        </View>
        <Text>猶豫區</Text>
        <View>
          <FlatList
                style = {{flex: 1}}
                data={this.state.hesitateItems}
                renderItem={this.renderHesitate}
                horizontal = {true}
                keyExtractor={item => item.id}
            />
        </View>
        
        <Text>故事集</Text>
        <FlatList
              style = {{flex: 1}}
              data={this.state.storyItems}
              renderItem={this.renderStory}
              horizontal = {true}
              keyExtractor={item => item.id}
          />
        
      </ScrollView>
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