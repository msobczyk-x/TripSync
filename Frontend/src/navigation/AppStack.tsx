import React from 'react'
import { View, Text, Button } from 'native-base'
import { useAuth } from '../providers/AuthProvider'
const App = () => {
  const {state,logout} = useAuth()

  return (
    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
      <Text>Logged in as {state.role}</Text>
      <Button onPress={() => {
        logout()
      }}>
        <Text>Logout</Text>

       
      </Button>
      <Text>
          {state.user.first_name}
          </Text>
          <Text>{state.user.email}</Text>
          <Text>{state.role}</Text>
          <Text>{state.user._id}</Text>
       
    </View>
  )
}

export default App