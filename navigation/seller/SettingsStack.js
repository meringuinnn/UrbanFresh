import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../../utils/constants';

import SalesHome from '../../screens/seller/SalesHome';
import UnpaidOrders from '../../screens/seller/UnpaidOrders';
import OrderDetails from '../../screens/seller/OrderDetails';
import ShippingOrders from '../../screens/seller/ShippingOrders';
import CompletedOrders from '../../screens/seller/CompletedOrders';
import CancelledOrders from '../../screens/seller/CancelledOrders';
import SettingsHome from '../../screens/seller/SettingsHome';
import ProfileViewS from '../../screens/seller/ProfileViewS';
import UpdateProfileS from '../../screens/seller/UpdateProfileS';

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
  <Stack.Navigator initialRouteName='SettingsHome'>
  <Stack.Screen name="SettingsHome" component={SettingsHome} options={{
        title : 'Settings',
        headerStyle :{backgroundColor : colors.primary},
        headerTitleStyle : {color : 'white',fontSize : 24,fontWeight : 'bold'},
        headerTitleAlign : 'left',
        headerTintColor: 'white',}}/>
     <Stack.Screen name="ProfileViewS" component={ProfileViewS} options={{
        title : 'Store Profile',
        headerStyle :{backgroundColor : colors.primary},
        headerTitleStyle : {color : 'white',fontSize : 24,fontWeight : 'bold'},
        headerTitleAlign : 'left',
        headerTintColor: 'white',}}/>
         <Stack.Screen name="UpdateProfileS" component={UpdateProfileS} options={{
        title : 'Update Profile',
        headerStyle :{backgroundColor : colors.primary},
        headerTitleStyle : {color : 'white',fontSize : 24,fontWeight : 'bold'},
        headerTitleAlign : 'left',
        headerTintColor: 'white',}}/>
   
   
  {/* <Stack.Screen name="AddProduct" component={AddProduct} options={{
        title : 'Profile',
        headerStyle :{backgroundColor : colors.primary},
        headerTitleStyle : {color : 'white'},
        headerTitleAlign : 'left',
        headerTintColor: 'white',}}/>
        <Stack.Screen name="EditProduct" component={EditProduct} options={{
        title : 'Edit Profile',
        headerStyle :{backgroundColor : colors.primary},
        headerTitleStyle : {color : 'white'},
        headerTitleAlign : 'left',
        headerTintColor: 'white',}}/> */}

  
    

 </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})