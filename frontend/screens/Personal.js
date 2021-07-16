import * as React from 'react';

import {
  View,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import _ from "lodash"; //MUST include for filtering lists (i.e. searching)
// import { Icon, InlineIcon } from '@iconify/react';
// import collectionItem from '@iconify/icons-zmdi/collection-item';


export default class Personal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      stars: 0,
      maxstars: 5,
    };
  }

  static navigationOptions = {
    title: 'Personal',
  }

  componentDidMount() {
    this.setState({
      username: '@sylvey',
      stars: 4,
      source: require('../assets/profile.jpg'),
    });
  }

  render() {
    const { search } = this.state;
    // const[grvalue, grsetValue] = useState('');
    const { navigate } = this.props.navigation;
    //console.log(this.props.navigation);


    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Image
            style={{ top: 50, left: 30, width: 60, height: 60, borderRadius: 30 }}
            source={this.state.source} />
          <Text style={{ top: 60, left: 30, fontSize: 20 }}>{this.state.username}</Text>
          <Text style={{ top: 70, left: 30 }}>{this.state.stars}</Text>
          
        </View>


        <View style={{ flex: 3 }}>
          
          <TouchableOpacity
            style={styles.item}
          >
            <Image 
                style={styles.image}
                source={require('../assets/personal/持有物品清單.jpg')}/>
            <Text style={styles.buttonText}>持有物品清單</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
          >
            <Image 
                style={styles.image}
                source={require('../assets/personal/發文紀錄.png')}/>
            <Text style={styles.buttonText}>發文紀錄</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
          >
            <Image 
                style={styles.image}
                source={require('../assets/personal/交換紀錄.png')}/>
            <Text style={styles.buttonText}>交換紀錄</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
          >
            <Image 
                style={styles.image}
                source={require('../assets/personal/願望清單.png')}/>
            <Text style={styles.buttonText}>願望清單設定</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
          >
            <Image 
                style={styles.image}
                source={require('../assets/personal/個人資料設定.png')}/>
            <Text style={styles.buttonText}>個人資料設定</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
          >
            <Image 
                style={styles.image}
                source={require('../assets/personal/關於swappy.png')}/>
            <Text style={styles.buttonText}>關於swappy</Text>
          </TouchableOpacity>
        </View>

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
  image: {
    top:3,
    width: 20, 
    height: 20, 
  },
  boxContainer: {
    margin: 5,
    backgroundColor: '#f9c2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    margin: 1,
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
    marginHorizontal: 20,
    alignContent: 'center',
    color: '#E2E6EC',
    fontSize: 15,
    fontWeight: 'bold',
  },
});