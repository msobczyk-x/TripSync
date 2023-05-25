import {Box, Button, Heading, Image, Flex, HStack, Alert, Text, IconButton, CloseIcon} from 'native-base'
import React, { useEffect } from 'react'
import { useAuth } from '../../providers/AuthProvider'
import { Linking } from 'react-native' 
import {socket} from '../../utils/socket'
const SettingsScreen = () => {

  const [teacherAlertedMessage, setTeacherAlertedMessage] = React.useState("")
  const [alertStatus, setAlertStatus] = React.useState("warning")
  const [showAlert, setShowAlert] = React.useState(false)
  const [buttonCountdown, setButtonCountdown] = React.useState(5)
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  let timeout: any = null
  useEffect(() => {
    socket.on('teacherAlerted', (data) => {
      if (data.error) {
        setTeacherAlertedMessage(data.error)
        setAlertStatus("error")
        setShowAlert(true)
        return
      }
      setTeacherAlertedMessage("Teacher has been alerted")
      setAlertStatus("success")
      setShowAlert(true)
    })

    return () => {
      socket.off('teacherAlerted')
    }

  }, [])

  useEffect(() => {
    if (buttonDisabled) {
      timeout = setTimeout(() => {
        setButtonCountdown(buttonCountdown - 1)
      }, 1000)
    }
    if (buttonCountdown === 0) {
      setButtonDisabled(false)
      setButtonCountdown(5)
      clearTimeout(timeout)
    }
   
  }, [buttonCountdown, buttonDisabled])


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
        w={"45%"}
        >
          Call your teacher
        </Button>
        <Button disabled={buttonDisabled} onPress={() => {
          if (!buttonDisabled) {
            socket.emit('alertTeacher', { studentId: state.user._id, teacherId: state.trip.teacher_id, first_name: state.user.first_name, last_name: state.user.last_name})
            setShowAlert(true)
            setButtonDisabled(true)
            
          }
          }}
        bg={"danger.600"}
        w={"45%"}
        >
          {buttonDisabled ? buttonCountdown :  "Alert your teacher"}
        </Button>
        </HStack>
       
        
      </Flex>
    </Box>

  )
}

export default SettingsScreen