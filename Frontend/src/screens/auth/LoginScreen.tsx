import { View, Text, Image } from 'react-native'
import React from 'react'
import { Button, Container, Flex, Spacer, Box, VStack, Center, HStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = ({navigation}:any) => {
   
  return (
    <Box flex="1" safeAreaTop>
      <VStack space={4} w="100%" px="10">

     
      <Image source={require('../../../assets/Logo.png')} style={{width:300, height:300, alignSelf:"center"}} />
      <Text style={{fontSize:30, alignSelf:"center", fontWeight:"bold"}}>Login as</Text>
      <Spacer/>
      <HStack space={16} w="100%" alignItems="center" justifyContent="center">
      <Button onPress={(e)=> {
        e.preventDefault()
        navigation.navigate("LoginStudent")

      }} bg={'blue.400'} size="lg"
      minW={150}
      maxW={150}>
        
        Student
      </Button>
    
      <Button onPress={(e)=> {
        e.preventDefault()
        navigation.navigate("LoginTeacher")

      }}
      bg={'blue.600'}
      size="lg"
      maxW={150}
      minW={150}
      >
  Teacher
      </Button>


      </HStack>
      </VStack>
    </Box>
  )
}

export default LoginScreen