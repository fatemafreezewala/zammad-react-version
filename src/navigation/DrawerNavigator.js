import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { StyleSheet,Text } from 'react-native'
import Home from '../screens/operator/OHome'

import CustomDrawer from './CustomDrawer';
const  Drawer = createDrawerNavigator()
const DrawerNavigator = () => { 
	return ( 
		<Drawer.Navigator 
			drawerContentOptions={{ 
				activeTintColor: '#4361EE',
				inactiveTintColor: '#303030',
                activeBackgroundColor:'transparent',
				labelStyle: {
					fontSize: 16,
				},
			}}
            drawerStyle={{
                width: '100%',
            }}
			drawerContent={(props) => <CustomDrawer {...props} />}>
			<Drawer.Screen
				options={{
					drawerLabel: ({focused}) => (<Text style={[styles.textlabel,{color:focused == true ? '#4361EE' : '#000'}]}>Home</Text>)
				}}
				name="Home"
				component={Home}
			/>

			
			{/* <Drawer.Screen
				name="AddRequest"
				component={AddRequest}
                options={{
					drawerLabel: ({focused}) => (<Text style={[styles.textlabel,{color:focused == true ? '#4361EE' : '#000'}]}>Purchase Product</Text>)
				}}
			/> */}
			
		</Drawer.Navigator>
	)
}
const styles = StyleSheet.create({
	textlabel:{
        color:'#000',
        fontSize:16
    }
})
export default DrawerNavigator
