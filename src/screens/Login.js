import { StyleSheet, View,TouchableOpacity, KeyboardAvoidingView, Alert,ScrollView } from 'react-native'
import React, { useEffect,useState } from 'react'
import api from '../constants/api'
import { ActivityIndicator, Text } from 'react-native-paper'

import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Background from '../components/Background'
import Logo from '../components/Logo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthContext from '../context/AuthContext';
import { theme } from '../core/theme'
import localization from '../constants/localization'
import apiconstants from '../constants/apiconstants'
import base64 from 'react-native-base64'

const Login = () => {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const {signIn} = React.useContext(AuthContext);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const createNewUser = async() =>{
    setLoading(true)
    const res = await api.post('users', {
      "phone": phone,
      "roles": "Customer"
    });

    if (res.ok) {        
        await AsyncStorage.setItem('user', JSON.stringify(res.data));
        signIn();
        setLoading(false)
    } else {
     Alert.alert(localization.Error_while_login)
     setLoading(false)
    }
    
  }
  const loginInapp = async() =>{
    
   if(phone != ''){
    setLoading(true)
    const res = await api.get(`users/search?query=${phone}`);
    if (res.ok) {     
      if(res.data.length != 0){
        await AsyncStorage.setItem('user', JSON.stringify(res.data[0]));
        signIn();
        setLoading(false)
      }   else{
        createNewUser()
      }
      
  } else {
    Alert.alert(localization.Error_while_login)
    setLoading(false)
  }

}else{
  Alert.alert(localization.Please_enter_valid_phone_number)
}
   
  }
  const loginOperator = async() =>{
    setLoading(true)
    api.setHeaders({
      Authorization: `Basic ${base64.encode(username+":"+password)}`
    })
    api.get("user_access_token").then(res=>{
      let permissions = res.data.permissions
      createToken(permissions)
    })
  }
  const createToken = async(permissions) =>{
    const res = await api.post('user_access_token', {
      label: "app_login",
      permission: permissions.map((p)=>p.name),
  });
  if(res.ok == true){
    api.setHeaders({
      Authorization: `Token token=${res.data.name}`
    })
    await AsyncStorage.setItem('user', JSON.stringify({}));
    signIn();
    setLoading(false)
  }else{
    setLoading(false)
    Alert.alert(localization.Error_while_login)
  }
  } 
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
       <ScrollView >
       <Background>
       
        <Logo style={{marginTop:80}}></Logo>
        {apiconstants.role == 'CLIENT' ? ( <TextInput
        label={localization.Phone_Number}
        returnKeyType="next"
        onChangeText={(text) => setPhone(text)}
        keyboardType="numeric"
      />) : (<>
        <TextInput
        label="Username"
        returnKeyType="next"
        onChangeText={(text) => setUsername(text)}
        keyboardType="default"
        
      />
      <TextInput
        label="Password"
        returnKeyType="next"
        onChangeText={(text) => setPassword(text)}
        keyboardType="default"
        secureTextEntry={true}
      />
        
        </>)}
      
      <TouchableOpacity  onPress={()=>{
        if(apiconstants.role == 'CLIENT'){
          loginInapp()
        }else{
          loginOperator()
        }
      }} style={{width:'100%',
      borderRadius:5,height:50,backgroundColor:theme.colors.primary,justifyContent:'center',alignItems:'center'}}>
     
        {loading ? (<ActivityIndicator color='#fff' size="small"></ActivityIndicator>) : (<Text style={{color:'#fff',fontSize:18}}>Login</Text>)}
        
     
      </TouchableOpacity>
     
        
      
       </Background>
       </ScrollView>
        
     
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})