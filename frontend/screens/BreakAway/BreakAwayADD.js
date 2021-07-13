import { styleSheets } from 'min-document';
import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity, 
    TextInput} from 'react-native';




export default class BreakAwayADD extends React.Component {

  static navigationOptions = {
    title: 'BreakAway_ADD',
  }
  constructor(props) {
    super(props);
    this.state = { Space: '', };
  }

  handlesubmit =() =>{
    
    this.props.navigation.goBack()
  } 

  handleupload = () =>{

  }

  render() {
    const{ navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
        <Text style={styles.buttonText}>Space</Text>
        <TextInput
            style={styles.input}
            placeholder='Space'
            onChangeText={(text) => this.setState({Space: text})}
            value = {this.state.Space}/>
        

        <TouchableOpacity
            title = 'upload'
            onPress={this.handleupload}
            style = {styles.item}>
            <Text
              style = {styles.buttonText}>Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity
            title = 'Submit'
            onPress={this.handlesubmit}
            style = {styles.item}>
            <Text
              style = {styles.buttonText}>Submit</Text>
        </TouchableOpacity>

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