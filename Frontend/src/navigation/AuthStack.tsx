import React from 'react'
import { View, Text } from 'native-base'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/auth/LoginScreen'
import LoginTeacher from '../screens/auth/LoginTeacher'
import LoginStudent from '../screens/auth/LoginStudent'
import LoginStudentCode from '../screens/auth/LoginStudentCode'
import LoginTeacherCode from '../screens/auth/LoginTeacherCode'
const AuthStack = createNativeStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} options={{
        headerShown: false
      }} />
      <AuthStack.Screen name="LoginTeacher" options={{title:"Login as Teacher"}} component={LoginTeacher} />
      <AuthStack.Screen name="LoginStudent" options={{title:"Login as Student"}} component={LoginStudent} />
      <AuthStack.Screen name="LoginStudentCode" options={{title:"Verification code"}} component={LoginStudentCode} />
      <AuthStack.Screen name="LoginTeacherCode" options={{title:"Verification code"}} component={LoginTeacherCode} />
    </AuthStack.Navigator>
  )
}

export default Auth