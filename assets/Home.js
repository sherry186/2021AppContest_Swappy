import React, { useState } from "react";
import {
    View,
    ScrollView,
    Button,
    Text,
    StyleSheet,
    TouchableOpacity,
  } from "react-native";

import SearchBar from '../Components/SearchBar';
import ItemsList from '../Components/ItemsList';
import BottomBar from '../Components/BottomBar.js';



function Home({navigation}) {

    return (
        <View>
            <SearchBar/>
            <ItemsList/>
            <Text> </Text>
            <TouchableOpacity 
                style={stylesH.button} 
                onPress = {()=>{navigation.navigate("Home")}}
                >

                <Text style={stylesH.buttonText}>Home</Text>

            </TouchableOpacity>
            <TouchableOpacity 
                style={stylesS.button} 
                onPress = {()=>{navigation.navigate("Social")}}
                >

                <Text style={stylesS.buttonText}>Social</Text>

            </TouchableOpacity>
            <TouchableOpacity 
                style={stylesR.button} 
                onPress = {()=>{navigation.navigate("Record")}}
                >

                <Text style={stylesR.buttonText}>Record</Text>

            </TouchableOpacity>
            <TouchableOpacity 
                style={stylesP.button} 
                onPress = {()=>{navigation.navigate("Personal")}}
                >

                <Text style={stylesP.buttonText}>Personal</Text>

            </TouchableOpacity>

            {/* <BottomBar/> */}
            
        </View>
        
        
    );
}

export default Home

const stylesR = StyleSheet.create({
    center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        margin:20,
        paddingLeft:20,
        paddingRight:20,
        //position:'absolute',
        //bottom: -670,
        //right:103,
        width:100,
        height:60,
        backgroundColor:'#406E9F',
        borderRadius:9,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonText:{
        color:'#fff',
        fontSize:20,
        fontWeight:'bold',
    }
})
const stylesH = StyleSheet.create({
    center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        margin:20,
        paddingLeft:20,
        paddingRight:20,
        //position:'absolute',
        //bottom: -670,
        //left:0,
        width:100,
        height:60,
        backgroundColor:'#406E9F',
        borderRadius:9,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonText:{
        color:'#fff',
        fontSize:20,
        fontWeight:'bold',
    }
})
const stylesS = StyleSheet.create({
    center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        margin:20,
        paddingLeft:20,
        paddingRight:20,
        //position:'absolute',
        //bottom: -670,
        //left:104,
        width:100,
        height:60,
        backgroundColor:'#406E9F',
        borderRadius:9,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonText:{
        color:'#fff',
        fontSize:20,
        fontWeight:'bold',
    }
})
const stylesP = StyleSheet.create({
    center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        margin:20,
        paddingLeft:20,
        paddingRight:20,
        //position:'absolute',
        //bottom: -670,
        //right:0,
        width:100,
        height:60,
        backgroundColor:'#406E9F',
        borderRadius:9,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonText:{
        color:'#fff',
        fontSize:20,
        fontWeight:'bold',
    }
})