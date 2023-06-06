import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = ({text,color,width,textColor,onPress,disabled=false}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.button,{width : width ? width : 170,backgroundColor :color ? color : 'white'}]}>
      <Text style={[styles.btnText,{color : textColor ? textColor : 'black'}]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    button : {
        // marginVertical : 10,
        height : 50,
        borderRadius : 30,
        display : 'flex',
        alignItems: 'center',
        justifyContent : 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        // padding : 20,
        zIndex : 1000
    },
    btnText : {
        fontWeight : 'bold'
    }
})