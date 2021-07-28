import * as React from 'react';

import {
  View,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import colors from '../config/colors';
import _ from "lodash"; //MUST include for filtering lists (i.e. searching)
//import { ScreenHeight } from 'react-native-elements/dist/helpers';
// import { Icon, InlineIcon } from '@iconify/react';
// import collectionItem from '@iconify/icons-zmdi/collection-item';

let ScreenWidth = Dimensions.get("window").width;
let ScreenHeight = Dimensions.get("window").height;


export default class Personal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      stars: 0,
      maxstars: [1, 2, 3, 4, 5],
    };

  }

  static navigationOptions = {
    title: 'Personal',
  }

  componentDidMount() {
    this.setState({
      username: '@sylvey',
      stars: 4.2,
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
            style={{ top: ScreenHeight*0.05, left: ScreenWidth*0.1, width: ScreenWidth*0.3, height: ScreenWidth*0.3, borderRadius: ScreenWidth*0.15 }}
            source={this.state.source} />
          <Text style={{ top: ScreenHeight*0.07, left: ScreenWidth*0.1, fontSize: ScreenWidth*0.06, color:"#629D89", fontWeight: 'bold', }}>{this.state.username}</Text>
          <View style = {{ top: ScreenHeight*0.075, left: ScreenWidth*0.1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{frontSize: ScreenWidth*0.04, color:"#629D89" }}>{this.state.stars} </Text>
            {
              this.state.maxstars.map((item, index)=>{
                return(
                  <Image 
                    source = {Math.round(this.state.stars)>=item? require('../assets/personal/star_full.png') :  require('../assets/personal/star_empty.png')}
                    style = {{height: ScreenWidth*0.04, width:ScreenWidth*0.04}}/>

                );
              })

            }
          </View>
          
          
        </View>

        <View style = {styles.line}></View>

        <View style={{ flex: 3 }}>
          
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
    top: 20,
    flex: 1.4,
  },
  line:{
    left: ScreenWidth*0.1,
    backgroundColor: colors.mono_60,
    width: ScreenWidth*0.8,
    height: 1.5,
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
    left: ScreenWidth*0.1,
    flexDirection: 'row',

    //backgroundColor: '#fff',
    paddingVertical: 20,
    margin: 1,
  },
  buttonText: {
    marginHorizontal: 20,
    alignContent: 'center',
    color: '#8D8D8D',
    fontSize: 15,
    fontWeight: 'bold',
  },
});