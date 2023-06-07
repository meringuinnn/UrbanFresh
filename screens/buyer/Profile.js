import { SafeAreaView, StyleSheet, StatusBar, Text, View,Image, TouchableOpacity,Linking} from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { colors } from '../../utils/constants'
import userplaceholder from '../../assets/images/user.png'
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'
import useStore from '../../utils/appStore'
import { useToast } from 'react-native-toast-notifications'


const Profile = ({navigation}) => {
    
const toast = useToast()
    
const links = [
    {
        icon : 'user',
        name : 'Profile',
        route : 'ProfileView'
    },
    // {
    //     icon : 'setting',
    //     name : 'Settings',
    //     route : 'Settings'
    // },
    {
        icon : 'copy1',
        name : 'Terms & Conditions',
        route : ()=>{ Linking.openURL('https://www.traff.co/37e7mTd0')}
    },
    {
        icon : 'logout',
        name : 'Logout',
        route : ()=>{
            navigation.navigate('Login')
            toast.show('Successfully Logout!',{
                type: "success",
                placement: "bottom",
                duration: 2000,
                offset: 30,
                animationType: "slide-in",
              })    
    
        }
    }
]

    const user = useStore((state)=>state.user)
  return (
    <>
    {/* <StatusBar backgroundColor={"#21C622"} barStyle={'light-content'} /> */}
    <SafeAreaView style={styles.container}>
          <Header what={"Cart"} onPress={() => navigation.goBack()} />
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
                <Text style={styles.title}>User Account</Text>
                <View style={styles.imgBox}>
                    <Image
                        source={{ uri: user.pic.toString() } || userplaceholder}
                        resizeMode="cover"
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50
                        }} />
                    <View style={styles.textBox}>
                        <Text style={styles.name}>{user.fname} {user.lname}</Text>
                        <Text style={styles.address}>Complete Address: {user.block || ''} {user.barangay || ''}  {user.city || ''} {user.province || ''} {user.zipcode || ''}</Text>

                    </View>

                </View>

            </View>
            <View style={styles.linksBox}>
                {links.map((link, i) => (
                    <Link key={i} {...link} />
                ))}
            </View>  
          </View>
          

      </SafeAreaView></>
  )
}


const Link = ({icon,name,route})=>{
    const navigation = useNavigation()
    console.log(typeof route)
    return (
        <TouchableOpacity onPress={typeof route === "string" ? ()=>navigation.navigate(route) : route} style={styles.link}>
        <Icon name={icon} size={25} color={"white"} style={{marginRight :20}} />  
        <Text style={styles.linkText}>{name}</Text>       
   </TouchableOpacity>  
    )
}

export default Profile

const styles = StyleSheet.create({
    container : {
        flex :1,
        backgroundColor : 'white'
    },
    infoBox :{
        height : 220,
        // backgroundColor : colors.primary,

    },
    infoContainer: {
        flex: 1,
        backgroundColor : colors.primary,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 10,
    },
    title : {
        fontSize :28,
        fontWeight : 'bold',
        lineHeight : 15,
        color : 'white',
        width : "100%",
        textAlign : 'center',
        paddingVertical : 25,
        marginTop: 30,
        textTransform : 'uppercase',
    },
    imgBox:{
        width : '100%',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        paddingHorizontal :20
    },
    textBox : {
        flex :1,
        paddingHorizontal : 20,
        justifyContent : 'center',
        // alignItems : 'center',
        alignContent : 'center',
        height : 100,
        
    },
    name : {
        fontSize :20,
        fontWeight : 'bold',
        // padding: 5,
        // lineHeight : 15,
        color : 'white',
        width : "100%",
    },
    address :{
        fontSize : 12,
        lineHeight :12,
        color : 'white',
        paddingVertical :10
        
    },
    links : {
        marginTop : 10,
        width : '100%',
        flex : 1,
        
    },
    link :{
        
        paddingHorizontal : 20,
        paddingVertical : 10,
        width : '100%',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-start'
        
    },
    linkText :{
        fontSize : 16,
        fontWeight : 'bold',
        color : "white"
    }
})