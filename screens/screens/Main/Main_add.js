import React from 'react';
import {
    Text,
    StyleSheet,
    View, 
    TextInput,
    TouchableOpacity,
    Switch} from 'react-native';

import SocialItems from '../../Data/SocialItems';
import Social from '../../navigators/SocialNav';

export default class Main_ADD extends React.Component {

  static navigationOptions = {
    title: 'Main_ADD',
  }
  constructor(props) {
    super(props);
    this.label = {false: 'off', true: 'on'};
    this.state = { title: "", article: "", hide: false, };
  }

  handlesubmit =() =>{
    
    nextId = SocialItems.length.toString
    if(this.state.hide == false)
    {
        item = {id: nextId, 
          person: 'Sylvia', 
          title: this.state.title,
          post: this.state.article }
        
        SocialItems.push(item)
    }
    else
    {
        item = {id: nextId, 
          person: 'SomeBody', 
          title: this.state.title,
          post: this.state.article }
      
        SocialItems.push(item)
    }
    
    this.props.navigation.goBack()
  } 
  
  handleupload = () =>{

  }


  render() {
    const{ navigate } = this.props.navigation;

    

    return(
      <View style={styles.container}>
        <TextInput
            style={styles.title}
            placeholder="Title"
            onChangeText={(text) => this.setState({title: text})}
            value = {this.state.title}/>

        <TextInput
            style={styles.post}
            placeholder="What's on your mind?"
            onChangeText={(text) => this.setState({article: text})}
            value = {this.state.article}/>
        <Text></Text>
        <Text></Text>

        <Switch
            style = {styles.switch}
            onValueChange = {(value)=>{this.setState({hide : value})}}
            value = {this.state.hide}
            />
          <Text 
            style = {styles.Text}>
              hide name {this.label[this.state.hide]}</Text> 

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