import React from 'react';
import {
    Text,
    StyleSheet,
    View, 
    TextInput,
    TouchableOpacity,
    Switch} from 'react-native';


export default class Record_BREAKAWAY extends React.Component {

  static navigationOptions = {
    title: 'Record_BREAKAWAY',
  }
  constructor(props) {
    super(props);
    this.state = {  };
  }


  render() {
    const{ navigate, replace } = this.props.navigation;
    
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            

            <Text>BreakAway</Text>
        </View>
    )
  }

}

const styles = StyleSheet.create({
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