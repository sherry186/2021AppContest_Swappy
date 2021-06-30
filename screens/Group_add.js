import { styleSheets } from 'min-document';
import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    View, 
    TextInput} from 'react-native';


export default class Group_ADD extends React.Component {

  static navigationOptions = {
    title: 'Group_ADD',
  }
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }


  render() {
    const{ navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
        <Text style={styles.buttonText}>Group Name</Text>
        <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({text})}
            value = {this.state.text}/>
        
        {/* <Button
            title = 'Go to home screen'
            onPress={() => navigate('Home')}/> */}
      </View>
    )
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
  title: {
    fontSize: 32,
  },
  buttonText: {
    //color: '#fff',
    fontSize: 15,
    left: 10,
    fontWeight: 'bold',
  },
});