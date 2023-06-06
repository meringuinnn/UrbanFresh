import { StyleSheet, Text, View,SafeAreaView, StatusBar, ImageBackground } from 'react-native'
import {useWindowDimensions} from 'react-native';
import React from 'react'
// import logoNeon from '../assets/images/logo-neon-green.png'
import PanelCard from '../components/PanelCard';
import buyer from '../assets/images/buyer.jpg'
import seller from '../assets/images/seller.jpg'

const RegisterPanel = ({navigation}) => {
    const {height, width} = useWindowDimensions();

  return (
    <><StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
    <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
      <Text style={styles.heading}>Register new account as</Text>
      <View style={styles.container}>
        {/* need some fixing css ugly */}
        <PanelCard title='Buyer' image={buyer} link='BuyerRegistration' text='Buyers have the choice to browse, buy retail or wholesale goods, and select the safe payment option that works best for them.' />
        <PanelCard title='Seller' image={seller} link='SellerRegistration' text='Sellers can choose to sell retail or wholesale of fruits or vegetables and provide their buyers what they need.' />

      </View>
      {/* <ImageBackground source={logoNeon} resizeMode='contain' style={styles.image}></ImageBackground> */}
      {/* <Image
      source={logoNeon}
      resizeMode = 'contain'
      style={styles.image}
      /> */}



    </SafeAreaView></>
  )
}

export default RegisterPanel

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 65,
    paddingRight: 65,
  },
  heading: {
    // flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#3E3627',
    textAlign: 'center',
    marginTop: 150,
    marginBottom: 10,
  },
    // container: {
    //     overflow : 'hidden',
    //     flex: 1,
    //     position : 'relative',
    //     alignItems: 'center',
    //     justifyContent: 'flex-start',
    //     backgroundColor : "white"
    //   },
    //  image : {
    //   height : 350,
    //   width : 350,
    //   zIndex : 1000,
    //   opacity: 0.4,
    //   position : 'absolute',
    //   bottom : -60,
    //   right : -65
    //  },
    //  panelBox :{
    //     paddingHorizontal : 30,
    //     alignItems : 'center',
    //     justifyContent : 'center',

    //  },
    //  heading:{
    //     textAlign: 'center',
    //     width : '100%',
    //     fontStyle: 'normal',
    //     fontWeight: 'bold',
    //     fontSize: 25,
    //    lineHeight: 30,
    //    color : '#3E3627',
    //    marginBottom : 10
    //  },
})