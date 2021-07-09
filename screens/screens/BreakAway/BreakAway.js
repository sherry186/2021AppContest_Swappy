import * as React  from 'react';
import { ScrollView, View, Text, SafeAreaView,  FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)
import { ProgressBar } from "react-native-paper";
import BreakAwaySpace from '../../Data/BreakAwaySpace';
import BreakAwayItems from '../../Data/BreakAwayItems';

export default class BreakAway extends React.Component {

  state = {
    spaceData: [],
    itemData: [],
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

  renderImage = ({ item }) => (
    <SafeAreaView style = {{flex:1, flexDirection: 'row'}}>
      <Image 
      style={{flexDirection: 'row', width: 60, height: 60,  }}
      source={item.source}/>
    </SafeAreaView> 
  );

  componentDidMount() {
    this.setState({
      spaceData: BreakAwaySpace,
      itemData: BreakAwayItems,
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
              data={this.state.itemData}
              renderItem={this.renderImage}
              horizontal = {true}
              keyExtractor={item => item.id}
          />

        </View>

        
        <FlatList
            data={this.state.spaceData}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
        /> 
        <View style={styles.center, {flex:0.2, flexDirection: 'row'}}>
          <TouchableOpacity 
                style={styles.center, styles.button}
                onPress={() => navigate("BreakAwayADD")}>
                <Text>ADD</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex:0.2, flexDirection: 'row'}}>
          <View style={styles.center, {flex:1}}>
            <TouchableOpacity 
              style={styles.buttonRound}
              onPress={() => navigate("BreakAwayHesitate")}
              >
              <Text>Hesitate</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.center, {flex:1}}>
            <TouchableOpacity 
              style={styles.buttonRound}
              // onPress={() => navigate("BreakAwayADD")}
              >
              <Text>ChangeOut</Text>
            </TouchableOpacity>
          </View>                
        </View>

        <View style={{margin: 20, flex: 1, flexDirection:'column'}}>
            <TouchableOpacity 
              style={styles.buttonRound}
              // onPress={() => navigate("BreakAwayADD")}
              >
              <Text>Camera</Text>
            </TouchableOpacity>
        </View>

       
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
  });