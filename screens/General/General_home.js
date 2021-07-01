import * as React from 'react';

import { View, Text, SafeAreaView,  FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SearchBar } from 'react-native-elements';
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)

import GeneralItems from '../../Data/GeneralItems';



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
    <TouchableOpacity 
      style={styles.item}
      onPress={() => this.props.navigation.navigate('Detail', {itemID: item.id, title: item.title})}>
        <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  componentDidMount() {
    this.setState({
      data: GeneralItems,
      fullData: GeneralItems,
    });
  }
  

  render() {
    const { search } = this.state;
    // const[grvalue, grsetValue] = useState('');
    const{ navigate } = this.props.navigation;
    //console.log(this.props.navigation);

    return(
      <SafeAreaView style={styles.container}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.handleSearch}
          value={search}
          lightTheme
        />
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
        <TouchableOpacity 
            style={styles.button}
            onPress={() => navigate('ADD')}>
            <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
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