import {Box, Button, Heading, Image, Flex, HStack, Alert, Text, IconButton, CloseIcon} from 'native-base'
import React, { useEffect } from 'react'
import { useAuth } from '../../providers/AuthProvider'
import { Linking } from 'react-native' 
import {socket} from '../../utils/socket'
const SettingsScreen = () => {

  const [teacherAlertedMessage, setTeacherAlertedMessage] = React.useState("")
  const [alertStatus, setAlertStatus] = React.useState("warning")
  const [showAlert, setShowAlert] = React.useState(false)
  useEffect(() => {
    socket.on('teacherAlerted', (data) => {
      
      setTeacherAlertedMessage("Teacher has been alerted")
      setAlertStatus("success")
      setShowAlert(true)
    })

    return () => {
      socket.off('teacherAlerted')
    }

  }, [])


  const {state,logout} = useAuth()
  return (
    <Box flex={1} bg="white" alignItems="center"  safeAreaTop>
      {
        showAlert &&
        <Alert status={alertStatus} w={"90%"} position={"absolute"} zIndex={10} top={50}>
          <HStack space={2} flexShrink={1} justifyContent={"space-between"} alignItems={"center"} w={"100%"}>
            <HStack space={2} flexShrink={1}>
            <Alert.Icon />
          <Text>{teacherAlertedMessage ? teacherAlertedMessage : "Please wait"}</Text>
            </HStack>
            <IconButton variant ="unstyled" _focus={{
              borderWidth:0
            }} onPress={() => {
              setShowAlert(false)
            }} icon={<CloseIcon size="3" color="black" />} />
          
          </HStack>
        
      </Alert>
      }
      
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
          socket.emit('alertTeacher', { studentId: state.user._id, teacherId: state.trip.teacher_id})
          setShowAlert(true)      
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

export default SettingsScreen