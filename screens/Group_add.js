import { styleSheets } from 'min-document';
import React from 'react';
import {Text, StyleSheet, View, Button, StatusBar} from 'react-native';



export default class Group_ADD extends React.Component {

  static navigationOptions = {
    title: 'Group_ADD',
  }

  render() {
    const{ navigate } = this.props.navigation;

    return(
      <View style={styles.container}>
        
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