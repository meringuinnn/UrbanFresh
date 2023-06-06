import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View,useWindowDimensions } from 'react-native'
import React, {useState,useLayoutEffect} from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import { colors } from '../utils/constants';
import Icon2 from 'react-native-vector-icons/Entypo';
import useStore from './../utils/appStore';


const SellerCard = ({image,name,block,barangay,province,city,onPress}) => {
    const {width} = useWindowDimensions();
    const [store,setStore] = useState({});
  return (
    // <TouchableOpacity onPress={onPress} style={[styles.card,{ width : width -20, padding: 45, color : '#fff'}]}>
    //     {/* change padding if it looks weird */}
        
    //     <View style={styles.cardBody}>
    //       <Image 
    //         source={{ uri: image.toString()
    //         }}
    //         style={styles.cardImg}
    //         resizeMode='cover'  
    //       />
    //       <Text style={styles.sellerName}>{name}</Text>
    //     </View>
    // </TouchableOpacity>
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.cardBody}>
            <Image 
            source={{ uri: image.toString()
            }}
            style={styles.cardImg}
            resizeMode='cover'  
          />
          <View style={styles.sellerInfo}>
            <Text style={styles.sellerName}>{name}</Text>
            <View style={styles.sellerLoc}>
              <Icon2 name="location" size={10} color="#21C622" style={{marginRight : 5}} />
              <Text style={styles.locationText}>
                      {block} {barangay} {province} {city}
              </Text>  
            </View>
          </View>
      </View>
    </TouchableOpacity>

  )
}

export default SellerCard

const styles = StyleSheet.create({
    card: {
      // height: 70,
      flex: 1,
      backgroundColor: 'white',
      marginHorizontal: 20,
      marginVertical: 10,
      borderRadius: 10,
      padding: 10,
      // flexWrap: 'wrap',
      // justifyContent : 'center',
      
    },
    cardBody: {
      flex: 1,
      flexDirection :'row',
      alignItems : 'center',
      justifyContent : 'flex-start',
      flexWrap: 'wrap',
    },
    // card : {
    //     height : 70,
    //     // flexDirection :'row',
    //     // alignItems : 'center',
    //     // justifyContent : 'center',
    //     marginVertical : 0,
    //     marginHorizontal : 'auto',
    //     gap: 15,
    //     paddingHorizontal:10,
    // },
    cardImg : {
        height : 70,
        width : 70,
        marginRight: 15,
        marginLeft: 5,
        borderRadius : 8,
    },
    sellerInfo: {
      flex: 1,
    },
    sellerName : {
        fontSize : 16,
        lineHeight : 30,
        fontWeight : 'bold',
        color : colors.headerText,
        textTransform : 'uppercase'
    },
    sellerLoc: {
      flex: 1,
      flexDirection :'row',
      alignItems : 'center',
    },
    locationText: {
      flex: 1,
      fontSize: 10,
      flexWrap: 'wrap',
    }
    // cardBody : {
    //     flex :1,
    //     flexDirection :'row',
    //     alignItems : 'center',
    //     justifyContent : 'center',
    //     height : 70,
    //     paddingLeft: 15,
    //     backgroundColor: "white",
    //     justifyContent : 'flex-start'
       
    // },
    // address: {
    //     flexDirection : 'row',
    //     alignItems: 'center',
    //     justifyContent : 'flex-start',
    //     gap : 10
    // },
    // addText : {
    //     textAlign :'left',
    //     color : colors.headerText,
    //     fontSize : 12,
    //     lineHeight : 12
    // },
    // sellerName : {
    //     fontSize : 18,
    //     lineHeight : 50,
    //     fontWeight : 'bold',
    //     color : colors.headerText,
    //     textTransform : 'uppercase'
    // }


})