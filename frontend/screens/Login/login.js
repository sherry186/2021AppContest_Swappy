import * as React from 'react';
import { useState } from 'react';
import { View, 
        Text, 
        StyleSheet, 
        TextInput, 
        TouchableOpacity,
        Image } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from '../../config/colors';
import { useNavigation } from '@react-navigation/core';

const login = () =>  {
  // constructor(props) {
  //   super(props);
  //   this.state = { 
  //     account: '', 
  //     password: '', 
  //     accountImage: require("../../assets/login/account.png"),
  //     passwordImage: require("../../assets/login/password.png"),
  //     passwordEyeImage: require("../../assets/login/eye.png"),
  //     secure: true,
  //    };
      
  // }

  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [accountImage, setAccountImage] = useState(require("../../assets/login/account.png"));
  const [passwordImage, setPasswordImage] = useState(require("../../assets/login/password.png"));
  const [passwordEyeImage, setPasswordEyeImage] = useState(require("../../assets/login/eye.png"));
  const [secure, setSecure] = useState(true);
  
  const navigation = useNavigation();

  const handlesubmit = () => {
    navigation.navigate("BottomTab")
  }

  const handlesetSecure = (now) =>{
    setSecure(!now)
  }

  
  return (
    <View style={{ flex: 1 , backgroundColor: colors.function_100}}>
      <View style = {{flex: 1, borderTopStartRadius:20, borderTopRightRadius:20, backgroundColor: colors.mono_40, alignItems:'center', justifyContent:'center'}}>
        <View style = {styles.inputContainer}>
            <Image
              style={styles.image}
              source={accountImage} />
            <TextInput
              style={styles.input}
              placeholderTextColor = {colors.function_100}
              placeholder='電子郵件'
              onChangeText={setAccount}
              value={account} />
        </View>
        
        <View style = {styles.inputContainer}>
            <Image
              style={styles.image}
              source={passwordImage} />
            <TextInput
              style={styles.input}
              placeholderTextColor = {colors.function_100}
              placeholder='密碼'
              secureTextEntry = {secure}
              onChangeText={setPassword}
              value={password} />   

            <TouchableOpacity
              title='resetpassword'
              onPress = {()=>handlesetSecure(secure)}
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
                  tintColor: secure? colors.function_100 : colors.brown_40}} 
                source = {passwordEyeImage}/>
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
          onPress={handlesubmit}
          style={styles.submit}>
          <Text
            style={styles.buttonText}>登入</Text>
        </TouchableOpacity>
      </View>
          </View>
  );
  
}

export default login;

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