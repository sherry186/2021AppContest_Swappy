import React, { useState } from "react";
import {
    View,
    Button,
    TextInput,
  } from "react-native";

function SearchBar () {
    const [search, setSearch] = useState('');
    return (
        <View>
        <TextInput 
            placeholder="Search..." 
            onChangeText={search => setSearch(search)}
            defaultValue={search}/>
        <Button title="Go"/>
      </View>
    )
}

export default SearchBar


