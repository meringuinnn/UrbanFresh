import { StyleSheet, Text, TouchableOpacity, View,ImageBackground,useWindowDimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const PanelCard = ({title,image,text,link}) => {
    const {width} = useWindowDimensions()
    const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={()=> navigation.navigate(link)}>
        <ImageBackground style={styles.imgBg}
            source ={image}
            resizeMode='cover'>
            <Text style={styles.title}>{title}</Text>
        </ImageBackground>
      <Text style={styles.infoText} >{text}</Text>
    </TouchableOpacity>
  )
}

export default PanelCard

const styles = StyleSheet.create({
    imgBg : {
        borderRadius : 10,
        height : 95,
        alignItems : 'center',
        justifyContent : 'center',
        marginTop: 30,
        overflow: 'hidden',
    },
    title: {
        fontSize: 29,
        fontWeight: 'bold', 
        color: '#fff',
        letterSpacing: 0.05,
      },
    infoText: {
    color: '#21C622',
    // fontSize: 11,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    // marginRight: 50,
  }



//     btnCard:{
       
//         borderRadius : 10,
//         height : 160,
//         marginVertical : 18,
//         overflow : 'hidden',
//         gap:10,
//         shadowColor: "#000",
// shadowOffset: {
// 	width: 0,
// 	height: 1,
// },
// shadowOpacity: 0.18,
// shadowRadius: 1.00,

// elevation: 1,
//     },
//     title : {
//         fontWeight: 'bold',
//         fontSize: 29,
//         lineHeight: 35,
//         /* identical to box height, or 146% */
//         color : 'white',
//         textAlign: 'center',
//         letterSpacing: 0.05,
//     },
//     imgBg : {
//         borderRadius : 10,
//         height : 95,
//         alignItems : 'center',
//         justifyContent : 'center',
//     },
//     infoText: {
//         width : '100%',
//         paddingHorizontal:10,
//         paddingVertical: 8, 
//         color : '#21C622',
//         fontStyle: 'normal',
//         fontWeight: 'bold',
//         fontSize: 12,
//         lineHeight: 13,
//         textAlign: 'justify',
//         textWrap: 'wrap',
//     }
})