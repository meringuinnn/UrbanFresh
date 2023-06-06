import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { colors } from '../utils/constants'

const Header2 = ({name}) => {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.smallText}>Welcome,</Text>
      <Text style={styles.name}>{name}</Text>
    </SafeAreaView>
  )
}

export default Header2

const styles = StyleSheet.create({
    header : {
        height : 60,
        width : '100%',
        backgroundColor : colors.primary,
        
        alignItems : 'flex-start',
        justifyContent : 'center',
        paddingVertical : 10,
        paddingHorizontal : 20
    },
    smallText: {
        fontSize : 12,
        lineHeight : 12,
        color : 'white',
    },
    name : {
        color : 'white',
        fontSize : 25,
        fontWeight : 'bold',
    }
})