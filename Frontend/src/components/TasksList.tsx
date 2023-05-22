import { Checkbox, Flex, VStack, Heading, Modal, Text,Spacer, Pressable } from "native-base";

import React from 'react'

const TaskList = ({tasks}:any) => {
    const [open, setOpen] = React.useState(false);
    const [selectedTask, setSelectedTask] = React.useState<any>(null);
    const openModal = (selectedTask: any) => {
        setSelectedTask(selectedTask);
        setOpen(true);
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
                  </Modal.Content>
                </Modal>
              </VStack>
            </Flex>
  )
}

export default TaskList