import * as React from 'react';

import { View, Text, SafeAreaView,  FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SearchBar } from 'react-native-elements';
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)

import GroupItems from '../../Data/GroupItems';
import RequestingFail from '../../Data/RequestingFail';
import RequestingSuccess from '../../Data/RequestingSuccess';
import RequestingWaiting from '../../Data/RequestingWaiting';


export default class Notification_requesting extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      fail: [],
      success: [],
      waiting:[],
    };
  }
  

  static navigationOptions = {
    title: 'Notification_requesting',
  }


  renderFail = ({ item }) => (
    //console.log(this.props.navigation);
    <TouchableOpacity 
      style={styles.item}>
      <Text style={styles.title}>Fail</Text>
    </TouchableOpacity>
  );

  renderSuccess = ({ item }) => (
    //console.log(this.props.navigation);
    <TouchableOpacity 
      style={styles.item}>
      <Text style={styles.title}>Success</Text>
    </TouchableOpacity>
  );

  renderWaiting = ({ item }) => (
    //console.log(this.props.navigation);
    <TouchableOpacity 
      style={styles.item}>
      <Text style={styles.title}>Waiting</Text>
    </TouchableOpacity>
  );

  componentDidMount() {
    this.setState({
      fail: RequestingFail,
      success: RequestingSuccess,
      waiting: RequestingWaiting,
    });
  }
  

  render(){
    // const[grvalue, grsetValue] = useState('');
    const{ navigate } = this.props.navigation;
    //console.log(this.props.navigation);

    return(
      <ScrollView style={styles.container}>
     
        <FlatList
          data={this.state.fail}
          renderItem={this.renderFail}
          keyExtractor={item => item.id}
        />
        <FlatList
          data={this.state.success}
          renderItem={this.renderSuccess}
          keyExtractor={item => item.id}
        />
        <FlatList
          data={this.state.waiting}
          renderItem={this.renderWaiting}
          keyExtractor={item => item.id}
        />

      </ScrollView>
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
      fontSize: 32,
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