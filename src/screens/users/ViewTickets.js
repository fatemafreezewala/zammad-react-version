import { StyleSheet, Text, View,FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import api from '../../constants/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { theme } from '../../core/theme';
import localization from '../../constants/localization';
const ViewTickets = ({navigation}) => {
  const [tickets, setAlltickets] = React.useState(null)
  const [loading, setloading] = React.useState(true)
  const [data, setCompleteData] = React.useState(null)
  React.useEffect(() => {
    getAllTicketsForClient()
  
    return () => {
      getAllTicketsForClient()
    }
  }, [])
  
    const getAllTicketsForClient = async() =>{
      setloading(true)
      let user = await AsyncStorage.getItem('user')
      user = JSON.parse(user)

         api.get(`tickets/search?query=${user.phone}`).then(res=>{
          setCompleteData(res.data)
          console.log(res.data)
          let allTickets = res.data.assets.Ticket
            let ticketData =[]
            for (var key in allTickets) {
                if (allTickets.hasOwnProperty(key)) {
                    ticketData.push(allTickets[key])
                }
            }
            ticketData = ticketData.reverse()
            setAlltickets(ticketData)
         }).finally(()=>{
          setloading(false)
         })
         
    }
    const getReplyToAddress = (id)=> {
    
     if(data.assets.Ticket[id].customer_id){
      return ''
     }else{
      let customerId = data.assets.Ticket[id].customer_id;
      let article = data.assets.TicketArticle[[...data.ticket_article_ids].reverse().find(ticketRef => {
          let article = data.assets.TicketArticle[ticketRef]
          if (article.created_by_id === customerId) return true;
      })]

      if (article && article.created_by === customerId) return article.from;
      return data.assets.User[customerId].email || data.assets.User[customerId].mobile;
     }
      
  }

  return (
    <View style={{flex:1,padding:15}}>
     <View style={{height:50}}>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:5}}>
      <AntDesign size={30} color="#000" name="arrowleft"></AntDesign>
      </TouchableOpacity>
     </View>
     
     {tickets ? (<FlatList
     
     showsVerticalScrollIndicator={false}
     key={Math.random().toString()}
     data={tickets}
      renderItem={({item,index})=>(<TouchableOpacity onPress={()=>navigation.navigate('TicketsDetails',{
        id:item.id,
        to:getReplyToAddress(item.id),
        typeId:10,
        ticketId:item.id,
        priority:item.priority_id,
        state_id:item.state_id
      })} style={{
   width:'100%',minHeight:70,borderBottomColor:'grey',borderBottomWidth:1}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          {item.state_id == '1' && (<View style={{width:9,height:9,borderRadius:10,backgroundColor:'#3f93c5'}}></View>)}
                 {item.state_id == '4' && (<View style={{width:9,height:9,borderRadius:10,backgroundColor:'#4ec53f'}}></View>)}
                 {item.state_id == '2' && (<View style={{width:9,height:9,borderRadius:10,backgroundColor:'#ffa02a'}}></View>)}
                 <Text style={{color:'#000',fontSize:18,marginLeft:10}}>{item.title}</Text>
          </View>
          
          <Text style={{color:'#000',fontSize:18,fontWeight:'bold'}}>No. {item.number}</Text>
        </View>
        <View>
          <Text style={{color:'#000',fontSize:16,marginTop:10}}>{item.note}</Text>
        </View>
      </TouchableOpacity>)}
     
     ></FlatList>) : (<View style={{flex:1}}>
      {loading && (<ActivityIndicator size="large" color={theme.colors.primary}></ActivityIndicator>)}
      <Text style={{color:'#000',fontSize:20,fontWeight:'600'}}>{localization.No_tickets_Found}</Text>
      <Button mode='contained'>{localization.Create_Ticket}</Button>
     </View>)}
     
    </View>
  )
}



export default ViewTickets

const styles = StyleSheet.create({})