import * as React from 'react';
import * as SQLite from 'expo-sqlite';
const database = SQLite.openDatabase('db.SwappyDataBase'); // returns Database object


import { View,
       Text,
       Button, 
       Image, 
       FlatList, 
       SafeAreaView, 
       ScrollView, 
       TouchableOpacity,
       StyleSheet, 
       Dimensions,
       TextInput } from "react-native";

import colors from '../../config/colors';

let ScreenWidth = Dimensions.get("window").width;

/* 2. Get the param */
export default class MainDetail extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      comment: "", 
      comments:[
        {profile: require('../../assets/Social/profileDefault.png'), name: "sherry", content: "i agree"},
        {profile: require('../../assets/Social/profileDefault.png'), name: "sherry", content: "i agree"},
        {profile: require('../../assets/Social/profileDefault.png'), name: "sherry", content: "i agree"},
        {profile: require('../../assets/Social/profileDefault.png'), name: "sherry", content: "i agree"},
        {profile: require('../../assets/Social/profileDefault.png'), name: "sherry", content: "i agree"}, ]}
  }

  componentDidMount() {
    
  }

  renderComment = ({ item }) => (
    //console.log(this.props.navigation);
    <View style = {{
      width:"90%", 
      borderColor: colors.mono_60,
      borderWidth:1,
      backgroundColor: colors.mono_40, 
      alignSelf:'center', 
      marginVertical: ScreenWidth*0.02, 
      height: ScreenWidth*0.3, 
      borderRadius: ScreenWidth*0.02,
      }}>
      <View style = {{flexDirection:'row', margin: ScreenWidth*0.02, alignItems:'center'}}>
        <Image
          style = {{height: ScreenWidth*0.05, width: ScreenWidth*0.05}}
          source = {require('../../assets/Social/profileDefault.png')}
          />
        <Text style = {{left: ScreenWidth*0.01, color: colors.mono_100}}>{item.name}</Text>
      </View>
        <Text style = {{left: ScreenWidth*0.01, color: colors.mono_100}}> {item.content}</Text>
    </View>
    
  );

  render(){  
    const { title, profile, person, post, comment, hideName } = this.props.route.params;
    return (
      <View style={{ flex: 1, top: "5%", bottom:"20%", alignItems: 'center'}}>
         <View style = {{flexDirection: 'row', height: "7%", width:"100%", backgroundColor: colors.mono_40}}>
          <TouchableOpacity
            style = {{flex:2, width: "20%", backgroundColor: colors.mono_40, alignItems: 'center', justifyContent:'center'}}
            onPress = {()=>this.props.navigation.goBack()}
            >
            <Image 
              style = {{height: "25%", width: "25%"}}
              source = {profile? {uri:profile} : require('../../assets/manyneed/xmark.png')}/> 
              {/*sholud be hideName? but for there are no profile photo*/}
          </TouchableOpacity>

          <View
            style ={{flex: 8, justifyContent: 'center', alignItems: 'center'}}>
              <Text style = {{right: "15%", fontSize: 20, fontWeight: 'bold', color: colors.mono_100}}>{title}</Text>
          </View>
        </View>
        
        <ScrollView style= {{flex: 10, backgroundColor: colors.mono_40, width: "100%"}}>
          <View style = {{flex: 1, marginLeft: ScreenWidth*0.05, marginRight: ScreenWidth*0.05}}>
            <View style ={{flexDirection: 'row'}}>
              <Image
                style = {{height: ScreenWidth*0.05, width: ScreenWidth*0.05}}
                source = {require('../../assets/Social/profileDefault.png')}/>
              <Text style = {{left: ScreenWidth*0.01,}}>{hideName? person : "匿名"}</Text>
            </View>
            <ScrollView style = {{marginTop:ScreenWidth*0.05, backgroundColor:'transparent'}}>
              <Text style = {{color: colors.mono_100}}>{post}</Text>
            </ScrollView>
            
          </View>

          

          <View style = {{flex:1, backgroundColor: colors.mono_40, bottom: 60, marginTop: ScreenWidth*0.02}}>
            <View style = {styles.line}></View>
            <FlatList 
              data={this.state.comments}
              renderItem={this.renderComment}
              keyExtractor={item => item.id}/>

            
          </View>
          
          
        </ScrollView>
        <View style = {styles.commentC}>
                <View style = {styles.comment}>
                    <TextInput
                        placeholder="comment"
                        style = {{flex:8}}
                        onChangeText={(text) => this.setState({comment: text})}
                        value = {this.state.comment}/>
                    <TouchableOpacity
                       //onPress = {()=>this.handleAddComment()}
                       style ={{ 
                         flex:1,
                         width: "7%", 
                         height: "100%",
                         justifyContent:'center',
                         alignItems:'center'}}
                     >
                       <Image
                         style ={{
                           width: 15, 
                           height: 15,
                           }} 
                         source = {require('../../assets/breakAway/ok.png')}/>
                     </TouchableOpacity>
                </View> 
                <TouchableOpacity
                       //onPress = {()=>handleHeart()}
                       style ={{ 
                         flex:1,
                         width: "7%", 
                         height: "100%",
                         //backgroundColor:'red',
                         justifyContent:'center',
                         alignItems:'center'}}
                     >
                       <Image
                         style ={{
                          width: ScreenWidth*0.06, 
                          height: ScreenWidth*0.06,
                           }} 
                         source = {require('../../assets/Social/heart.png')}/>
                     </TouchableOpacity>
                <TouchableOpacity
                  //onPress = {()=>handleCollect()}
                  style ={{ 
                    flex:1,
                    width: "7%", 
                    height: "100%",
                    justifyContent:'center',
                    alignItems:'center'}}
                >
                  <Image
                    style ={{
                      width: ScreenWidth*0.06, 
                      height: ScreenWidth*0.06,
                      }} 
                    source = {require('../../assets/Social/收藏.png')}/>
                </TouchableOpacity>
            </View>    
      </View>
    );
  }

}

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: colors.mono_60,
    width: "90%",
    alignSelf:"center",
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
    paddingTop: 23
  },
  comment: {
    flexDirection:'row',
    flex:8,
    //backgroundColor:colors.mono_80,
    borderRadius:ScreenWidth*0.02,
    height:ScreenWidth*0.1,
    width:"70%",
    borderWidth:1,
    borderColor: colors.function_100,
    marginLeft:"5%",
    //position:'absolute',
    bottom: 0,
  },
  commentC: {
    flexDirection:'row',
    //flex:1,
    backgroundColor:colors.mono_40,
    height:"7%",
    width:"100%",
    alignItems:'center',
    position:'absolute',
    bottom: 40,
  },
  buttonText: {
    //color: '#fff',
    fontSize: 15,
    left: 5,
    fontWeight: 'bold',
  },
});