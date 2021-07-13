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

/* 2. Get the param */
export default class BreakAwayItemDetail extends React.Component {
  
  constructor(props) {
    super(props);
  }

  handleChangeOut = (source) =>{
    this.props.navigation.navigate("BreakAwayItemChangeOut", {source: source})
  }

  handleKeep = () =>{
    this.props.navigation.goBack()
  }
  
  render(){  
    const { source, spaceId, story, uploadDate} = this.props.route.params;
    return (
      <ScrollView style={{ flex: 1}}>
        <Image 
            style={{ width: 100, height: 100  }}
            source={source}/>
        <Text>Space: {BreakAwaySpace[spaceId].title}</Text>
        <Text>Story: {story}</Text>
       
        <View style= {{flexDirection: 'row'}}>
            <TouchableOpacity
                  onPress={()=>this.handleChangeOut(source)}
                  title = '換出'
                  style = {styles.item}>
                  <Text style = {styles.buttonText}>換出</Text> 
            </TouchableOpacity>
            <TouchableOpacity
                  onPress={()=>this.handleKeep()}
                  title = '留下'
                  style = {styles.item}>
                  <Text style = {styles.buttonText}>留下</Text> 
            </TouchableOpacity>
        </View>
        
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