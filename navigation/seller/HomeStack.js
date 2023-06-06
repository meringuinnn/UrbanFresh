import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BuyerHome from '../../screens/buyer/BuyerHome';
import SellerList from '../../screens/buyer/SellerList';
import SellerProfile from '../../screens/buyer/SellerProfile';
import ProductDetail from '../../screens/buyer/ProductDetail';
import Cart from '../../screens/buyer/Cart';
import Favorites from '../../screens/buyer/Favorites';
import SellerHome from '../../screens/seller/SellerHome';
import AddProduct from '../../screens/seller/AddProduct';
import { colors } from '../../utils/constants';
import EditProduct from '../../screens/seller/EditProduct';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
  <Stack.Navigator initialRouteName='SellerHome'>
  <Stack.Screen name="SellerHome" component={SellerHome} options={{headerShown : false}}/>
  <Stack.Screen name="AddProduct" component={AddProduct} options={{
        title : 'Add Product',
        headerStyle :{backgroundColor : colors.primary},
        headerTitleStyle : {color : 'white'},
        headerTitleAlign : 'left',
        headerTintColor: 'white',}}/>
        <Stack.Screen name="EditProduct" component={EditProduct} options={{
        title : 'Edit Profile',
        headerStyle :{backgroundColor : colors.primary},
        headerTitleStyle : {color : 'white'},
        headerTitleAlign : 'left',
        headerTintColor: 'white',}}/>

  
    

 </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})