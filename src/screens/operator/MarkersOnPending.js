import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import Webview from 'react-native-webview'
import api from '../../constants/api'
import Back from 'react-native-vector-icons/AntDesign'
import apiconstants from '../../constants/apiconstants';
import localization from '../../constants/localization';
const MarkersOnPending = ({route,navigation}) => {
  const [latlongArray, setlatlongArray] = React.useState([])
  const {marker} = route.params
  React.useEffect(() => {
    getAllTicketsForClient()
  console.log(typeof marker)
    return () => {
      getAllTicketsForClient()
    }
  }, []) 
  
  const getAllTicketsForClient = async() =>{
    //setloading(true)
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
          let arraym = []
          ticketData.forEach(element => {
            if(element.coordinates){
              let arr = element.coordinates.split(',');
              arr[0] = parseFloat(arr[0])
              arr[1] = parseFloat(arr[1])
              arraym.push(arr)
            }
            
          });
         
          setlatlongArray(arraym.slice(0,20))
//setAlltickets(ticketData)
       }).finally(()=>{
        //setloading(false)
       })
        
  }
  const runFirst = `
  window.postMessage('hello','*')
`;
  return (
    <View style={{flex:1}}>
        <View style={{height:50,backgroundColor:'#fff',flexDirection:'row',alignItems:'center'}}>
     <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:10,backgroundColor:'#fff'}}>
        <Back  size={30} color="#000" name="arrowleft"></Back>
        </TouchableOpacity>
        <Text style={{color:'#000',marginLeft:10,fontSize:20,textTransform:'uppercase'}}>{localization.map}</Text>
     </View>
      {marker && (<Webview 
          style={{flex:1}}
          originWhitelist={["*"]} 
          scalesPageToFit={true}
          javaScriptEnabled={true}
          injectedJavaScript={` var planes = ${JSON.stringify(marker)};
          var greenIcon = L.icon({ 
            iconUrl: 'placeholder.png',
          
      
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
              var map = L.map('map').setView([33.6917226, -7.3767413], 13);
              mapLink = 
                  '<a href="http://openstreetmap.org">OpenStreetMap</a>';
              L.tileLayer(
                  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '&copy; ' + mapLink + ' Contributors',
                  }).addTo(map);
      
                  for (var i = 0; i < planes.length; i++) {
           
                    const src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Stack_Exchange_logo_and_wordmark.svg/375px-Stack_Exchange_logo_and_wordmark.svg.png";
        const popupContent = document.createElement("div")
        popupContent.innerHTML = "<img width='100' height='100' src='http://support.sos-ndd.com/api/v1/ticket_attachment/1156/617/508?disposition=attachment'></img>"
                               + "<button onclick={getId(i)}>Edit Ticket</button>"
                    marker = new L.marker([planes[i][0],planes[i][1]], {customId:"010000006148"}).addTo(map)
                    marker.myID = planes[i][2];
                    marker.bindPopup(
                        popupContent,
                        { maxWidth: "auto" }
                        
                    ).on('click',function(e) {
                      var i = e.target.myID;
                      window.ReactNativeWebView.postMessage(i)
                    })
                      .addTo(map);
                  }`}
          source={{ uri:"file:///android_asset/leaflet/index.html",baseUrl:"file:///android_asset/leaflet/"}}
          onMessage={(event) => {
            navigation.navigate('TicketsDetails',{
              id:item.id,
              to:getReplyToAddress(item.id),
              typeId:10,
              ticketId:item.id,
              priority:item.priority_id,
              state_id:item.state_id
            })
            console.log(event.nativeEvent.data)
          }}
          />)}
      
    </View>
  )
}

export default MarkersOnPending

const styles = StyleSheet.create({})