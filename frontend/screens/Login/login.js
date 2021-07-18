import * as React from 'react';
import { View, 
        Text, 
        StyleSheet, 
        TextInput, 
        TouchableOpacity,
        Image } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from '../../config/colors';

export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      account: '', 
      password: '', 
      accountImage: require("../../assets/login/account.png"),
      passwordImage: require("../../assets/login/password.png"),
      passwordEyeImage: require("../../assets/login/eye.png"),
      secure: true,
     };
      
  }

  handlesubmit = () => {
    this.props.navigation.navigate("BottomTab")
  }

  render() {
    return (
      <View style={{ flex: 1 , backgroundColor: colors.function_100}}>
        <View style = {{flex: 1, borderTopStartRadius:20, borderTopRightRadius:20, backgroundColor: colors.mono_40, alignItems:'center', justifyContent:'center'}}>
          <View style = {styles.inputContainer}>
              <Image
                style={styles.image}
                source={this.state.accountImage} />
              <TextInput
                style={styles.input}
                placeholderTextColor = {colors.function_100}
                placeholder='電子郵件'
                onChangeText={(text) => { this.setState({ account: text }) }}
                value={this.state.account} />
          </View>
          
          <View style = {styles.inputContainer}>
              <Image
                style={styles.image}
                source={this.state.passwordImage} />
              <TextInput
                style={styles.input}
                placeholderTextColor = {colors.function_100}
                placeholder='密碼'
                secureTextEntry = {this.state.secure}
                onChangeText={(text) => { this.setState({ password: text }) }}
                value={this.state.password} />

              <TouchableOpacity
                title='resetpassword'
                onPress = {() => this.setState({secure: !this.state.secure})}
                style ={{
                  left: 110,
                  top: 12,  
                  width: 24, 
                  height: 24,}}
              >
                <Image
                  style ={{
                    width: 24, 
                    height: 24,
                    tintColor: this.state.secure? colors.function_100 : colors.brown_40}} 
                  source = {this.state.passwordEyeImage}/>
              </TouchableOpacity>
          </View>

          

          <View style = {{left: 100, flexDirection: 'row'}}>
              <Text style = {{color: colors.mono_80}}>找不到密碼嗎？ </Text>
              <TouchableOpacity
                title='resetpassword'
              >
                <Text
                  style={{ color: colors.function_100 }}>重設密碼</Text>
              </TouchableOpacity>
          </View>
          

          <TouchableOpacity
            title='Submit'
            onPress={this.handlesubmit}
            style={styles.submit}>
            <Text
              style={styles.buttonText}>登入</Text>
          </TouchableOpacity>
        </View>
        

      </View>
    );
  }
}


const styles = StyleSheet.create({
  
  inputContainer:{
    flexDirection: 'row',
    margin:10,
    height: 48,
    width: 356,
    borderWidth: 1,
    borderRadius:6,
    borderColor: colors.function_100,
    backgroundColor: 'transparent',

  },
  image:{
    marginLeft: 13,
    top: 12,  
    width: 24, 
    height: 24,  
  },
  input: {
    top: 14,
    left: 10,
    height: 20.96,
    width: 167.72,
    borderWidth: 0,
  },
  eye:{
     
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
  buttonText: {
    color: colors.mono_40,
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
});