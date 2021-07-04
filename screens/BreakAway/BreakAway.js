import * as React  from 'react';
import { View, Text, SafeAreaView,  FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)
import { ProgressBar } from "react-native-paper";
import BreakAwaySpace from '../../Data/BreakAwaySpace';


export default class BreakAway extends React.Component {

  state = {
    data: [],
    fullData: [],
  };

  static navigationOptions = {
    title: 'BreakAway',
  }


  renderItem = ({ item }) => (
    //console.log(this.props.navigation);
    <TouchableOpacity 
            style={styles.button}
            >
      <Text>{item.title}</Text>
      <ProgressBar
        progress = {item.complete} 
        style={styles.probarStyle} 
        color = {'#FEBC5F'}/> 
    </TouchableOpacity>   
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
      <View>     

        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        /> 

       <TouchableOpacity 
            style={styles.button}
            onPress={() => navigate("BreakAwayADD")}>
            <Text>ADD</Text>
        </TouchableOpacity>
       
      </View>
        
       
    )
  }

}

const styles = StyleSheet.create({
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
      margin: 4,
      width: 350,
      height: 60,
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
  });