import {Box, Button, Heading, Image} from 'native-base'
import React from 'react'
import { useAuth } from '../../providers/AuthProvider'
const ProfileScreen = () => {

  const {state,logout} = useAuth()
  return (
    <Box flex={1} bg="white" alignItems="center"  safeAreaTop>
      <Image source={require('../../../assets/Logo.png') } w={300} h={300} alt="TripSync logo"/>
      <Heading>Hi, {`${state.user.first_name} ${state.user.last_name}`}</Heading>
      <Button onPress={() => {
        logout()

      }} mt={5}>
        Logout
      </Button>
    </Box>

  )
}

export default ProfileScreen