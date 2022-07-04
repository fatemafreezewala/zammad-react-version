import { StyleSheet, Text, View ,Image,Linking,Alert, Touchable,TouchableOpacity, ScrollView,BackHandler, ActivityIndicator} from 'react-native'
import React,{useContext,useEffect,useState} from 'react'
import { Button } from 'react-native-paper';
import ANT from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthContext from '../../context/AuthContext';

import localization from '../../constants/localization'
import api from '../../constants/api';

const Home = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const logout = async()=>{
    await AsyncStorage.clear()
    signOut()
  }
  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };
const getMarker = ()=>{
		setLoading(true)
		api.get(`ticket_overviews?view=all_escalated`).then(res=>{
       
			// setCompleteData(res.data)
			 let allTickets = res.data.assets.Ticket
			   let ticketData =[]
			   for (var key in allTickets) {
				   if (allTickets.hasOwnProperty(key)) {
					   ticketData.push(allTickets[key])
				   } 
			   }
			   ticketData = ticketData.reverse()
			   console.log(ticketData[0])
			   let arraym = []
			   ticketData.forEach(element => {
				 if(element.coordinates){
				   let arr = element.coordinates.split(',');
				   arr[0] = parseFloat(arr[0])
				   arr[1] = parseFloat(arr[1])
				   arr[2] = element.id
				   arr[3] = element.title
				   arr[4] = element.number
				   arraym.push(arr)
				 }
				 
			   });
			  
			  
			   navigation.navigate('MarkersOnPending',{marker:arraym.slice(0,20)})
	
			}).finally(()=>{
			 setLoading(false)
			})
		
	}
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
     
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <TouchableOpacity style={styles.column} onPress={()=>navigation.navigate('CreateTicket')} >
          <View style={{flex:1}}>
          <Image style={styles.imgae} source={require('../../assets/essay.png')}></Image>
          <Text style={styles.title}>NOUVELLE DEMANDE</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{getMarker()}} style={styles.column}>
        <Image style={styles.imgae} source={require('../../assets/map.png')}></Image>
        <Text style={styles.title}>Localisez conteneurs</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={()=>navigation.navigate('ViewTickets')} style={styles.column}>
        <Image style={styles.imgae} source={require('../../assets/paper.png')}></Image>
        <Text style={styles.title}>MES RECLAMATIONS</Text>
        </TouchableOpacity> */}
      </View>
      <View  style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
       
        {loading == true && (<ActivityIndicator size="small" color="black"></ActivityIndicator>)}
        {/* <TouchableOpacity onPress={()=>navigation.navigate('Info')} style={styles.column}>
        <Image style={styles.imgae} source={require('../../assets/calendar.png')}></Image>
        <Text style={styles.title}>Horaires</Text>
        </TouchableOpacity> */}
      </View>
      {/* <View  style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
        <TouchableOpacity onPress={()=>navigation.navigate('ExtraInfo')} style={styles.column}>
        <Image style={styles.imgae} source={require('../../assets/info.png')}></Image>
        <Text style={styles.title}>Infos Pratiques</Text>
        </TouchableOpacity>
       
      </View> */}
      
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