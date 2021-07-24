import * as React from 'react';
import * as SQLite from 'expo-sqlite';
const database = SQLite.openDatabase('db.SwappyDataBase'); // returns Database object


import { View,
       Text,
       Button, 
       Image, 
       FlatList, 
       SafeAreaView, 
       ScrollView, 
       TouchableOpacity,
       StyleSheet, 
       Dimensions,
       TextInput } from "react-native";

import colors from '../../config/colors';

let ScreenWidth = Dimensions.get("window").width;

/* 2. Get the param */
export default class MainDetail extends React.Component {

  constructor(props){
    super(props);
    this.state = {comment: ""}
  }

  componentDidMount() {
    
  }

  renderComment = ({ item }) => (
    //console.log(this.props.navigation);
    <Text>{item.person} {item.content}</Text>
  );

  render(){  
    const { title, profile, person, post, comment, hideName } = this.props.route.params;
    return (
      <View style={{ flex: 1, top: "5%", bottom:"20%", alignItems: 'center'}}>
         <View style = {{flex: 1, flexDirection: 'row', height: "7%", backgroundColor: colors.mono_40}}>
          <TouchableOpacity
            style = {{flex:2, width: "20%", backgroundColor: colors.mono_40, alignItems: 'center', justifyContent:'center'}}
            onPress = {()=>this.props.navigation.goBack()}
            >
            <Image 
              style = {{height: "25%", width: "25%"}}
              source = {require('../../assets/manyneed/xmark.png')}/>
          </TouchableOpacity>

          <View
            style ={{flex: 8, justifyContent: 'center', alignItems: 'center'}}>
              <Text style = {{right: "15%", fontSize: 20, fontWeight: 'bold', color: colors.mono_100}}>{title}</Text>
          </View>
        </View>
        
        <View style= {{flex: 10, backgroundColor: colors.mono_40, width: "100%"}}>
          <View style = {{flex: 1, marginLeft: ScreenWidth*0.05}}>
            <View style ={{flexDirection: 'row'}}>
              <Image
                style = {{height: ScreenWidth*0.05, width: ScreenWidth*0.05}}
                source = {require('../../assets/Social/profileDefault.png')}/>
              <Text style = {{left: ScreenWidth*0.01,}}>{hideName? person : "匿名"}</Text>
            </View>
              <Text>{post}</Text>

          </View>

          <View style = {{flex:1}}>
            
            <FlatList 
              data={comment}
              renderItem={this.renderComment}
              keyExtractor={item => item.id}/>
            <TextInput
                style={styles.title}
                placeholder="comment"
                onChangeText={(text) => this.setState({comment: text})}
                value = {this.state.comment}/>
          </View>
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