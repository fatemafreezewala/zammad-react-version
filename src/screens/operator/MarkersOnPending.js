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
          injectedJavaScript={`var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
           
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
          }),
          latlng = L.latLng(34.6820, -1.9002);
    
        var map = L.map('map', {center: latlng, zoom: 13, layers: [tiles]});
    
        var markers = L.markerClusterGroup();
        var addressPoints = ${JSON.stringify(marker)};
        var greenIcon = L.icon({ 
          iconUrl: 'placeholder.png',
        
    
          iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, 62],  // the same for the shadow
          popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
        for (var i = 0; i < addressPoints.length; i++) {
         
            
          var a = addressPoints[i]; 
          var title = a[3];
          var marker = L.marker(new L.LatLng(a[0], a[1]), { title: title});
          marker.bindPopup(title);
          markers.addLayer(marker);
        }
        lc = L.control.locate({
      strings: {
          title: "Show me where I am, yo!"
      }
  }).addTo(map);
        map.addLayer(markers)`}
          source={{ uri:"file:///android_asset/leaflet/index.html",baseUrl:"file:///android_asset/leaflet/"}}
          onMessage={(event) => {
            // navigation.navigate('TicketsDetails',{
            //   id:item.id,
            //   to:getReplyToAddress(item.id),
            //   typeId:10,
            //   ticketId:item.id,
            //   priority:item.priority_id,
            //   state_id:item.state_id
            // })
            console.log(event.nativeEvent.data)
          }}
          />)}
      
    </View>
  )
}

export default MarkersOnPending

const styles = StyleSheet.create({})