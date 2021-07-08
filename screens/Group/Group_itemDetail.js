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


/* 2. Get the param */
export default class Group_itemDetail extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { Gname: '', Tags: '', };
  }

  renderImage = ({ item }) => (
    <SafeAreaView style = {{flex:1, flexDirection: 'row'}}>
      <Image 
      style={{flexDirection: 'row', width: 60, height: 60,  }}
      source={item.source}/>
    </SafeAreaView> 
  );

  handleRequest = ({item}) =>(
    <SafeAreaView style = {{flex:1, flexDirection: 'row'}}>
      <Image 
      style={{flexDirection: 'row', width: 60, height: 60,  }}
      source={item.source}/>
    </SafeAreaView> 
  );// 理論上應該是一個Navigation，還要再改
  
  render(){  
    const { dis, method, tagid, tagname, image } = this.props.route.params;
    return (
      <ScrollView style={{ flex: 1}}>
        <Text>Details Screen</Text>
        <Text>tag Name: {tagname}</Text>
        <Text>dis: {dis}</Text>
        <FlatList
              data={image}
              renderItem={this.renderImage}
              horizontal = {true}
              keyExtractor={item => item.id}
          />
        <Text>method: {method.faceToface? 'face to face' : ''}{method.post? 'post' : ''}</Text>
        <TouchableOpacity
              //onPress={()=>this.handleRequest()}
              title = 'request'
              
              style = {styles.item}>
              <Text style = {styles.buttonText}>request</Text> 
            </TouchableOpacity>
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