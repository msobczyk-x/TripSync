import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Auth from './AuthStack'
import App from './AppStack'
import LoadingScreen from '../screens/LoadingScreen'
import AuthProvider from '../providers/AuthProvider'
import { useAuth } from '../providers/AuthProvider'
import { Text } from 'react-native'
const Navigation = () => {
  const {state} = useAuth();
useEffect(() => {
  console.log(state)
}, [state])

  return (
    <NavigationContainer>
   

        {state.isAuthenticated == false && <Auth />}
        {state.isAuthenticated == true && <App />}
        {state.isAuthenticated == null && <LoadingScreen />}
    </NavigationContainer>
  )
    
}

export default Navigation