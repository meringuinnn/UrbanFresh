import { Image, StyleSheet, Text, TouchableOpacity, View,useWindowDimensions } from 'react-native'
import React from 'react'
import fallback from '../assets/images/fallback.png'
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../utils/constants';

const ReviewCard = ({user,date}) => {
    const {width} = useWindowDimensions()
  return (
    <View  style={[styles.card,{width : width * .95}]}>
        <Image 
            source={fallback}
            resizeMode='cover'
            style={{
                height : 50,
                width : 50
            }}
        />
        <View style={styles.info}>
                <Text style={styles.name}>User</Text>
        </View>
        <View style={styles.heart}>
        <View style={styles.rating}>
                <Icon name="star" size={20} color="#FAFF00" />
                <Icon name="star" size={20} color="#FAFF00" />
                <Icon name="star" size={20} color="#FAFF00" />
                <Icon name="star" size={20} color="#FAFF00" />
                <Icon name="star" size={20} color="#FAFF00" />

            </View>
            <Text style={styles.date}>11/19/2023</Text>
        </View>
    </View>
  )
}

export default ReviewCard

const styles = StyleSheet.create({
    card : {
        height : 90,
        
        padding: 15,
        flexDirection : 'row',
        alignItems : 'center',
        gap : 10,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4,
        
    },
    info : {
        flex : 1,
        justifyContent : 'flex-start',
        height : 50,
    },
    name : {
        color : colors.headerText,
        fontSize : 14,
        lineHeight : 20,
        fontWeight : 'bold',
    },
    desc : {
        color : 'black',
        fontSize : 14,
        lineHeight : 14,
       
    },
    price : {
        color : 'black',
        fontSize : 14,
        lineHeight : 20,
    },
    heart : {
        
        height : 90,
        width : 80,
        alignItems : 'flex-end',
        justifyContent : 'center',
    },
    add : {
        backgroundColor : colors.primary,
        width : 60,
        height : 25,
        borderRadius :20,
        alignItems : 'center',
        justifyContent : 'center',
    },
    date:{
        fontSize : 12,
        lineHeight : 30,
        color : colors.headerText
    },
    rating : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        gap : 5
    }
})