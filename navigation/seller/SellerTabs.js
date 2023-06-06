import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from '../../utils/constants';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeStack from './HomeStack';
import SalesStack from './SalesStack';
import SettingsStack from './SettingsStack';


const Tab = createBottomTabNavigator();

let iconName,iconColor;
export default function SellerTabs() {

  function getIsTabBarShown(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "HomeStack";
    
   
    switch (routeName) {
        case "Cart":
          
            return 'none';
        case "Favorites":
            return 'none';
        case "ProfileView":
            return 'none';
        case "UpdateProfile":
            return 'none';
        default:
            return true;
    }
}

  return (
    
      <Tab.Navigator 
        initialRouteName="HomeStack"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: colors.primary,
          tabBarIcon: ({ focused, color, size }) => {
            
            if (route.name === 'HomeStack') {
              iconName = 'home-outline';
                iconColor = focused ? 'black' : colors.primary 
            } else if (route.name === 'SalesStack') {
              iconName = 'newspaper-outline';
                iconColor = focused ? 'black' : colors.primary 
            }else if(route.name === 'DeliveryStack'){
                return <MaterialCommunityIcons name="truck-fast-outline" color={focused ? 'black' : colors.primary } size={size} />
            }
            
            else {
              iconName = 'cog-outline';
              iconColor = focused ? 'black' : colors.primary 
            } 
            return <Ionicons name={iconName} size={size} color={iconColor} />;
          },
        })}
       >
        <Tab.Screen name="HomeStack" component={HomeStack} options = {({route})=>({ tabBarLabel: 'Home',headerShown: false,tabBarLabelStyle : {fontSize: 10}})}  />
        <Tab.Screen name="SalesStack" component={SalesStack} options = {({route})=>({ tabBarLabel: 'Sales History',headerShown: false,tabBarLabelStyle : {fontSize: 10}})}  />
        <Tab.Screen name="SettingsStack" component={SettingsStack} options = {({route})=>({ tabBarLabel: 'Settings',headerShown: false,tabBarLabelStyle : {fontSize: 10}})}  />
       
      </Tab.Navigator>
     
    
  )
}
