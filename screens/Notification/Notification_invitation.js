import * as React from 'react';

import { View, Text, SafeAreaView,  FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SearchBar } from 'react-native-elements';
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)

import InvitationData from '../../Data/InvitationData';
import GroupItems from '../../Data/GroupItems';


export default class Notification_invitation extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      groupItems:[],
    };
  }
  

  static navigationOptions = {
    title: 'Navigation_invitation',
  }


  renderItem = ({ item }) => (
    //console.log(this.props.navigation);
    <ScrollView style={{flexDirection: 'row'}}>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity 
            style={styles.item}>
            <Text style={styles.title}>{item.requester} </Text>
            <Text style={styles.title}>{item.itis}</Text>
            <Text style={styles.title}>{item.general? 'general' : 'group'}</Text>

        </TouchableOpacity>
        <TouchableOpacity
            style={{width:60, height:60, borderRadius:30}}>
            <Text>Y</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{width:60, height:60, borderRadius:30}}>
            <Text>N</Text>
        </TouchableOpacity>
      </View>
        
    </ScrollView>
    

  );

  componentDidMount() {
    this.setState({
      data: InvitationData,
      groupItems: GroupItems,
    });
  }
  

  render() {
    const { search } = this.state;
    // const[grvalue, grsetValue] = useState('');
    const{ navigate } = this.props.navigation;
    //console.log(this.props.navigation);

    return(
      <SafeAreaView style={styles.container}>
        
      
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center'
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {

      fontSize: 12,
    },
    button: {
      width: 60,
      height: 60,
      position: 'absolute',
      borderRadius: 30,
      backgroundColor: '#ee6e73',
      bottom: 150,
      right: 175,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 10,
      fontWeight: 'bold',
    },
  });