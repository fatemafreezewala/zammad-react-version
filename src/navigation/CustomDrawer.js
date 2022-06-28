import React,{useContext,useState} from 'react'
import { View, StyleSheet, TouchableOpacity,Image,Text,Alert,Modal  } from 'react-native'
import {
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer'
import MCI from 'react-native-vector-icons/AntDesign'
import AuthContext from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../constants/api'
import { theme } from '../core/theme'

function CustomDrawer(props) {
	const [modalVisible, setModalVisible] = useState(false); 

    const { signOut } = useContext(AuthContext) 
	const [overview, setOverviews] = useState(null)
	React.useEffect(() => {
		getOverview()
	
	  return () => {
		getOverview()
	  }
	}, [])
	
	const getOverview = async() =>{
		const res = await api.get('ticket_overviews?_=123');
	  
		  if (res.ok) {  
			setOverviews(res.data)      
			  console.log(res.data)
			  //setLoading(false)
		  } else {
		   //Alert.alert(localization.Error_while_login)
		   setLoading(false)
		  }
	} 
	

    
	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
			
			<View style={styles.drawerHeader}>
				<TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
					<MCI name="close" size={25} color="#000" />
				</TouchableOpacity>
				<View style={{ width: 50 }} /> 
			</View>
			
			<DrawerContentScrollView {...props}>
				<DrawerItemList {...props} />
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
