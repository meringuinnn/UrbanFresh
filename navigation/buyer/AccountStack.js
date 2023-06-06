import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../../screens/buyer/Profile';
import ProfileView from '../../screens/buyer/ProfileView';
import { colors } from '../../utils/constants';
import UpdateProfile from '../../screens/buyer/UpdateProfile';

const Stack = createNativeStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator initialRouteName='Profile'>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown : false}}/>
        <Stack.Screen name="ProfileView" component={ProfileView} options={{
        title : 'Profile',
        headerStyle :{backgroundColor : colors.primary},
        headerTitleStyle : {color : 'white'},
        headerTitleAlign : 'left',
        headerTintColor: 'white',}}/>
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{
        title : 'Update Profile',
        headerStyle :{backgroundColor : colors.primary},
        headerTitleStyle : {color : 'white'},
        headerTitleAlign : 'left',
        headerTintColor: 'white',}}/>
   </Stack.Navigator>
  )
}

export default AccountStack

const styles = StyleSheet.create({})