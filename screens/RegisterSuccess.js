import { SafeAreaView, StyleSheet, Text, View,ImageBackground} from 'react-native'
import React from 'react'
import logoNeon from '../assets/images/logo-neon-green.png'
import Button from '../components/Button'


const RegisterSuccess = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.box}>
            <Text style={styles.success}>
                Successful!
            </Text>
            <Text style={styles.mainText}>
            Account created. Please verify your e-mail first and login again.
            </Text>
            
        </View>
        <Button onPress={()=>navigation.navigate('Login')} text="Back to Log In page" color="#21C622" textColor="white" width={210}/>
        <ImageBackground source={logoNeon} resizeMode='contain' style={styles.image}></ImageBackground>
        {/* <Image
        source={logoNeon}
        resizeMode = 'contain'
        style={styles.image}
        /> */}
     
    </SafeAreaView>
  )
}

export default RegisterSuccess

const styles = StyleSheet.create({
    container : {
        overflow : 'hidden',
        flex: 1,
        position : 'relative',
        alignItems: 'center',
        backgroundColor : 'white',
        justifyContent: 'flex-start',
        width : "100%",
        paddingHorizontal : 30,
        border : '1px solid black'
    },
    image : {
        height : 350,
        width : 350,
        opacity: 0.6,
        position : 'absolute',
        bottom : -70,
        right : -65
       },
    box: {
        alignItems : 'center',
        justifyContent : 'center',
        width : 260,
        marginTop : 200
    },
    success : {
        fontWeight : 'bold',
        fontSize : 40,
        color : '#21C622',
        marginBottom : 150
    },
    mainText : {
        fontWeight : 'bold',
        fontSize : 16,
        lineHeight : 20,
        textAlign : 'center',
        color : '#3E3627',
        marginBottom : 5
    }
})