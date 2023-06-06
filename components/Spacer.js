import {View } from 'react-native'
import React from 'react'

const Spacer = ({height,width}) => {
  return (
    <View style={{height : height ? height : 5,width : width ? width : '100%'}}>
      
    </View>
  )
}

export default Spacer

