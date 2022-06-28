import { ActivityIndicator, StyleSheet,Image,
   Text, View,TouchableOpacity,useWindowDimensions,TextInput,Modal, ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import api from '../../constants/api'
import { theme } from '../../core/theme'
import Back from 'react-native-vector-icons/AntDesign'
import RenderHtml from 'react-native-render-html';
import ION from 'react-native-vector-icons/Ionicons'
import Ant from 'react-native-vector-icons/FontAwesome'
import {launchCamera,launchImageLibrary} from 'react-native-image-picker';
import Button from '../../components/Button'
import Toast from 'react-native-simple-toast';
import localization from '../../constants/localization'

const TicketsDetails = ({navigation,route}) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const {id,to,typeId,ticketId,priority,state_id} = route.params
    const { width } = useWindowDimensions();
    const [modalVisible, setModalVisible] = useState(false);
    const [mimetype, setMimetype] = useState('')
    const [image, setImage] = useState([])
    const [message, setmessage] = useState('')
    const [mloading, setMLoading] = useState(false)
    useEffect(() => {
     
        getDetails()
    
      return () => {
        getDetails()
      }
    }, [])
    
    const getDetails = () =>{
        
     api.get("tickets/" + id + "?all=true").then(res=>{
      setData(res.data)
     }).catch(err=>{

     }).finally(()=>{
        setLoading(false)
     })
        
    }
    const selectFile = (type) => {
      setModalVisible(false)
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
  
          setImage([{
            "filename": `image.${res.assets[0].type.split('/')[1]}`,
             "data": "data:'"+res.assets[0].type+"';base64,"+res.assets[0].base64,
             "mime-type": res.assets[0].type
          }])
          }
  
      });
  
     }else{
      launchImageLibrary(options, res => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        }else {
         
  
          setImage([{
            "filename": `image.${res.assets[0].type.split('/')[1]}`,
             "data": "data:'"+res.assets[0].type+"';base64,"+res.assets[0].base64,
             "mime-type": res.assets[0].type
          }])
          }
  
      });
     }
  
    };
    const ReplytoTicket = async() =>{
      console.log(image)
      setMLoading(true)
      const res = await api.post('ticket_articles',{
        ticket_id: id,
        to: to,
        subject: '',
        body: message,
        content_type: "text/plain",
        type: 'email',
        type_id: typeId,
        attachments:image
     });
     console.log(res)
     if(res.status == 201){
      Toast.show('Message Sent.', Toast.LONG);

      getDetails()
      setmessage('')
      setImage([])
      setMLoading(false)
     }else{
      Toast.show('Message Failed',Toast.LONG)
      setMLoading(false)
     }
  
    }
  
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
        <View style={{minHeight:70,flexDirection:'row',alignItems:'center',padding:15}}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
         
              <Back  size={30} color="#000" name="arrowleft"></Back>
              </TouchableOpacity>
              <Text style={{color:'#000',marginLeft:10,fontSize:20}}>{localization.TICKET_DETAILS}</Text>
        </View>
      <ScrollView>
      {loading && (<ActivityIndicator size="large" color={theme.colors.primary}></ActivityIndicator>)}
      {data && data.ticket_article_ids && data.ticket_article_ids.map((ticketRef) => {

let article = data.assets.TicketArticle[ticketRef]
article.created_by = article.created_by_id ? data.assets.User[article.created_by_id] : {}
article.organization = article.created_by.organization_id ? data.assets.Organization[article.created_by.organization_id] : {}

return (

    <View style={{margin:5}} key={article.id}>
        <View style={{borderBottomWidth:1,borderBottomColor:'grey',minHeight:70,padding:10}}>
            {/* <p style={{"float":"right"}}><TimeAgo datetime={article.created_at} /></p> */}
            <Text style={{color:'#000',fontSize:20}}>{article.subject}</Text>
            <Text style={{color:'grey',fontSize:18}}>{article.created_by.firstname && article.created_by.firstname.length > 1 ? (
                <Text>{article.created_by.firstname} {article.created_by.lastname} @ {article.organization.name}</Text>) : article.from}</Text>

                <Text style={{color:'grey',fontSize:18}}>{article.body}</Text>
            
            
        </View>


    </View>
)
})}
<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:5,borderBottomColor:'#3880ff',borderBottomWidth:1}}>
  <TextInput defaultValue={message} onChangeText={(text)=>{
   setmessage(text)
  }} style={{width:'85%',fontSize:18}} placeholder='Message'></TextInput>
  <ION onPress={()=>{setModalVisible(true)}} name="attach" color="#000" size={30}></ION>
</View>
{image.length != 0 && (<Image style={{width: 150, height: 100, resizeMode: 'contain'}} source={{uri: 'data:image/png;base64,'+image[0].data}}/>
)}
<Button loading={mloading} onPress={()=>{ReplytoTicket()}} mode="contained">ENVOYER</Button>
      </ScrollView>
<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
         
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{color:'#000',fontSize:20,fontWeight:'bold',marginBottom:20}}>Select Photo</Text>
           <TouchableOpacity  onPress={()=>{selectFile('camera')}}>
           <View style={{flexDirection:'row',alignItems:'center'}}>
              <Ant size={40} name='camera'></Ant>
              <Text style={{fontWeight:'bold',marginLeft:15,fontSize:20}}>Camera</Text>
            </View>
           </TouchableOpacity>
           <TouchableOpacity  onPress={()=>{selectFile('g')}}>
           <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
            <Ant size={40} name='photo'></Ant>
            <Text  style={{fontWeight:'bold',marginLeft:15,fontSize:20}}>Gallery</Text>
            </View>
           </TouchableOpacity>
            
            
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default TicketsDetails

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