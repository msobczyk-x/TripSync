
import { View } from 'react-native'
import {Button, Input, Box, VStack, Text, Icon} from 'native-base'
import React from 'react'
import { AuthContext, useAuth } from '../../providers/AuthProvider'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const LoginTeacher = ({navigation}:any) => {
  const [error, setError] = React.useState('');
  const [email, setEmail] = React.useState('');
  const handleLogin = () => {
    axios.post('http://192.168.1.24:3000/api/loginTeacherEmail', {
      email: email.trim()
  }).then((response) => {
      if (response.status == 400) {
        setError(response.data);
      }
    else if (response.status == 200) {

      console.log(response.data);
      SecureStore.setItemAsync('userCode',response.data.toString());
      SecureStore.setItemAsync('userEmail', email);
      navigation.navigate('LoginTeacherCode')
    }
  }
  ).catch((error) => {
      console.log(error);
      setError(error.response.data);
  }
  );
}

    const {login} = useAuth()
  return (
    <Box flex="1" safeAreaTop>
      <VStack space={4} w="100%" px="10">
        <Text fontSize={30} >Enter your email that you use for school authentiaction</Text>
      <Input placeholder="Email" onChangeText={setEmail} value={email} size={"xl"} 
      variant={"underlined"} 
      />
      <Button onPress={() => {
            handleLogin()
      }} >
        Next
        </Button>
        {
          error ? <Text textAlign={"center"} fontWeight={600} fontSize={"2xl"}color={"danger.500"}>{error}</Text> : null
        }
    </VStack>
    </Box>
  )
  
}

export default LoginTeacher