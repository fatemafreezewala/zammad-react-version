import React, {useState, useEffect, useReducer, useMemo} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Map from '../screens/Map';

import AuthContext, {reducer, defaultState} from '../context/AuthContext';
import {AppProvider} from '../context/AppContext';
import CreateTicket from '../screens/CreateTicket';
import ViewTickets from '../screens/users/ViewTickets';
import TicketsDetails from '../screens/users/TicketsDetails';
import Info from '../screens/users/Info';
import ExtraInfo from '../screens/users/ExtraInfo';
import Role from '../screens/Role';
import DrawerNavigator from './DrawerNavigator'




const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  // const setUser = useStore(state => state.setUser);
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    restoreToken();
  }, []);

  const restoreToken = async () => {
    let user = await AsyncStorage.getItem('user');
    if (user) {
      dispatch({type: 'RESTORE_TOKEN', token: '123'});
    } else {
      dispatch({type: 'RESTORE_TOKEN', token: null});
    }
  };

  const authContext = useMemo(
    () => ({
      signIn: () => {
        dispatch({type: 'SIGN_IN', token: '123456'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
    }),
    [],
  );

  if (state.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return (
    <AppProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {state.userToken == null ? (
              <>
 <Stack.Screen name="Login" component={Login} />
              
              </>
            ) : ( 
              <>
              
              <Stack.Screen name="Role" component={Role}></Stack.Screen>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="TicketsDetails" component={TicketsDetails} />
                <Stack.Screen name="Map" component={Map} />
               
               <Stack.Screen name="CreateTicket" component={CreateTicket} />
               <Stack.Screen name="Info" component={Info} />
               <Stack.Screen name="ExtraInfo" component={ExtraInfo} />
               
<Stack.Screen name="ViewTickets" component={ViewTickets} />
<Stack.Screen name="Ohome" component={DrawerNavigator}></Stack.Screen>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </AppProvider>
  );
};

export default AppNavigator;
