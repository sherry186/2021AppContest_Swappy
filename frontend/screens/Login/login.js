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
      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.input}
          placeholder='email/ID/phone number'
          onChangeText={(text) => { this.setState({ account: text }) }}
          value={this.state.account} />

        <TextInput
          style={styles.input}
          placeholder='password'
          onChangeText={(text) => { this.setState({ password: text }) }}
          value={this.state.password} />

        <TouchableOpacity
          title='signup'
          onPress={() => this.props.navigation.navigate("signup")}
        >
          <Text
            style={{ color: colors.function_100 }}>Don't have an account? signup now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          title='Submit'
          onPress={this.handlesubmit}
          style={styles.item}>
          <Text
            style={styles.buttonText}>Submit</Text>
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