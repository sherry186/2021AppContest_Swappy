import * as React from 'react';

import { 
  View, 
  Text, 
  SafeAreaView,  
  FlatList, 
  StyleSheet,
  Image,
  TouchableOpacity} from "react-native";
import { SearchBar } from 'react-native-elements';
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)

// import GeneralItems from '../../Data/GeneralItems';
import * as SQLite from 'expo-sqlite'
import colors from '../../config/colors';
const database = SQLite.openDatabase('db.SwappyDataBase'); // returns Database object


const contains = (data, query) => {
  let formatData = data.toLowerCase();
  let formatQuery = query.toLowerCase();

  if (formatData.includes(formatQuery)) {
    return true;
  }
  return false;
}



export default class General_HOME extends React.Component {

  state = {
    search: '',
    data: [],
    fullData: [],
  };

  static navigationOptions = {
    title: 'General_HOME',
  }

  handleSearch = (search) => {
    console.log("search", search)
    const data = _.filter(this.state.fullData, general => {
      return contains(general.title, search)
    })
    this.setState({ data,  search});
  };

  renderItem = ({ item }) => (
    //console.log(this.props.navigation);
    <View style={styles.boxContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity 
          style={styles.item}
          onPress={() => this.props.navigation.navigate('GeneralDetail', {itemID: item.id, title: item.title, sort: item.category, des: item.description, method: item.method, image: item.image})}>
            <Text>Item Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.item}
          onPress={() => {
            database.transaction(tx => {
              tx.executeSql('DELETE FROM GeneralItems WHERE id = ?', [item.id]);
            })
          }}>
            <Text>Delete Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  fetchData = () => {
    database.transaction(tx => {
      // sending 4 arguments in executeSql
      tx.executeSql('SELECT * FROM GeneralItems', null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => {
          console.log(_array); 
          this.setState({
            data: _array,
            fullData: _array,
          });
        },
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => console.log('Error ', error)
        ) // end executeSQL
    }) // end transaction
  }

  componentDidMount() {
    this.fetchData();
  }
  

  render() {
    const { search } = this.state;
    // const[grvalue, grsetValue] = useState('');
    const{ navigate } = this.props.navigation;
    //console.log(this.props.navigation);
    this.fetchData();

    return(
      
      <View style={styles.container}>
        <View style = {styles.margin}></View>
        <View style = {{flex : 1, top: 65, flexDirection:'row'}}>
            <View style = {{flex : 6}}>
                <SearchBar
                  containerStyle = {{left: 18,  height: 28, alignContent: 'center', justifyContent: 'center', backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
                  inputContainerStyle = {{height: 28, width: 264, borderRadius: 7, backgroundColor: colors.mono_60}}
                  inputStyle= {{margin: 0,fontSize: 15}}
                  placeholder="標題、種類、物品資訊"
                  onChangeText={this.handleSearch}
                  value={search}
                />
            </View>
            
            <TouchableOpacity 
               style={{flex: 1, width: 60, height: 60, backgroundColor: 'transparent'}}
               onPress={() => navigate('GeneralAdd')}>
              <Image
                style = {{width: 24, height: 21.99}}
                source = {require("../../assets/general&group/message.png")}/>
              
            </TouchableOpacity>

            <TouchableOpacity 
               style={{flex: 1, left: 0,  width: 60, height: 60, backgroundColor: 'transparent'}}
               onPress={() => navigate('Notification')}>
              <Image
                style = {{width: 24, height: 21.99}}
                source = {require("../../assets/general&group/notification.png")}/>
            </TouchableOpacity>   
        </View>
        
        <View style = {{flex: 6,}}>
          <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
              />
        </View>

        
        <TouchableOpacity 
            style={styles.button}
            onPress={() => navigate('GeneralAdd')}>
            <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
    margin: {
      flex: 1,
      height: 50,
      backgroundColor: colors.mono_40,
    },
    container: {
      flex: 1,
      backgroundColor: colors.mono_40,
      bottom: 70,
      // alignItems: 'center',
      // justifyContent: 'center'
    },
    boxContainer: {
      margin: 5,
      backgroundColor: '#f9c2ff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      backgroundColor: '#E2E6EC',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    buttons: {
      flexDirection: 'row'
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