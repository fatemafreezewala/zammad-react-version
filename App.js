import React,{useEffect} from 'react';
import {Text,SafeAreaView,Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import {AppProvider} from './src/context/AppContext';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/core/theme';

const App = () => {
  
 

  return (<PaperProvider theme={theme}>
  
  <AppProvider><SafeAreaView style={{flex:1,backgroundColor:'#fff'}}><AppNavigator /></SafeAreaView>
  </AppProvider></PaperProvider>);
};
  
export default App; 