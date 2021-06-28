import * as React from 'react';
import { View, Text } from 'react-native';

function ItemsList() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is first item</Text>
      <Text>This is second item</Text>
      <Text>This is third item</Text>
    </View>
  );
}

export default ItemsList;