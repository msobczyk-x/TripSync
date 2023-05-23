import { Checkbox, Flex, VStack, Heading, Modal, Text,Spacer, Pressable, Button } from "native-base";
import axios from "axios";
import React from 'react'

const TaskList = ({tasks, userRole, tripId}:any) => {
    const [open, setOpen] = React.useState(false);
    const [selectedTask, setSelectedTask] = React.useState<any>(null);
    const openModal = (selectedTask: any) => {
        setSelectedTask(selectedTask);
        setOpen(true);
        console.log(selectedTask)
      };

  return (
    <Flex
              style={{
                gap: 10,
              }}
            >
              <Heading>Tasks</Heading>
              <VStack space={2}>
                {tasks ? (
                  tasks.map((task: any, index: any) => {
                    return (
                      <Pressable
                        disabled={task.isDone}
                        onPress={() => {
                          openModal(task);
                        }}
                        key={index}
                      >
                        <Checkbox
                          value={index}
                          isDisabled
                          isChecked={task.isDone}
                          _text={{
                            textDecorationLine: task.isDone
                              ? "line-through"
                              : "none",
                            color: task.isDone ? "gray" : "black",
                          }}
                        >
                          {task.name}
                        </Checkbox>
                      </Pressable>
                    );
                  })
                ) : (
                  <Text textAlign={"center"}>No tasks</Text>
                )}
                <Modal
                  isOpen={open}
                  onClose={() => {
                    setOpen(false);
                  }}
                  size={"md"}
                >
                  <Modal.Content maxWidth={"400"}>
                    <Modal.CloseButton />
                    <Modal.Header>{selectedTask?.name}</Modal.Header>
                    <Modal.Body>
                      <Text>{selectedTask?.description}</Text>
                      <Spacer />
                      <Text fontWeight={"500"} fontSize={14}>
                        Reward: {selectedTask?.reward}
                      </Text>
                    </Modal.Body>
                    {userRole === "Teacher" && (
                    <Modal.Footer>
                      
                      <Button onPress={()=> {
                        
                        axios.post(`http://192.168.1.24:3000/api/updateTripTask/${tripId}/${selectedTask._id}`).then((res) => {
                          if (res.status === 200){
                            console.log(res.data);
                            tasks.find((task: any) => task._id === selectedTask._id).isDone = true;
                            setOpen(false);
                          }
                    
                        }).catch((err) => {
                          console.log(err);
                        })
                        }
                        
                      }>
                          Mark as done
                      </Button>
                      </Modal.Footer>
)}
                   
                  </Modal.Content>
                </Modal>
              </VStack>
            </Flex>
  )
}

export default TaskList