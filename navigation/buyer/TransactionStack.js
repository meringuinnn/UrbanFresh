import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransactionHome from '../../screens/buyer/TransactionHome';
import Cart from '../../screens/buyer/Cart';
import Favorites from '../../screens/buyer/Favorites';
import { colors } from '../../utils/constants';
import OrderDetailsB from '../../screens/buyer/OrderDetailsB';

const Stack = createNativeStackNavigator();
const TransactionStack = () => {
  return (
    <Stack.Navigator initialRouteName='TransactionHome'>
    <Stack.Screen name="TransactionHome" component={TransactionHome} options={{headerShown : false}}/>
    <Stack.Screen name="Cart" component={Cart} options={{headerShown : false}}/>  
   <Stack.Screen name="Favorites" component={Favorites} options={{headerShown : false}}/>  
   <Stack.Screen name="OrderDetails" component={OrderDetailsB} options={{
        title : 'Order Details',
        headerStyle :{backgroundColor : colors.primary},
        headerTitleStyle : {color : 'white',fontSize : 24,fontWeight : 'bold'},
        headerTitleAlign : 'left',
        headerTintColor: 'white',}}/>
   
    

 </Stack.Navigator>
  )
}

export default TransactionStack

const styles = StyleSheet.create({
  container : {
    flex :1,
    backgroundColor : 'white'
  },
  cartBox : {
    height :70,
    width : '100%',
    flexDirection : 'row',
   
    alignItems : 'center'
    
},
title : {
  textAlign : 'center',
    flex  :1,
    fontSize : 24,
    fontWeight:'bold',
    color : colors.primary,
    lineHeight : 20

},
})