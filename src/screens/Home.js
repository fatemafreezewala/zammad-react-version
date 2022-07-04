import { StyleSheet, Text, View ,Image,Linking,Alert, Touchable,TouchableOpacity, ScrollView,BackHandler} from 'react-native'
import React,{useContext,useEffect} from 'react'
import { Button } from 'react-native-paper';
import ANT from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthContext from '../context/AuthContext';

import localization from '../constants/localization'
import apiconstants from '../constants/apiconstants'
const Home = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  const logout = async()=>{
    await AsyncStorage.clear()
    signOut()
  }
  const backAction = () => {
    Alert.alert(localization.Hold_on, localization.Are_you_sure_you_want_to_go_back, [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", backAction);

  //   return () =>
  //     BackHandler.removeEventListener("hardwareBackPress", backAction);
  // }, []);
  return ( 
    <View style={{flex:1,padding:15,backgroundColor:'#fff'}}>
      <View style={{height:80,flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{color:'#000',fontWeight:'bold',fontSize:25}}>DASHBOARD</Text>
        <ANT onPress={()=>{logout()}} name="logout" size={30} color="red"></ANT>
      </View>
     <ScrollView showsVerticalScrollIndicator={false}>
     {apiconstants.role == 'CLIENT' && (<Text style={{color:'black',fontSize:19,marginTop:10,marginBottom:10}}>{localization.call_text}</Text>)}
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <TouchableOpacity style={styles.column} onPress={()=>navigation.navigate('CreateTicket')} >
          <View style={{flex:1}}>
          <Image style={styles.imgae} source={require('../assets/essay.png')}></Image>
          <Text style={styles.title}>NOUVELLE DEMANDE</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('ViewTickets')} style={styles.column}>
        <Image style={styles.imgae} source={require('../assets/paper.png')}></Image>
        <Text style={styles.title}>MES RECLAMATIONS</Text>
        </TouchableOpacity>
      </View>
      <View  style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Map')} style={styles.column}>
        <Image style={styles.imgae} source={require('../assets/map.png')}></Image>
        <Text style={styles.title}>Localisez conteneurs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Info')} style={styles.column}>
        <Image style={styles.imgae} source={require('../assets/calendar.png')}></Image>
        <Text style={styles.title}>Horaires</Text>
        </TouchableOpacity>
      </View>
      <View  style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
        <TouchableOpacity onPress={()=>navigation.navigate('ExtraInfo')} style={styles.column}>
        <Image style={styles.imgae} source={require('../assets/info.png')}></Image>
        <Text style={styles.title}>Infos Pratiques</Text>
        </TouchableOpacity>
       
      </View>
     {apiconstants.role == 'CLIENT' && ( <Button icon="phone" mode="contained" style={{marginTop:20}} onPress={() =>{
        Linking.openURL(`tel:0522755490`)

      }}>
      {localization.contact_button_text}
  </Button>)}
  <Button onPress={()=>{backAction()}}>Exit App</Button>
     </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  column:{
    width:'48%',
    backgroundColor:'#fff',
    height:140,
    elevation:3,
    justifyContent:'center',
    alignContent:'center',
    flexDirection:'column',
    alignItems:'center'
  },
  imgae:{
    width:60,
    height:60
  },
  title:{
    color:'#000',
    fontSize:17,
    marginTop:10
  }
})