import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';

export default class signup extends React.Component{
  constructor(props) {
      super(props);
      this.state = { userName: '', email:'', phoneNumber: '', password: '', checkPassword: ''};
    }

  handlesubmit = ()=>{
    this.props.navigation.navigate("login")
  }
      
  render(){  
    return (
      <View style={{ flex: 1}}>
        <TextInput
            style={styles.input}
            placeholder='user name'
            onChangeText={(text) => {this.setState({userName: text})}}
            value = {this.state.userName}/>
        
        <TextInput
            style={styles.input}
            placeholder='email'
            onChangeText={(text) => {this.setState({email: text})}}
            value = {this.state.email}/>

        <TextInput
            style={styles.input}
            placeholder='phone number'
            onChangeText={(text) => {this.setState({phoneNumber: text})}}
            value = {this.state.phoneNumber}/>

        <TextInput
            style={styles.input}
            placeholder='password'
            onChangeText={(text) => {this.setState({password: text})}}
            value = {this.state.password}/>

        <TextInput
            style={styles.input}
            placeholder='check your password again'
            onChangeText={(text) => {this.setState({checkPassword: text})}}
            value = {this.state.checkPassword}/>





        
        <TouchableOpacity
            title = 'login'
            onPress={()=>this.props.navigation.navigate("login")}
            >
            <Text
              style = {{color: colors.function_100}}>already have an account? login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
            title = 'Submit'
            onPress={this.handlesubmit}
            style = {styles.item}>
            <Text
              style = {styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        
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
  item: {
    backgroundColor: colors.function_100,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  buttonText: {
    color: colors.mono_40,
    fontSize: 10,
    fontWeight: 'bold',
  },
});