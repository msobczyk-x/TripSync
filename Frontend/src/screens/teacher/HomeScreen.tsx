import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  ScrollView,
  Pressable,
  VStack,
  Progress,
} from "native-base";
import React from "react";
import { useAuth } from "../../providers/AuthProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TripCard from "../../components/TripCard";
const HomeScreen = ({ navigation }: any) => {
  const { state } = useAuth();
  return (
    <ScrollView>
      <VStack
        space={10}
        bg="white"
        alignItems="center"
        justifyContent="center"
        safeAreaTop
        safeAreaBottom
      >
        <Heading alignSelf={"flex-start"} pl={5} mt={8}>
          {" "}
          Home
        </Heading>
        <Pressable
          onPress={() => {
            navigation.navigate("Profile");
          }}
          w="90%"
          bg="primary.700"
          rounded={10}
          minH={200}
          maxH={250}
          shadow={5}
          p={5}
          justifyContent={"space-between"}
        >
          <Flex>
            <Heading color={"white"}>
              Hi, {`${state.user.first_name} ${state.user.last_name}`} !{" "}
            </Heading>
            <Heading size={"sm"} color={"white"}>
              {state.user.school}
            </Heading>
          </Flex>
          <Heading size={"sm"} color={"white"}>
            Role: {state.role}{" "}
          </Heading>
        </Pressable>

        <TripCard navigation={navigation} trip={state.trip} />

        <Pressable
          onPress={() => {
            navigation.navigate("Map");
          }}
          w="90%"
          bg="blue.50"
          rounded={10}
          minH={200}
          maxH={250}
          shadow={2}
          p={5}
          mb={10}
        >
          <Heading>Map</Heading>
        </Pressable>
      </VStack>
    </ScrollView>
  );
};

export default HomeScreen;
