import * as React from 'react';

import { Text, SafeAreaView,  FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SearchBar } from 'react-native-elements';
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)

import SocialItems from '../../Data/SocialItems';



const contains = (data1, data2, query) => {
  let formatData1 = data1.toLowerCase();
  let formatData2 = data2.toLowerCase();

  let formatQuery = query.toLowerCase();

  if (formatData1.includes(formatQuery) || formatData2.includes(formatQuery)) {
    return true;
  }
  return false;
}



export default class Main_HOME extends React.Component {

  state = {
    search: '',
    data: [],
    fullData: [],
  };

  static navigationOptions = {
    title: 'Main_HOME',
  }

  handleSearch = (search) => {
    console.log("search", search)
    const data = _.filter(this.state.fullData, post => {
      return contains(post.person, post.post, search)
    })
    this.setState({ data,  search});
  };

  renderChat = ({ item }) => (
    //console.log(this.props.navigation);
    <TouchableOpacity 
      style={styles.Chat}
      onPress={() => this.props.navigation.navigate('Detail', {title: item.person, post: item.post})}>
        <Text style={styles.person}>{item.person}</Text>
        <Text style={styles.post}>{item.post}</Text>
    </TouchableOpacity>
  );

  componentDidMount() {
    this.setState({
      data: SocialItems,
      fullData: SocialItems,
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
        renderItem={this.renderChat}
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
    Chat: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
    person: {
        fontSize: 12,
      },
    post: {
        fontSize: 16,
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