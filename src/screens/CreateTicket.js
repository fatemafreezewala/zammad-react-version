import { StyleSheet, Text, View, TouchableOpacity,Image,PermissionsAndroid,ScrollView, Alert } from 'react-native'
import React,{useState} from 'react'
import pointInPolygon from 'point-in-polygon'
import Geolocation from 'react-native-geolocation-service';
import api from '../constants/api'
import TextInput from '../components/TextInput';
import {Button} from 'react-native-paper'
import {launchCamera,launchImageLibrary} from 'react-native-image-picker';

import Back from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiconstants from '../constants/apiconstants';
import localization from '../constants/localization';

const CreateTicket = ({navigation}) => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState({lat:'',long:''})
  const [user, setUser] = useState({})
  const [loading, setloading] = useState(false);
  const [mimetype, setMimetype] = useState('')
  React.useEffect(() => {
    
    checkOpe()
  
    return () => { 
      checkOpe()
    }
  }, [])
  const checkOpe = async() =>{
    
      
     
         
    
  }
  const pointInPoly = (lat,long)=>{
    var polygon = apiconstants.city_coordinates
    return pointInPolygon([ lat, long ], polygon)
  }
  const createTicket = async() =>{
    if(title != '' && message != '' && image != ''){
      let userdata = null;
      if(apiconstants.role == 'CLIENT'){
         userdata = await AsyncStorage.getItem('user')
        userdata = JSON.parse(userdata)
      }else{
        const res =  await api.get("users/me")
        userdata = res.data
      }
     
   
      setloading(true)
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      
       
        Geolocation.getCurrentPosition(
          (position) => {
            var ifinside = pointInPoly(position.coords.latitude,position.coords.longitude)
            if(ifinside == true){ 
            
              api.post('/tickets',{
                "title":title,
                "group": apiconstants.role == 'CLIENT' ? apiconstants.client_group : apiconstants.operator_group,
                "article": {
                    "subject":title,
                    "body": apiconstants.role == 'CLIENT' ? "APP SOS NADAFA": "created by IVRAgent",
                    "type": "note", 
                    "internal":false,
                    "content_type": "text/plain",
                    "attachments":[{
                      "filename": `image.${mimetype.split('/')[1]}`,
                      "data": image,
                      "mime-type": mimetype
                    }]
                },
                "customer":userdata,
                "note": message,
                "coordinates":position.coords.latitude+','+position.coords.longitude
                }).then(res=>{
               
                  if(res.status == 500){
                    Alert.alert(res.data.error)
                  }else if(res.data.id){
                    setTitle('')
                    setMessage('')
                    setImage('')
                    Alert.alert(localization.Ticket_Created_Successfully)
                    if(apiconstants.role == 'CLIENT'){
                      navigation.navigate('Home')
                    }else{ 
                      navigation.navigate('Ohome')
                    }
                  }
                })
           
            }else{
            Alert.alert(localization.Ticket_cannot_be_created_for_this_area)
            }
            
          },
          (error) => {
            // See error code charts below.
         
            setloading(false)
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
      
      }else{
        setloading(false)
        Alert.alert(localization.Location_Permission_not_granted)
      }
    }else{
      Alert.alert(localization.All_Fields_are_required)
    }
    
    
  }
  const selectFile = (type) => {
   
    var options = {
      includeBase64:true
    }
   if(type == 'camera'){
    launchCamera(options, res => {

  

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      }else {

        let source = res;
        setMimetype(res.assets[0].type)
        setImage(res.assets[0].base64)
        }

    });

   }else{
    launchImageLibrary(options, res => {

   

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      }else {

        let source = res;
        console.log(res.assets)
        setMimetype(res.assets[0].type)
        setImage(res.assets[0].base64)
        }

    });
   }

  };
  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
       authorizationLevel: 'whenInUse',
     });
    }
  
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  }
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <View style={{minHeight:70,flexDirection:'row',alignItems:'center',padding:15}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:10}}>
        <Back  size={30} color="#000" name="arrowleft"></Back>
        </TouchableOpacity>
        <Text style={{color:'#000',marginLeft:10,fontSize:20}}>NOUVELLE DEMANDE</Text>
      </View>
   
      <ScrollView style={{padding:10}}>
      <Image style={{width:150,height:150}} source={require('../assets/technical-support.png')}></Image>
    <TextInput
        label="Objet"
        returnKeyType="next"
        onChangeText={(text) => setTitle(text)}
        keyboardType="default"
        value={title}
      />
      <TextInput
        label="Message"
        returnKeyType="next"
        onChangeText={(text) => setMessage(text)}
        keyboardType="default"
        value={message}
      />
      {image != '' && (<Image style={{width: 150, height: 100, resizeMode: 'contain'}} source={{uri: 'data:image/png;base64,'+image}}/>
)}
      <Button mode='contained'  onPress={()=>{selectFile('camera')}}>PHOTO</Button>
      <Button loading={loading} mode='contained' style={{backgroundColor:'#3880ff'}} onPress={()=>{
        createTicket()
      }} >ENVOYER</Button>
      <Button mode="outlined"  onPress={()=>{

      }}>EFFACER</Button>
      </ScrollView>
      
    
   
    </View>
  )
}

export default CreateTicket

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    
  
    marginTop: 22,
    position:'absolute',
    bottom:0,
    width:'100%',
    
  },
  modalView: {
    
    backgroundColor: "white",
   
    padding: 35,
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})