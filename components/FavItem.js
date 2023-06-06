import { StyleSheet, Text, View,useWindowDimensions,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import fallback from '../assets/images/fallback.png'
import Icon from 'react-native-vector-icons/AntDesign'
import { colors } from '../utils/constants'
import useStore from '../utils/appStore'


const FavItem = ({isDeleting,store,storeid,fav_items,getFaves}) => {
    console.log(storeid)
  return (
    <View style={styles.card}>
      <View style={styles.header}>
            <Text>{store}</Text>
            <View style={styles.line}></View>
      </View>
      <View style={styles.contentContainer}>
        {
            fav_items.map((fv,i)=>(
                <FavProduct key={i} storeid={storeid} {...fv} isDeleting={isDeleting} getFaves={getFaves} />
            ))
        }
      
       
      </View>
    </View>
  )
}



const FavProduct = ({isDeleting,desc,name,pic,price,getFaves,storeid}) =>{
    const {width} = useWindowDimensions()
    const favorites = useStore((state)=>state.favorites)
    
    const handleDelete= async (storeid)=>{
         console.log("Deleted")
    }

    return (
        <View style={[styles.card2,{width : width * .95}]}>
        <Image 
            source={{uri:pic[0]} || fallback}
            resizeMode='cover'
            style={{
                height : 70,
                width : 70,
                borderRadius: 10,
            }}
        />
        <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.desc}>{desc}</Text>
                <Text style={styles.price}>₱{price}</Text>
        </View>
        <View style={styles.heart}>
            {
                isDeleting ? <TouchableOpacity onPress={()=>handleDelete(storeid)}><Icon name="delete" size={20} color="#FF0000" /></TouchableOpacity> : null
               
            }
        </View>
    </View>
    )
}

export default FavItem

const styles = StyleSheet.create({
    card :{
        width : '100%',
        paddingHorizontal :20,
       
    },
    card2 : {
        height : 120,
        padding: 15,
        flexDirection : 'row',
        alignItems : 'center',
        gap : 10
        
    },
    header : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-start',
        gap :20
    },
    line : {
        flex :1,
        borderBottomStyle : 'solid',
        borderBottomWidth : .5,
        borderBottomColor : 'black'
    },
    info : {
        flex : 1,
        marginLeft: 5
    },
    name : {
        color : colors.headerText,
        fontSize : 18,
        lineHeight : 20,
        fontWeight : 'bold',
        paddingBottom: 10
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
        justifyContent : 'space-evenly',
    },
   actions : {
    backgroundColor : '#E5E5E5',
    borderRadius : 5,
    width : 80,
    height : 30,
    flexDirection : 'row',
    alignItems :'center',
    justifyContent : 'space-evenly',
    gap:5

   },
   num :{
    fontSize : 20,
    fontWeight : 'bold',
   },
   contentContainer : {
    alignItems : 'center',
    gap : 10
  }
})