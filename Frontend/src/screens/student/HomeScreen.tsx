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
import ProfileCard from "../../components/ProfileCard";
import MapCard from "../../components/MapCard";
import { RefreshControl } from "react-native";
const HomeScreen = ({ navigation }: any) => {
  const { state } = useAuth();
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => {
            navigation.navigate("Home");
          }}
          style={{ flexGrow: 1 }}
        />
      }
    >
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
        <ProfileCard navigation={navigation} state={state} />

        <TripCard navigation={navigation} trip={state.trip} />

        <MapCard state={state} navigation={navigation} />
      </VStack>
    </ScrollView>
  );
};

export default HomeScreen;
