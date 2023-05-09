import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Auth from './AuthStack'
import App from './AppStack'
import LoadingScreen from '../screens/LoadingScreen'
import AuthProvider from '../providers/AuthProvider'
import { useAuth } from '../providers/AuthProvider'
import { Text } from 'react-native'
import * as SecureStore from 'expo-secure-store';
const Navigation = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const {state} = useAuth();
  const [user, setUser] = React.useState(null);
useEffect(() => {
  SecureStore.getItemAsync('isAuthenticated').then((value) => {
    if(value == null){
      state.isAuthenticated = false;
      setIsLoading(false);
    }else{
      state.isAuthenticated = JSON.parse(value);
      SecureStore.getItemAsync('role').then((value) => {
        if(value == null){
          state.role = '';
        }else{
          state.role = JSON.parse(value);
        }
      })
      SecureStore.getItemAsync('user').then((value) => {
        if(value == null){
          state.user = null;
        }else{
          state.user = JSON.parse(value);
          setIsLoading(false);
          setUser(state.user);
        }
      })
    }
  })
 
  console.log(state)
}, [state])

  return (
    <NavigationContainer>
   
        {isLoading == true ? <LoadingScreen /> :
        state.isAuthenticated == true ? <App /> : <Auth />
        
      }
    </NavigationContainer>
  )
    
}

export default Navigation