import { Box, Heading, VStack, ScrollView } from "native-base";
import React, { useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";

import { RefreshControl } from "react-native";

import TaskList from "../../components/TasksList";
import TripInfo from "../../components/TripInfo";
import TripSchedule from "../../components/TripSchedule";
import PhotosGrid from "../../components/PhotosGrid";

const TripScreen = ({ navigation }: any) => {
  const { state } = useAuth();

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
            <TripInfo trip={state.trip} />
            <TripSchedule trip={state.trip} />
            <TaskList tasks={state.trip.tasks} />
            <PhotosGrid user={state.user} trip={state.trip} />
          </VStack>
        )}
      </Box>
    </ScrollView>
  );
};

export default TripScreen;
