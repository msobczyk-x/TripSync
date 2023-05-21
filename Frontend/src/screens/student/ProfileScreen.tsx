import {Box, Button, Heading, Image, Flex, HStack} from 'native-base'
import React from 'react'
import { useAuth } from '../../providers/AuthProvider'
import { position } from 'native-base/lib/typescript/theme/styled-system'
import { Linking } from 'react-native'
const ProfileScreen = () => {

  const {state,logout} = useAuth()
  return (
    <Box flex={1} bg="white" alignItems="center"  safeAreaTop>
      <Image source={require('../../../assets/Logo.png') } w={300} h={300} alt="TripSync logo"/>
      <Heading>{`${state.user.first_name} ${state.user.last_name}`}</Heading>
      <Button onPress={() => {
        logout()

      }} mt={5}>
        Logout
      </Button>

      <Flex mt={20} style={{
        gap: 24,
        position: "absolute",
        bottom: 128,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Heading >
        Are you lost ?
        </Heading> 
        <HStack space={4}>
        <Button onPress={() => {
          Linking.openURL(`tel:${state.teacherPhoneNumber}`)
        }}
        bg={"danger.600"}
        >
          Call your teacher
        </Button>
        <Button onPress={() => {

        }}
        bg={"danger.600"}
        >
          Alert your teacher
        </Button>
        </HStack>
       
        
      </Flex>
    </Box>

  )
}

export default ProfileScreen