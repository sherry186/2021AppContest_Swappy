import { styleSheets } from 'min-document';
import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    View, 
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Dimensions} from 'react-native';
import colors from '../../config/colors';
//import GroupItems from '../../Data/GroupItems';

let ScreenWidth = Dimensions.get("window").width;


function GroupWishingPoolScreen ({route, navigation}) {

    const { items, } = route.params;

    const [itemState, setItemState] = useState([]);

    const handleback =() =>{

      navigation.goBack()
    } 

    const handleSelect = (ind)=>{
        let arr1 = itemState.map((item, index)=>{
            if( ind == index){
              item.isSelected = !itemState.isSelected;
            }
            return {...item}
          })
        console.log("selection handler1 ==>", arr1)
        setItemState(arr1)
    }

    const renderItem = ({ item }) => (
      //console.log(this.props.navigation);
      <TouchableOpacity
        onPress = {() =>handleSelect(item.ind)}
        style={{
            //flex:1,
            flexDirection:'row',
            marginHorizontal: ScreenWidth*0.05,
            marginVertical:ScreenWidth*0.03,
            backgroundColor: item.isSelected? colors.function_100: colors.mono_60,
            width: ScreenWidth*0.18,
            height: ScreenWidth*0.06,
            alignItems:'center',
            justifyContent: 'center',
            borderRadius: ScreenWidth*0.09,
          }}>
        <View>
          <Text style={styles.buttonText}>{item.name}</Text>
          </View>    

      </TouchableOpacity>
    );

    useEffect(()=>{
        let arr = items.map((item, index)=>{
            item.isSelected = false
            item.ind = index
            return {...item};
        })
        
        setItemState(arr);

    },[])
  

    return(
    <View style={{ flex: 1, top: "5%", bottom:"20%", alignItems: 'center', backgroundColor: colors.mono_40}}>
        <View style = {{flex: 1, flexDirection: 'row', height: "7%", backgroundColor: colors.mono_40}}>
          <TouchableOpacity
            style = {{flex:2, width: "20%", backgroundColor: colors.mono_40, alignItems: 'center', justifyContent:'center'}}
            onPress = {()=>navigation.goBack()}
            >
            <Image 
              style = {{height: "25%", width: "25%"}}
              source = {require('../../assets/manyneed/xmark.png')}/>
          </TouchableOpacity>

          <View
            style ={{flex: 8, justifyContent: 'center', alignItems: 'center'}}>
              <Text style = {{right: "15%", fontSize: 20, color: colors.function_100}}>願望清單</Text>
          </View>
        </View>

          
        <View style = {{flex:1.4, alignItems: 'center', backgrounColor: colors.mono_40}}>
            <Text style = {{color: colors.mono_80}}>有什麼特別想要的物品嗎？</Text>
            <Text style = {{color: colors.mono_80}}>在這裡許下願望</Text>
            <Text style = {{color: colors.mono_80}}>系統會協助自動配對！</Text>
        </View>

          <View style = {{flex: 8, width:"100%", alignItems: 'center', justifyContent: 'center', backgrounColor: colors.mono_40}}>
            
                
                <ScrollView contentContainerStyle = {{width: '100%', backgroundColor: 'transparent', alignItems: 'center'}}>
                  <FlatList
                    data={itemState}
                    contentContainerStyle={{width: "100%", backgroundColor: 'transparent', justifyContent: 'center'}}
                    horizontal={ true }
                    numColumns={3}
                    horizontal = {false}
                    renderItem={renderItem}
                    keyExtractor={item => item.ID}
                  />
                </ScrollView>
                
          </View>

         {/* <TouchableOpacity
              title = 'add'
              onPress={() => {navigation.navigate('GroupAddItem',{tags: items})}}
              style={styles.button}>
              <Image
                style = {styles.button}
                source = {require("../../assets/general/add.png")}/>
          </TouchableOpacity> */}
      </View>
    ) 

}

export default GroupWishingPoolScreen;

const styles = StyleSheet.create({
  line: {
    marginTop: 5,
    height: 1,
    backgroundColor: colors.function_100,
    width: "90%",
    alignSelf:"center",
  },
  
  container: {
    flex:1
  },

  title: {
    fontSize: 20,
    top:10,
    fontWeight:'bold', 
  },
  tagT: {
    fontSize: 13,
    fontWeight: '300',
  },
  buttonText: {
    fontSize: ScreenWidth*0.03,
    color:colors.mono_40,
    fontWeight: '900',
  },

});