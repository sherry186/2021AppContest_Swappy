import React from 'react';
import {
    Text,
    StyleSheet,
    View, 
    TextInput} from 'react-native';


export default class Main_ADD extends React.Component {

  static navigationOptions = {
    title: 'Main_ADD',
  }
  constructor(props) {
    super(props);
    this.state = { title: 'title', article: "What's on your mind?", };
  }


  render() {
    const{ navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
        <TextInput
            style={styles.title}
            onChangeText={(text) => this.setState({title: text})}
            value = {this.state.Gname}/>

        <TextInput
            style={styles.post}
            onChangeText={(text) => this.setState({article: text})}
            value = {this.state.article}/>
        
        {/* <Button
            title = 'Go to home screen'
            onPress={() => navigate('Home')}/> */}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  title: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  post: {
    margin: 15,
    height: 200,
    borderColor: '#7a42f4',
    borderWidth: 1,
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