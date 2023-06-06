import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
import { colors } from '../utils/constants'

const Input = (props) => {
  return (
    <View>
      <TextInput {...props} style={[styles.input,{height : props.height ?  props.height : 42}]} />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    input : {
        borderWidth : 2,
        borderStyle : 'solid',
        borderColor : colors.primary,
        outlineStyle : 'none',
        width : 294,
        borderRadius : 10,
        backgroundColor : 'transparent',
        paddingHorizontal :20,
        marginVertical : 10
    }

})