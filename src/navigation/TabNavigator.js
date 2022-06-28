import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/app/Home';
import Booking from '../screens/app/Booking';
import Account from '../screens/app/Account';
import TalentIcon from '../assets/images/talent.svg';
import BookingIcon from '../assets/images/booking.svg';
import AccountIcon from '../assets/images/account.svg';

import TalentIcon1 from '../assets/images/talent1.svg';
import BookingIcon1 from '../assets/images/booking1.svg';
import AccountIcon1 from '../assets/images/account1.svg';
import {fonts} from '../constant/config';
import colors from '../constant/colors';
import i18n from '../i18n'
import AppContext from '../context/AppContext';

const Tabs = createBottomTabNavigator(); 

const TabNavigator = () => {
  const {lang} = React.useContext(AppContext);
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          height: 65,
          backgroundColor: '#6B6C71',
        },
        tabBarLabelStyle: {
          fontFamily: fonts.regular,
        },
        tabBarActiveTintColor: 'black',
        // tabBarActiveBackgroundColor: '#FFF8E1',
        tabBarActiveBackgroundColor: colors.primaryYellow,
        tabBarItemStyle: {
          margin: 10,
          borderRadius: 20,
        },
        
      }}>
      <Tabs.Screen
        name={i18n.t('Home', { locale: lang })}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <TalentIcon1 height={30} width={30} />
            ) : (
              <TalentIcon height={30} width={30} />
            );
          },
        }}
      />
      <Tabs.Screen
        name={i18n.t('Booking', { locale: lang })}
        component={Booking}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <BookingIcon1 height={25} width={25} />
            ) : (
              <BookingIcon height={25} width={25} />
            );
          },
        }}
      />
      <Tabs.Screen
        name={i18n.t('Account', { locale: lang })}
        component={Account}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <AccountIcon1 height={30} width={30} />
            ) : (
              <AccountIcon height={30} width={30} />
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
