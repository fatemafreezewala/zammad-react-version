import { StyleSheet, Text, View,useWindowDimensions ,TouchableOpacity} from 'react-native'
import React from 'react'

import RenderHtml from 'react-native-render-html';
import { WebView } from 'react-native-webview';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Back from 'react-native-vector-icons/AntDesign'
import apiconstants from '../constants/apiconstants';
import localization from '../constants/localization';

const Map = ({navigation}) => {
  const { width } = useWindowDimensions();
  return (
    <>
     <View style={{height:50,backgroundColor:'#fff',flexDirection:'row',alignItems:'center'}}>
     <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:10,backgroundColor:'#fff'}}>
        <Back  size={30} color="#000" name="arrowleft"></Back>
        </TouchableOpacity>
        <Text style={{color:'#000',marginLeft:10,fontSize:20,textTransform:'uppercase'}}>{localization.map}</Text>
     </View>
     <WebView style={{flex:1}} source={{ uri: apiconstants.mapUrl }} />
    </>
    
  );
}

export default Map

const styles = StyleSheet.create({}) 