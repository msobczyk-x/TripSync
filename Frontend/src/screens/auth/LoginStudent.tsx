import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'native-base'
import { AuthContext, useAuth } from '../../providers/AuthProvider'

const LoginStudent = () => {
    const {login} = useAuth()

  return (
    <View>
      <Text>LoginStudent</Text>
      <Button onPress={() => {
            login({role: "student"})
      }} >
        <Text>LoginStudent</Text>
        </Button>
    </View>
  )
}

export default LoginStudent