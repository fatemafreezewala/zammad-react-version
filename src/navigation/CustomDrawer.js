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

function CustomDrawer(props) {
	const [modalVisible, setModalVisible] = useState(false); 

    const { signOut } = useContext(AuthContext) 
	const [overview, setOverviews] = useState([])
	React.useEffect(() => {
		getOverview()
	
	  return () => {
		getOverview()
	  }
	}, [])
	
	const getOverview = async() =>{
		const res = await api.get('ticket_overviews?_=123');
	  
		  if (res.ok) {        
			  console.log(res.data)
			  //setLoading(false)
		  } else {
		   //Alert.alert(localization.Error_while_login)
		   setLoading(false)
		  }
	} 
	const logOut = async() =>{

		// let mobile_number =  await MMKVStorage.getString('mobile_number')
	
		// const formData = new FormData()
		// formData.append('mobile', mobile_number)
		// const api = create({
		// 	baseURL: 'https://www.venza.my/venza_api/login_api'
		//   }) 
		//   const response = await api.post('/logout', formData, {});
		//   console.log(response.data)
		//   await AsyncStorage.clear()
		// signOut() 
	}
	const createTwoButtonAlert = () =>{
		setModalVisible(true)
	}
    // Alert.alert( 
    //   "Are you sure?",
    //   "You want to log Out ?",
    //   [
    //     {
    //       text: "Cancel",
    //       onPress: () => console.log("Cancel Pressed"),
    //       style: "cancel"
    //     },
    //     { text: "OK", onPress: () => logOut() }
    //   ]
    // );
	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
			{/* <Image style={{position:'absolute'}} source={require('../assets/sidebar.png')}></Image>
			<View style={styles.drawerHeader}>
				<TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
					<MCI name="close" size={25} color="#000" />
				</TouchableOpacity>
				<View style={{ width: 50 }} /> 
			</View>
			
			<DrawerContentScrollView {...props}>
				<DrawerItemList {...props} />
				<View style={{flexDirection:'row'}}>
				<TouchableOpacity onPress={createTwoButtonAlert}>
					<View style={{flexDirection:'row',height:70,paddingLeft:wp('3.2%'),paddingTop:hp('1.9%'),justifyContent:'space-evenly'}}>
						<Image source={require('../assets/log-in.png')}></Image><Text style={styles.textlabel}>Log Out</Text>
					</View>
				</TouchableOpacity>
			</View>
			</DrawerContentScrollView> */}
			
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
