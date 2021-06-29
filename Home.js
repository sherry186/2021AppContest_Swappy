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
                style={styles.button} 
                onPress = {()=>{navigation.navigate("Home")}}
                >

                <Text style={styles.buttonText}>Home</Text>

            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button} 
                onPress = {()=>{navigation.navigate("Social")}}
                >

                <Text style={styles.buttonText}>Social</Text>

            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button} 
                onPress = {()=>{navigation.navigate("Record")}}
                >

                <Text style={styles.buttonText}>Record</Text>

            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button} 
                onPress = {()=>{navigation.navigate("Personal")}}
                >

                <Text style={styles.buttonText}>Personal</Text>

            </TouchableOpacity>

            {/* <BottomBar/> */}
            
        </View>
        
        
    );
}

export default Home

const styles = StyleSheet.create({
    center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        margin:20,
        paddingLeft:20,
        paddingRight:20,
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