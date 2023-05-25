import {Box, Button, Heading, Image, VStack} from 'native-base'
import React, { useEffect } from 'react'
import { useAuth } from '../../providers/AuthProvider'
import { socket } from '../../utils/socket'
import axios from 'axios'
import CheckList from '../../components/Checklist'
const SettingsScreen = () => {

  const {state,logout} = useAuth()
  const [checklistOpen, setChecklistOpen] = React.useState(false)





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
              setChecklistOpen(true)
            }}>
              Start checking students
            </Button>
      </VStack>
     
     <CheckList isOpen={checklistOpen} tripId={state.trip._id} onClose={setChecklistOpen} />
    </Box>

  )
}

export default SettingsScreen