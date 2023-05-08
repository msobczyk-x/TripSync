import { View, Text } from 'react-native'
import React from 'react'
import { Button, Flex, Spacer } from 'native-base'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = ({navigation}:any) => {
   
  return (
    <View style={{flex: 1, justifyContent:"center", alignItems: "center", gap: 50}}>
      <Text>LoginScreen</Text>
      <Flex flexDirection="row" >

    
      <Button onPress={(e)=> {
        e.preventDefault()
        navigation.navigate("LoginTeacher")

      }}>
        <Text>Go to Register as Teacher</Text>
      </Button>
      <Spacer/>
      <Button onPress={(e)=> {
        e.preventDefault()
        navigation.navigate("LoginStudent")

      }}>
        <Text>Go to Register as Student</Text>
      </Button>
      </Flex>
    </View>
  )
}

export default LoginScreen