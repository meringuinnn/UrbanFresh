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

const Stack = createNativeStackNavigator();

export default function SalesStack() {
  return (
  <Stack.Navigator initialRouteName='SalesHome'>
  <Stack.Screen name="SalesHome" component={SalesHome} options={{
        title : 'Sales',
        headerStyle :{backgroundColor : colors.primary},
        headerTitleStyle : {color : 'white',fontSize : 24,fontWeight : 'bold'},
        headerTitleAlign : 'left',
        headerTintColor: 'white',}}/>
   <Stack.Screen name="UnpaidOrders" component={UnpaidOrders} options={{
        title : 'Unpaid Orders',
        headerStyle :{backgroundColor : colors.primary},
        headerTitleStyle : {color : 'white',fontSize : 24,fontWeight : 'bold'},
        headerTitleAlign : 'left',
        headerTintColor: 'white',}}/>
     <Stack.Screen name="ShippingOrders" component={ShippingOrders} options={{
        title : 'To Ship Orders',
        headerStyle :{backgroundColor : colors.primary},
        headerTitleStyle : {color : 'white',fontSize : 24,fontWeight : 'bold'},
        headerTitleAlign : 'left',
        headerTintColor: 'white',}}/>
    <Stack.Screen name="CompletedOrders" component={CompletedOrders} options={{
        title : 'Completed Orders',
        headerStyle :{backgroundColor : colors.primary},
        headerTitleStyle : {color : 'white',fontSize : 24,fontWeight : 'bold'},
        headerTitleAlign : 'left',
        headerTintColor: 'white',}}/>
    <Stack.Screen name="CancelledOrders" component={CancelledOrders} options={{
        title : 'Cancelled Orders',
        headerStyle :{backgroundColor : colors.primary},
        headerTitleStyle : {color : 'white',fontSize : 24,fontWeight : 'bold'},
        headerTitleAlign : 'left',
        headerTintColor: 'white',}}/>
    <Stack.Screen name="OrderDetails" component={OrderDetails} options={{
        title : 'Order Details',
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