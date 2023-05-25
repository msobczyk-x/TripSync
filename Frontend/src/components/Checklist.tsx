import { Button, FlatList, HStack, Modal, Box, Text, Icon, CheckIcon, CloseIcon, Spacer, Heading } from 'native-base'
import React, {useEffect} from 'react'
import axios from 'axios'
import { socket } from '../utils/socket'

const Checklist = ({tripId, isOpen, onClose}:any) => {

    const [studentsList, setStudentsList] = React.useState([])
    const [checkedStudents, setCheckedStudents] = React.useState([] as any)
    const [allChecked, setAllChecked] = React.useState(false)
  
    React.useEffect(() => {
        axios.get(`http://192.168.1.24:3000/api/getTripStudents/${tripId}`).then((res) => {
          setStudentsList(res.data)
        }).catch((err) => {
          console.log(err)
        }
        )
      }, [])

      useEffect(() => {
        socket.on("studentAcceptedChecklist", (data) => {
            console.log(`${data.student_id}: accepted checklist`)
          setCheckedStudents([...checkedStudents, data]);
        })
        console.log(`checkedStudents: ${checkedStudents.length}`)
        console.log(`studentsList: ${studentsList.length}`)
     

      }, [])

        useEffect(() => {
            if (checkedStudents.length > 0 && checkedStudents.length === studentsList.length) {
                setAllChecked(true)
            }
        }, [checkedStudents])


  return (
    <Modal isOpen={isOpen} size={"lg"} closeOnOverlayClick={false} >
        <Modal.Content>
      
            <Modal.Header>Checklist</Modal.Header>
            <Modal.Body>
                <FlatList data={studentsList} renderItem={({item}:any) => {
                    return (
                        <Box>
                            <HStack justifyContent="space-between" alignItems={"center"}>
                                <Text fontWeight={700}>
                                    {item.first_name} {item.last_name}
                                </Text>
                                {checkedStudents.find((student:any) => student.student_id === item._id) ? <CheckIcon color="emerald.500" size={5}/> : <CloseIcon color="red.500" size={5} />}
                            
                            </HStack>
                         
                        </Box>
                        
                    )}}/>
                    {allChecked && <Heading size={"sm"} textAlign={"center"} marginTop={4}>All students have checked in !</Heading>}
            </Modal.Body>
        <Modal.Footer>
            <Button.Group variant="solid" space={2}>
                <Button colorScheme="secondary" onPress={() => {
                    socket.emit("stopCheckingStudents")
                    setCheckedStudents([])
                    onClose(false)
                    setAllChecked(false)
                }
                }>{allChecked ? "Close" : "Stop checking students"}</Button>
            
            </Button.Group>

            </Modal.Footer>
        </Modal.Content>
    </Modal>
  )
}

export default Checklist