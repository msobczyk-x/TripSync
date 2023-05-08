import React from 'react'
import { View, Text } from 'native-base'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/auth/LoginScreen'
import LoginTeacher from '../screens/auth/LoginTeacher'
import LoginStudent from '../screens/auth/LoginStudent'
const AuthStack = createNativeStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="LoginTeacher" component={LoginTeacher} />
      <AuthStack.Screen name="LoginStudent" component={LoginStudent} />
    </AuthStack.Navigator>
  )
}

export default Auth