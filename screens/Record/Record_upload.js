import React from 'react';
import {
    Text,
    StyleSheet,
    View, 
    TextInput,
    TouchableOpacity,
    Switch} from 'react-native';


export default class Record_UPLOAD extends React.Component {

  static navigationOptions = {
    title: 'Record_UPLOAD',
  }
  constructor(props) {
    super(props);
    this.state = {  };
  }


  render() {
    const{ replace } = this.props.navigation;
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Upload</Text>
        </View>
    )
  }

}

const styles = StyleSheet.create({
    title: {
      margin:15,
      height: 60,
      borderColor: '#7a42f4',
      borderWidth: 1,
      fontSize:40,
      paddingLeft: 10,
    },
    switch:{
      marginRight: 350,
      marginVertical: 8,
    },
    post: {
      margin: 15,
      height: 200,
      borderColor: '#7a42f4',
      borderWidth: 1,
      paddingLeft: 10,
      paddingTop: 10,
      textAlignVertical: 'top',
      //
  
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
    buttonText: {
      //color: '#fff',
      fontSize: 15,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    Text: {
      //color: '#fff',
      fontSize: 15,
      marginRight: 290,
      textAlign: 'right',
      fontWeight: 'bold',
    },
  });