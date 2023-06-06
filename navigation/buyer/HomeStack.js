import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BuyerHome from '../../screens/buyer/BuyerHome';
import SellerList from '../../screens/buyer/SellerList';
import SellerProfile from '../../screens/buyer/SellerProfile';
import ProductDetail from '../../screens/buyer/ProductDetail';
import Cart from '../../screens/buyer/Cart';
import Favorites from '../../screens/buyer/Favorites';
import OrderConfirm from '../../screens/buyer/OrderConfirm';
import AddRating from '../../screens/buyer/AddRating';
import { colors } from '../../utils/constants';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
  <Stack.Navigator initialRouteName='BuyerHome'>
  <Stack.Screen name="BuyerHome" component={BuyerHome} options={{headerShown : false}}/>
   <Stack.Screen name="SellerList" component={SellerList} options={{headerShown : false}}/>    
   <Stack.Screen name="SellerProfile" component={SellerProfile} options={{headerShown : false}}/>  
   <Stack.Screen name="ProductDetail" component={ProductDetail} options={{headerShown : false}}/>  
   <Stack.Screen name="Cart" component={Cart} options={{headerShown : false}}/>  
   <Stack.Screen name="Favorites" component={Favorites} options={{headerShown : false}}/>  
   <Stack.Screen name="OrderConfirm" component={OrderConfirm} options={{headerShown : false}}/>  
   <Stack.Screen name="AddRating" component={AddRating} options={{
        title : 'Add Rating',
        headerStyle :{backgroundColor : colors.primary},
        headerTitleStyle : {color : 'white',fontSize : 24,fontWeight : 'bold'},
        headerTitleAlign : 'left',
        headerTintColor: 'white',}}/>
  
    

 </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})