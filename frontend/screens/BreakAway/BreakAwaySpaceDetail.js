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
import colors from '../../config/colors';
const LEVELPOINTS = 20;


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



  // // componentDidMount() {
  //   const datafilter1 = _.filter(BreakAwayItems, item => {
  //       return item.spaceId == this.props.route.params.spaceId && item.state == "hesitate"
  //   })
  //   const datafilter2 = _.filter(BreakAwayItems, item => {
  //     return item.spaceId == this.props.route.params.spaceId
  // })

  //   this.setState({
  //     hesitate: datafilter1,
  //     fullData: datafilter2,
  //   });
  // }

  
  render(){  
    const { spaceId, complete, spaceName } = this.props.route.params;
    this.getHesitateItemsBySpace(spaceId);
    this.getStoryItemsBySpace(spaceId);
    console.log(spaceId, complete);
    return (
      <View style={{ flex: 1, alignItems: 'center'}}>

          <View style = {{flexDirection: 'row', height: 30, width: '100%',justifyContent:'center', alignItems:'center', backgroundColor: colors.mono_30}}>       
                <Text style = {{ fontSize: 20, fontWeight:'bold', color: colors.function_100}}>{spaceName}</Text>
          </View>

          <ScrollView style = {{flex: 9, height: "90%",alignContent:'center', width: "100%"}}>
            <View style = {{
                flex:4, 
                alignContent: 'center', 
                alignItems: 'center', 
                alignSelf:'center', 
                width: "100%",
                justifyContent: 'center',  
                backgroundColor: colors.mono_80}}>
                <CircularProgress
                  value={(complete % LEVELPOINTS)}
                  radius={140}
                  duration={2000}
                  textStyle={{ color: 'transparent' }}
                  maxValue={20}
                >
                </CircularProgress>
                <View style = {{position: 'absolute', alignItems: 'center', justifyContent:'center', backgroundColor: 'transparent'}}>
                  <Text style= {{ fontSize: 60, fontWeight: 'bold', color: colors.function_100 }}>{Math.floor(complete/LEVELPOINTS)}</Text>
                  <Text style= {{ fontSize: 30, color: colors.function_100, }}>level</Text>
                </View>
            </View>
            
            <View style = {{flex: 5, backgroundColor: 'green', width: "100%"}}>            
                <Text>猶豫區</Text>
                <View >
                  <FlatList
                        style = {{flex: 1}}
                        data={this.state.hesitateItems}
                        renderItem={this.renderHesitate}
                        horizontal = {true}
                        keyExtractor={item => item.id}
                    />
                </View>

                <View style = {{flex: 1}}>
                  <Text>故事集</Text>
                  <View>
                      <FlatList
                            style = {{flex: 1}}
                            data={this.state.storyItems}
                            renderItem={this.renderStory}
                            numColumns={3}
                            horizontal = {false}
                            columnWrapperStyle={{}}
                            keyExtractor={item => item.id}
                        />
                  </View>
                </View>
            </View>
          </ScrollView>
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