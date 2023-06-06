import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeStack from './HomeStack';
import { colors } from '../../utils/constants';
import TransactionStack from './TransactionStack';
import DeliveryStack from './DeliveryStack';
import AccountStack from './AccountStack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

let iconName,iconColor;
export default function BuyerTabs() {

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
          tabBarActiveTintColor: '#3E3627',
          tabBarInactiveTintColor: colors.primary,
          tabBarIcon: ({ focused, color, size }) => {
            
            if (route.name === 'HomeStack') {
              iconName = 'home-outline';
                iconColor = focused ? '#3E3627' : colors.primary 
            } else if (route.name === 'TransactionStack') {
              iconName = 'newspaper-outline';
                iconColor = focused ? '#3E3627' : colors.primary 
            }else if(route.name === 'DeliveryStack'){
                return <MaterialCommunityIcons name="truck-fast-outline" color={focused ? '#3E3627' : colors.primary } size={size} />
            }
            
            else {
              iconName = 'person-outline';
              iconColor = focused ? '#3E3627' : colors.primary 
            } 
            return <Ionicons name={iconName} size={size} color={iconColor} />;
          },
        })}
       >
        <Tab.Screen name="HomeStack" component={HomeStack} options = {({route})=>({ tabBarLabel: 'Home',headerShown: false,tabBarLabelStyle : {fontSize: 10}})}  />
        <Tab.Screen name="TransactionStack" component={TransactionStack} options = {{ tabBarLabel: 'Transactions',headerShown: false,tabBarLabelStyle : {fontSize: 10}}}  />
        <Tab.Screen name="DeliveryStack" component={DeliveryStack} options = {{ tabBarLabel: 'Delivery',headerShown: false,tabBarLabelStyle : {fontSize: 10}}}  />
        <Tab.Screen name="AccountStack" component={AccountStack} options = {({route})=>({ tabBarLabel: 'Account',headerShown: false,tabBarLabelStyle : {fontSize: 10}})}  />

      </Tab.Navigator>
     
    
  )
}
