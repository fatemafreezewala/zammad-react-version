import { StyleSheet, Text, View,useWindowDimensions ,TouchableOpacity, ScrollView,Image} from 'react-native'
import React from 'react'

import RenderHtml from 'react-native-render-html';
import { WebView } from 'react-native-webview';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Back from 'react-native-vector-icons/AntDesign'
import localization from '../../constants/localization';

const ExtraInfo = ({navigation}) => {
  const { width } = useWindowDimensions();
  const source = {
    html: localization.additional_info_txt
  };
  return (
    <>
    <View style={{backgroundColor:'#fff',flex:1}}>
    <View style={{height:50,backgroundColor:'#fff',flexDirection:'row',alignItems:'center'}}>
     <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:10,backgroundColor:'#fff'}}>
        <Back  size={30} color="#000" name="arrowleft"></Back>
        </TouchableOpacity>
        <Text style={{color:'#000',marginLeft:10,fontSize:20}}>Infos Pratiques</Text>
     </View>
    <ScrollView showsVerticalScrollIndicator={false}>
    <Image style={styles.imgae} source={require('../../assets/info.png')}></Image>
    <RenderHtml contentWidth={width} source={source}></RenderHtml>
    </ScrollView>
    </View>
    </>
    
  );
}

export default ExtraInfo

const styles = StyleSheet.create({
    imgae:{
        width:100,
        height:100,
        alignSelf:'center'
      },
}) 