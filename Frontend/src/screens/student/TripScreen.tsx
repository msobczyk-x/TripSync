import {
  Box,
  Heading,
  Text,
  VStack,
  Flex,
  Button,
  ScrollView,
  Pressable,
  Modal,
  Checkbox,
} from "native-base";
import React from "react";
import { useAuth } from "../../providers/AuthProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Spacer } from "native-base";
import { RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const convertDate = (date: string) => {
  const d = new Date(date);
  const options: any = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return d.toLocaleString("en-GB", options);
};
const TripScreen = ({ navigation }: any) => {
  const [open, setOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<any>(null);
  const insets = useSafeAreaInsets();
  const { state } = useAuth();

  const openModal = (selectedTask: any) => {
    setSelectedTask(selectedTask);
    setOpen(true);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => {
            navigation.navigate("Trip");
          }}
          style={{ flexGrow: 1 }}
        />
      }
    >
      <Box flex="1" safeAreaTop bgColor={"white"}>
        {state.trip === null ? (
          <Heading size={"sm"}>No current trip</Heading>
        ) : (
          <VStack space={8} px={8}>
            <Flex style={{ gap: 10 }}>
              <Heading>{state.trip.trip_name} </Heading>
              <Text fontSize={15} fontWeight={400}>
                {state.trip.trip_description
                  ? state.trip.trip_description
                  : "No description"}
              </Text>
            </Flex>
            <Flex style={{ gap: 24 }}>
              <Heading>Destination</Heading>

              <Flex
                w={"100%"}
                alignItems={"center"}
                justifyContent={"space-between"}
                direction="row"
                bgColor={"blue.400"}
                p={10}
                rounded={"full"}
              >
                <Text color={"white"}>{state.trip.start_location}</Text>

                <MaterialCommunityIcons
                  name="navigation"
                  size={24}
                  color="white"
                  style={{
                    transform: [{ rotate: `90deg` }],
                  }}
                />

                <Text color={"white"}>{state.trip.end_location}</Text>
              </Flex>
            </Flex>
            <Flex
              direction="column"
              alignItems={"flex-start"}
              justifyContent={"space-between"}
              style={{ gap: 10 }}
            >
              <Heading>Trip schedule</Heading>
              <Flex textAlign={"center"} style={{ gap: 10 }}>
                {state.trip.trip_schedule ? (
                  state.trip.trip_schedule.map((schedule: any, index: any) => {
                    return (
                      <Text
                        fontSize={14}
                        fontWeight={500}
                        key={index}
                        style={{
                          textDecorationLine:
                            schedule.date < new Date()
                              ? "line-through"
                              : "none",
                          color: schedule.date < new Date() ? "gray" : "black",
                        }}
                      >
                        {convertDate(schedule.date)} -{" "}
                        <Text fontWeight={700}>{schedule.name}</Text>
                      </Text>
                    );
                  })
                ) : (
                  <Text>No schedule</Text>
                )}
              </Flex>
            </Flex>
            <Flex
              style={{
                gap: 10,
              }}
            >
              <Heading>Tasks</Heading>
              <VStack space={2}>
                {state.trip.tasks ? (
                  state.trip.tasks.map((task: any, index: any) => {
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
                      <Text fontWeight={"500"} fontSize={14}>Reward: {selectedTask?.reward}</Text>
                    </Modal.Body>
                  </Modal.Content>
                </Modal>
              </VStack>
            </Flex>
            <Flex marginBottom={100}>
              <Flex
                direction="row"
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Heading>Photos</Heading>
                <Button>Add</Button>
              </Flex>
              <Flex>
                <Text textAlign={"center"}>No photos</Text>
              </Flex>
            </Flex>
          </VStack>
        )}
      </Box>
    </ScrollView>
  );
};

export default TripScreen;
