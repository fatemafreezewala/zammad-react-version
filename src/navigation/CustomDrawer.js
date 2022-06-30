import React,{useContext,useState} from 'react'
import { View, StyleSheet, TouchableOpacity,Image,Text,Alert,Modal, ActivityIndicatorBase, ActivityIndicator  } from 'react-native'
import {
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer'
import MCI from 'react-native-vector-icons/AntDesign'
import AuthContext from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../constants/api'
import { theme } from '../core/theme'
import { getMarkerBoxStyle } from 'react-native-render-html/lib/typescript/elements/ListElement'

function CustomDrawer(props) {
	const [modalVisible, setModalVisible] = useState(false); 

    const { signOut } = useContext(AuthContext) 
	const [overview, setOverviews] = useState(null)
	const [loading, setLoading] = useState(false)
	const [user, setUser] = useState(null)
	React.useEffect(() => {
		getOverview()
		getUesr()
	  return () => {
		getOverview()
		getUesr()
	  }
	}, [])
	
	const getOverview = async() =>{
		setLoading(true)
		
		const res = await api.get('ticket_overviews?_=123');
	  
		  if (res.ok) {  
			setOverviews(res.data)      
			  
			  setLoading(false)
			  //setLoading(false)
		  } else {
		   //Alert.alert(localization.Error_while_login)
		   setLoading(false)
		  }
	} 
	const getMarker = ()=>{
		setLoading(true)
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
			   console.log(ticketData[0])
			   let arraym = []
			   ticketData.forEach(element => {
				 if(element.coordinates){
				   let arr = element.coordinates.split(',');
				   arr[0] = parseFloat(arr[0])
				   arr[1] = parseFloat(arr[1])
				   arr[2] = element.id
				   arraym.push(arr)
				 }
				 
			   });
			  
			  
			   props.navigation.navigate('MarkersOnPending',{marker:arraym.slice(0,20)})
	
			}).finally(()=>{
			 setLoading(false)
			})
		
	}
	const getUesr = async() =>{
		const res =  await api.get("users/me")
        
		setUser(res.data)
	}
    
	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
			
			<View style={styles.drawerHeader}>
				<TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
					<MCI name="close" size={25} color="#000" />
				</TouchableOpacity>
				<View style={{ width: 50 }} /> 
			</View>
			<Text style={{marginLeft:10,color:'#000',fontSize:18,fontWeight:'bold'}}>{user && user.firstname} {user && user.firstname}</Text>
			<Text style={{marginLeft:10,color:'#000',fontSize:16}}>{user && user.email}</Text>
			<DrawerContentScrollView {...props}>
				<DrawerItemList {...props} />

				{loading == true && (<ActivityIndicator size="small" color={theme.colors.primary}></ActivityIndicator>)}
				
				<View >
				{overview && overview.map(res=>{
						return <TouchableOpacity onPress={()=>props.navigation.navigate('TicketsByType',{link:res.link})}
						style={{height:50,marginTop:5,flexDirection:'row',alignItems:'center',paddingHorizontal:15,justifyContent:'space-between'}}>
							<Text style={{fontSize:18}}>{res.name}</Text>
							<View style={{backgroundColor:theme.colors.primary,padding:5,borderRadius:4}}>
							<Text style={{fontSize:18,color:'#fff'}}>{res.count}</Text>
							</View>
							</TouchableOpacity>
					})}
				<TouchableOpacity onPress={()=>{getMarker()}}
						style={{height:50,marginTop:5,flexDirection:'row',alignItems:'center',paddingHorizontal:15,justifyContent:'space-between'}}>
							<Text style={{fontSize:18}}>Map Markers</Text>
							<View style={{backgroundColor:theme.colors.primary,padding:5,borderRadius:4}}>
						
							</View>
							</TouchableOpacity>
				
				
			</View>
			</DrawerContentScrollView>
			
		</View>
	)
}

const styles = StyleSheet.create({
	infoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 30,
	},
	drawerHeader: {
		elevation: 3,
		padding: 20,
		marginBottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	textlabel:{
        fontFamily:'Inter-Regular',
        color:'#000',
        fontSize:16,
		marginLeft:5
    },
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	  },
	  modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
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

export default CustomDrawer
