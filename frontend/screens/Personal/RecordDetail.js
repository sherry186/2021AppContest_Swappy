import React, {useEffect, useState} from 'react';
import * as SQLite from 'expo-sqlite';
const database = SQLite.openDatabase('db.SwappyDataBase'); // returns Database object


import { View,
       Text,
       Button, 
       Image, 
       FlatList, 
       SafeAreaView, 
       ScrollView, 
       TouchableOpacity,
       StyleSheet, 
       Dimensions} from "react-native";
import { useNavigation } from '@react-navigation/core';
import colors from '../../config/colors';
//import Notification_requesting from './Notification_requesting';

let ScreenWidth = Dimensions.get("window").width;
let ScreenHeight = Dimensions.get("window").height;
/* 2. Get the param */
function RecordDetail ({ route, navigation }) {

  
  // render(){  
    const { id, mythingTitle, mythingImage, requestForTitle, requestForTag, requestForImage, status, statusToMe} = route.params;
    
    const [statusS, setStatusS] = useState(status);
    const [statusToMeS, setStatusToMeS] = useState(statusToMe);

   

    const handleReceived = () =>{
        let nowStatus = statusS + 1;
        let nowStatusToMe = statusToMeS + 1;
        
        setStatusS(nowStatus,()=>console.log(statusS));
        setStatusToMeS(nowStatusToMe,()=>console.log(statusToMeS));
        
        
    }

    useEffect(()=>{

        console.log(statusS, statusToMeS);
        if(statusS >= 2)
        {
            navigation.navigate('Star');
        }
        console.log(statusS, statusToMeS);

    }, [statusS, statusToMeS])

    return (
     
        <View style = {{flex: 1, alignItems: 'center'}}>       
            <View style = {{flex: 2, flexDirection:'row', backgroundColor: colors.mono_40, width: "100%", justifyContent:'center', }}>
                <View style = {{flex:1}}></View>
                <View style = {styles.itemBox}>  
                  <Image
                    style={styles.image}
                    source = {mythingImage}/>
                  
                  <View style ={styles.titleTag}>
                    <Text style = {styles.tagText}>你的物品</Text>
                  </View>
                  <View style ={styles.titleTagB}>
                    <Text style = {styles.titleText}>{mythingTitle}</Text>
                  </View>
                  
                </View>

                <View style = {styles.itemBox}>

                  <Image
                    style={styles.image}
                    source = {requestForImage}/>
                  
                  <View style ={styles.titleTag}>
                    <Text style = {styles.tagText}>對方的物品</Text>
                  </View>
                  <View style ={styles.titleTagB}>
                    <Text style = {styles.titleText}>{requestForTitle}</Text>
                  </View>
                  
                </View>
                <View style = {{flex:1}}></View>
            </View>

            <Image 
                style = {{position:'absolute', top: ScreenWidth*1.08, height:ScreenWidth*0.1, width: ScreenWidth*0.1}}
                source = {require('../../assets/personal/smile.png')}/>
            <Image 
                style = {{position:'absolute', top: ScreenWidth*1.2, height:ScreenWidth*0.16, width: ScreenWidth*0.73}}
                source = {require('../../assets/personal/成功換物.png')}/>
            {
                statusToMeS == 0? 
                <TouchableOpacity
                    style = {{position:'absolute', top: ScreenWidth*1.4, alignItems: 'center',}}
                    onPress = {()=>handleReceived()}
                    >
                    <Text style = {{color: colors.function_100, fontWeight: '900', fontSize: ScreenWidth*0.04}}>已收到物品！</Text>
                </TouchableOpacity> 
                : null
                
            }
            
        </View>
        
    
    );
  // }

}

export default RecordDetail;

const styles = StyleSheet.create({
    itemBox: {
        flex:5,
        alignItems:'center',
        //justifyContent: 'center',
        //backgroundColor:'yellow',
    },
    image: {
        width: ScreenWidth*0.4, 
        height: ScreenWidth*0.4,
        top:  ScreenWidth*0.44,
    },
    titleTag: {
        top: ScreenWidth*0.4,
        position: 'absolute',
        alignItems:'center',
        justifyContent: 'center',
        width: ScreenWidth*0.25,
        backgroundColor: colors.function_100,
        height: ScreenWidth*0.08,
        borderRadius: ScreenWidth*0.02,
        //marginBottom: -ScreenWidth*0.03,
        
    },
    titleTagB: {
        top: ScreenWidth*0.84,
        position: 'absolute',
        alignItems:'center',
        justifyContent: 'center',
        width: ScreenWidth*0.25,
        backgroundColor: 'transparent',
        height: ScreenWidth*0.06,
        //marginBottom: -ScreenWidth*0.03,
        
    },
    tagText: {
        fontSize: ScreenWidth*0.04,
        color: colors.mono_40,
    },
    titleText:{
        color: colors.function_100,
        fontSize: ScreenWidth*0.04,
        fontWeight: 'bold',
    }
    
});