
import { View, Text } from 'react-native'
import {Button, Input} from 'native-base'
import React from 'react'
import { AuthContext, useAuth } from '../../providers/AuthProvider'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
const LoginTeacher = ({navigation}:any) => {
  const [error, setError] = React.useState('');
  const [email, setEmail] = React.useState('');
  const handleLogin = () => {
    axios.post('http://10.0.2.2:5000/api/loginTeacherEmail', {
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
    <View>
      <Text>LoginTeacher</Text>
      <Input placeholder="Email" onChangeText={setEmail} value={email} />
      <Button onPress={() => {
            handleLogin()
      }} >
        <Text>Login Teacher</Text>
        </Button>
        {
          error ? <Text>{error}</Text> : null
        }
    </View>
  )
}

export default LoginTeacher