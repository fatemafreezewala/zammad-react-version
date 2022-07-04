import { DefaultTheme } from 'react-native-paper'
import apiconstants from '../constants/apiconstants'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: apiconstants.role == 'CLIENT' ? apiconstants.theme : apiconstants.sostheme,
    secondary: '#414757', 
    error: '#f13a59',
    surface:''
  },
}