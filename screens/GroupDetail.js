import * as React from 'react';

import { View, Text, Button } from "react-native";

function DetailsScreen({ route, navigation }) {
    /* 2. Get the param */
    const { itemId, title } = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>GroupId: {itemId}</Text>
        <Text>Group Name: {title}</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

export default DetailsScreen;