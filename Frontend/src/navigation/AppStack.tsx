import React from 'react'
import { View, Text, Button } from 'native-base'
import { useAuth } from '../providers/AuthProvider'
const App = () => {
  const {state,logout} = useAuth()
  return (
    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
      <Text>Logged in as {state.user.role}</Text>
      <Button onPress={() => {
        logout()
      }}>
        <Text>Logout</Text>
      </Button>
    </View>
  )
}

export default App