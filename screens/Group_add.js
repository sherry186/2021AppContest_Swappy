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
    this.state = { text: 'Useless Placeholder' };
  }


  render() {
    const{ navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
        <TextInput
            style={{height:40, borderColor: 'gray', borderWidth: 1}}
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
});