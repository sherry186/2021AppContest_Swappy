import * as React from 'react';

import { View, Text, Button, TextInput, StyleSheet } from "react-native";

const state = {comment: ""}

function DetailsScreen({ route, navigation }) {
    /* 2. Get the param */
    const { title ,person, post } = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Text>Details Screen</Text> */}
        <Text style = {{fontSize:16}}>{title}</Text>
        <Text style = {{fontSize:16}}>{person}</Text>
        <Text style = {{fontSize:12}}>{post}</Text>
        <TextInput
            style={styles.post}
            placeholder="comment"
            onChangeText={(com)=>{state.comment = com}}
            value = {state.comment}/>
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

export default DetailsScreen;

const styles = StyleSheet.create({
  post: {
    margin: 15,
    height: 50,
    width: 300,
    borderColor: '#7a42f4',
    borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 10,
    textAlignVertical: 'top',
    //
  },
}
)