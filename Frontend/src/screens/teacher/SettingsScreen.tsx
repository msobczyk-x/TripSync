import {Box, Button, Heading, Image, VStack} from 'native-base'
import React from 'react'
import { useAuth } from '../../providers/AuthProvider'
import { socket } from '../../utils/socket'
const SettingsScreen = () => {

  const {state,logout} = useAuth()
  return (
    <Box flex={1} bg="white" alignItems="center"  safeAreaTop>
      <Image source={require('../../../assets/Logo.png') } w={300} h={300} alt="TripSync logo"/>
      <Heading>Hi, {`${state.user.first_name} ${state.user.last_name}`}</Heading>
      <VStack space={4}>
      <Button onPress={() => {
        logout()

      }} mt={5} bgColor={"danger.600"}>
        Logout
      </Button>
      <Button onPress={()=> {
              socket.emit("startCheckingStudents");
            }}>
              Start checking students
            </Button>
      </VStack>
     
    </Box>

  )
}

export default SettingsScreen