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
       TextInput } from "react-native";


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
    const { title, person, post, comment, hideName } = this.props.route.params;
    return (
      <ScrollView style={{ flex: 1}}>
        <Text></Text>
        <Text></Text>
        <Text>{title}</Text>
        <Text>{hideName? person : "匿名"}</Text>
        <Text>{post}</Text>
        <FlatList 
          data={comment}
          renderItem={this.renderComment}
          keyExtractor={item => item.id}/>
        <TextInput
            style={styles.title}
            placeholder="comment"
            onChangeText={(text) => this.setState({comment: text})}
            value = {this.state.comment}/>
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