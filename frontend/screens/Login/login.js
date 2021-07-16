import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';

export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { account: '', password: '' };
  }

  handlesubmit = () => {
    this.props.navigation.navigate("BottomTab")
  }

  render() {
    return (
      <View style={{ flex: 1 , backgroundColor: colors.function_100}}>
        <View style = {{flex: 1, borderTopStartRadius:20, borderTopRightRadius:20, backgroundColor: colors.mono_40, alignItems:'center', justifyContent:'center'}}>
          <TextInput
            style={styles.input}
            placeholder='電子郵件'
            onChangeText={(text) => { this.setState({ account: text }) }}
            value={this.state.account} />

          <TextInput
            style={styles.input}
            placeholder='密碼'
            onChangeText={(text) => { this.setState({ password: text }) }}
            value={this.state.password} />

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
  buttonText: {
    color: colors.mono_40,
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
});