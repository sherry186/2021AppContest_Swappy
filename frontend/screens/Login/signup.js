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
      <View style={{ flex: 1 , backgroundColor: colors.function_100}}>
        <View style = {{flex: 1, borderTopStartRadius:20, borderTopRightRadius:20, backgroundColor: colors.mono_40, alignItems:'center', justifyContent:'center'}}>
            <TextInput
                style={styles.input}
                placeholder='使用者名稱'
                onChangeText={(text) => {this.setState({userName: text})}}
                value = {this.state.userName}/>

            <TextInput
                style={styles.input}
                placeholder='電子郵件'
                onChangeText={(text) => {this.setState({email: text})}}
                value = {this.state.email}/>

            <TextInput
                style={styles.input}
                placeholder='手機號碼'
                onChangeText={(text) => {this.setState({phoneNumber: text})}}
                value = {this.state.phoneNumber}/>

            <TextInput
                style={styles.input}
                placeholder='密碼'
                onChangeText={(text) => {this.setState({password: text})}}
                value = {this.state.password}/>

            <TextInput
                style={styles.input}
                placeholder='重新確認密碼'
                onChangeText={(text) => {this.setState({checkPassword: text})}}
                value = {this.state.checkPassword}/>


            <TouchableOpacity
                title = 'Submit'
                onPress={this.handlesubmit}
                style = {styles.submit}>
                <Text
                  style = {styles.buttonText}>註冊</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
    }
}


const styles = StyleSheet.create({
  input: {
    margin:10,
    height: 40,
    width: 300,
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth: 0
  },
  submit: {
    borderRadius: 10,
    display:'flex',
    margin: 30,
    backgroundColor: colors.function_100,
    height: 40,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: colors.function_100,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  buttonText: {
    color: colors.mono_40,
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
});