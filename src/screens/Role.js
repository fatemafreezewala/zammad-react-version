import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React from 'react'
import apiconstants from '../constants/apiconstants'
import {theme} from '../core/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../constants/api'

const Role = ({navigation}) => {
    React.useEffect(() => {
      checkRole()
    
      return () => {
        checkRole()
      }
    }, [])
    const checkRole = async()=>{
        if(apiconstants.role == 'CLIENT'){
            navigation.navigate('Home')
        }else{
          let token = await AsyncStorage.getItem('token');
          api.setHeaders({
            Authorization: `Token token=${token}` 
          })
            navigation.navigate('Ohome')
        }
        
    }
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color={theme.colors.primary}></ActivityIndicator>
        <Text>Please wait...</Text>
    </View>
  )
}

export default Role

const styles = StyleSheet.create({})