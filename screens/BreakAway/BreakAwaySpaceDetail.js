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


import BreakAwayItems from '../../Data/BreakAwayItems';
import CircularProgress from 'react-native-circular-progress-indicator';
/* 2. Get the param */



export default class BreakAwaySpaceDetail extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { data: [], fullData: []};
  }

  renderImage = ({ item }) => ( 
    <Image 
      style={{flexDirection: 'row', width: 60, height: 60,  }}
      source={item.source}/>
  )

  componentDidMount() {
    const datafilter = _.filter(BreakAwayItems, item => {
        return item.spaceId == this.props.route.params.spaceId
    })

    this.setState({
      data: datafilter,
      fullData: datafilter,
    });
  }

  
  render(){  
    const { spaceId, complete } = this.props.route.params;
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
        <Text>story:</Text>
        <FlatList
              style = {{flex: 1}}
              data={this.state.data}
              renderItem={this.renderImage}
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