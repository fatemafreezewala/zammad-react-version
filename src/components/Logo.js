import React from 'react'
import { Image, StyleSheet } from 'react-native'
import apiconstants from '../constants/apiconstants'

export default function Logo({style}) {
  const Mycomponent = apiconstants.role == 'CLIENT' ? <Image source={apiconstants.logo} style={[styles.mimage,style]} /> : <Image source={apiconstants.soslogo} style={[styles.image,style]} />
  return Mycomponent
}

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 180,
    marginBottom: 8,
  },
  mimage:{
    width:200,
    height:300,
    marginBottom:8
  }
})