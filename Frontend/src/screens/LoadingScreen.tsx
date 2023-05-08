import { View, Text } from 'native-base'
import React from 'react'


const LoadingScreen = () => {
  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center", }} >
      <Text>Loading...</Text>
    </View>
  )
}

export default LoadingScreen