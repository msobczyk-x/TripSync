
import { View, Text } from 'react-native'
import {Button} from 'native-base'
import React from 'react'
import { AuthContext, useAuth } from '../../providers/AuthProvider'
const LoginTeacher = () => {
    const {login} = useAuth()
  return (
    <View>
      <Text>LoginTeacher</Text>
      <Button onPress={() => {
            login({role: "teacher"})
      }} >
        <Text>Login Teacher</Text>
        </Button>
    </View>
  )
}

export default LoginTeacher