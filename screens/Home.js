import React, { useState } from "react";
import {
    View,
    ScrollView,
    Button
  } from "react-native";

import SearchBar from '../Components/SearchBar';
import ItemsList from '../Components/ItemsList';
import BottomBar from '../Components/BottomBar.js';


function Home({navigation}) {

    return (
        <View>
            <SearchBar/>
            <ItemsList/>
            <Button 
                title="Home" 
                onPress={()=>{navigation.navigate("Home")}}/>
            <Button 
                title="Record" 
                onPress={()=>{navigation.navigate("Record")}}/>
            <Button 
                title="Personal" 
                onPress={()=>{navigation.navigate("Personal")}}/>
            <Button 
                title="Social" 
                onPress={()=>{navigation.navigate("Social")}}/>
            {/* <BottomBar/> */}
        </View>
    );
}

export default Home;