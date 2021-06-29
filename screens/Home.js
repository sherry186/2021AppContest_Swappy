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
    const [value, setValue] = useState()
    function updateSearch(value) {
        //do your search logic or anything
        console.log(value)
    }

    return (
        <View>
            <SearchBar
                    value={value}
                    updateSearch={updateSearch}
                    style={{ marginTop: '8%' }}
                />
            <ItemsList/>
            
            
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