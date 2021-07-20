import * as React  from 'react';
import { TextInput, ScrollView, View, Text, SafeAreaView,  FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)
import { ProgressBar } from "react-native-paper";
import BreakAwaySpace from '../../Data/BreakAwaySpace';

import { createMyHesitatingItemsTable, createHesitateItem } from '../../localStorageApi/api';


export default class BreakAwayHesitate extends React.Component {
  state = {
    data: [],
    fullData: [],
    Limit: '100',
    story:'',
    title: '',
    space: '',
    //this.state = { Space: '', Discription: '', };
  };

  

  static navigationOptions = {
    title: 'BreakAway_Hesitate',
  }

  handlesubmit = () =>{
    createMyHesitatingItemsTable();
    //createHesitateItem = (title, story, image, reminderDate, space)
    createHesitateItem()
    this.props.navigation.goBack()
  }


  renderItem = ({ item }) => (
    //console.log(this.props.navigation);
    <TouchableOpacity 
            style={styles.button}
            >
      <Text>{item.title}</Text>
    </TouchableOpacity>   
  );

  renderImage = ({ item }) => (
    <SafeAreaView style = {{flex:1, left: 10, flexDirection: 'row'}}>
      <Image 
      style={{flexDirection: 'row', width: 60, height: 60,  }}
      source={item.source}/>
    </SafeAreaView> 
  );

  componentDidMount() {
    this.setState({
      data: BreakAwaySpace,
      fullData: BreakAwaySpace,
    });
  }
  

  render() {
    const { search } = this.state;
    // const[grvalue, grsetValue] = useState('');
    const{ navigate } = this.props.navigation;
    //console.log(this.props.navigation);

    return(
      <ScrollView style={{flex:1, flexDirection: 'column'}}> 

        <View style={{flex:0.5, flexDirection: 'row'}}>
          <FlatList
              data={this.state.data}
              renderItem={this.renderImage}
              keyExtractor={item => item.id}
          />

          <View style={{flex:0.5, flexDirection: 'row'}}>
            <TouchableOpacity 
                style={styles.buttonRound}
                // onPress={() => navigate("BreakAwayADD")}
                >
                <Text>ADD</Text>
              </TouchableOpacity>
          </View>
        </View>

        <Text>TimeLimit:</Text>
        <TextInput
            style={styles.input}
            //placeholder='100'
            onChangeText={(text) => this.setState({Limit: text})}
            value = {this.state.Limit}/>

        <Text>ItemPlaces:</Text>
        <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
        /> 
        
        <Text>Story:</Text>
        <TextInput
            style={styles.input}
            //placeholder='100'
            onChangeText={(text) => this.setState({story: text})}
            value = {this.state.story}/>

        <TouchableOpacity
            title = 'Submit'
            onPress={this.handlesubmit}
            style = {styles.item}>
            <Text
              style = {styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        

       
      </ScrollView>
        
       
    )
  }

}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   },
    container: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center'
    },
    probarStyle: {
      width: 300,
      height: 10,
      backgroundColor: "#E0E0E0"
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
      flex:1,
      margin: 4,
      width: 350,
      height: 60,
      backgroundColor: "#E0E0E0",
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    buttonRound: {
      margin: 50,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "#E0E0E0",
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 10,
      fontWeight: 'bold',
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
      },
  });