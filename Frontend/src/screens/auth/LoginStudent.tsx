import { View } from 'react-native'
import React, {useState} from 'react'
import { Button, Input, Box, VStack, Text } from 'native-base'
import { AuthContext, useAuth } from '../../providers/AuthProvider'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
const LoginStudent = ({navigation}:any) => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const handleLogin = () => {
    axios.post('http://192.168.1.24:3000/api/loginStudentEmail', {
      email: email.trim()
  }).then((response) => {
      if (response.status == 400) {
        setError(response.data);
      }
    else if (response.status == 200) {
      console.log(response.data);
      SecureStore.setItemAsync('userCode',response.data);
      SecureStore.setItemAsync('userEmail', email);
      navigation.navigate('LoginStudentCode')
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
      <Input placeholder="Email" onChangeText={setEmail} value={email} size={"xl"} variant={"underlined"} />
      <Button onPress={() => {
            handleLogin()
      }} >
        Next
        </Button>
        {
          error ? <Text>{error}</Text> : null
        }
    </VStack>
    </Box>
  )
}

export default LoginStudent