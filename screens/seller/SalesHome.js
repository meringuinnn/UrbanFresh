import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity, Touchable, ScrollView,Platform,StatusBar,useWindowDimensions,Image} from 'react-native'
import React,{useState,useEffect} from 'react'
import { colors } from '../../utils/constants'
import useStore from '../../utils/appStore'
import Header from '../../components/Header'
import Icon from 'react-native-vector-icons/AntDesign';

const SalesHome = ({navigation}) => {
    const user = useStore((state)=>state.user)

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.linkBox} onPress={()=>navigation.navigate('UnpaidOrders')}>
            <Text style={styles.linkText}>Unpaid</Text>
            <Icon name="right" size={20} color={colors.headerText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkBox} onPress={()=>navigation.navigate('ShippingOrders')}>
            <Text style={styles.linkText}>Shipping</Text>
            <Icon name="right" size={20} color={colors.headerText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkBox} onPress={()=>navigation.navigate('CompletedOrders')}>
            <Text style={styles.linkText}>Completed</Text>
            <Icon name="right" size={20} color={colors.headerText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkBox} onPress={()=>navigation.navigate('CancelledOrders')}>
            <Text style={styles.linkText}>Cancellation/Refund</Text>
            <Icon name="right" size={20} color={colors.headerText} />
        </TouchableOpacity>

  </SafeAreaView>
  )
}

export default SalesHome

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