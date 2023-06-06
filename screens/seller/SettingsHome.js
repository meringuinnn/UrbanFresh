import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity, Touchable, ScrollView,Platform,StatusBar,useWindowDimensions,Image,Linking} from 'react-native'
import React,{useState,useEffect} from 'react'
import { colors } from '../../utils/constants'
import useStore from '../../utils/appStore'
import Header from '../../components/Header'
import Icon from 'react-native-vector-icons/AntDesign';
import { useToast } from 'react-native-toast-notifications'

const SettingsHome = ({navigation}) => {
    const user = useStore((state)=>state.user)
    const toast = useToast()

    const handleLogout=()=>{
        navigation.navigate('Login')
        toast.show('Successfully Logout!!',{
            type: "success",
            placement: "bottom",
            duration: 2000,
            offset: 30,
            animationType: "slide-in",
          })    

    }

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.linkBox} onPress={()=>navigation.navigate('ProfileViewS')}>
            <Text style={styles.linkText}>Shop Profile</Text>
            <Icon name="right" size={20} color={colors.headerText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkBox} onPress={ ()=>{ Linking.openURL('https://www.traff.co/37e7mTd0')}}>
            <Text style={styles.linkText}>Terms & Conditions</Text>
            <Icon name="right" size={20} color={colors.headerText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkBox} onPress={handleLogout}>
            <Text style={styles.linkText}>Logout</Text>
            <Icon name="right" size={20} color={colors.headerText} />
        </TouchableOpacity>
       

  </SafeAreaView>
  )
}

export default SettingsHome

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white',
        // paddingTop: Platform.OS === 'android' ? 25 : 0

    },
    linkText : {
        fontSize : 16,
        color : colors.headerText,
        lineHeight : 24

    },
    linkBox :{
        width : '100%',
        height : 50,
        paddingLeft : 20,
        paddingRight : 20,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        borderBottomColor : '#D6D6D6',
        borderBottomWidth :1,
    
    }
    
})