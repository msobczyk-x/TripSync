import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { Button, Input } from 'native-base'
import { AuthContext, useAuth } from '../../providers/AuthProvider'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
const LoginStudent = ({navigation}:any) => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const handleLogin = () => {
    axios.post('http://10.0.2.2:5000/api/loginStudentEmail', {
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
    <View>
      <Text>LoginStudent</Text>
      <Input placeholder="Email" onChangeText={setEmail} value={email} />
      <Button onPress={() => {
            handleLogin()
      }} >
        <Text>LoginStudent</Text>
        </Button>
        {
          error ? <Text>{error}</Text> : null
        }
     
    </View>
  )
}

export default LoginStudent