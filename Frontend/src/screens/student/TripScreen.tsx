import { Box, Heading, VStack, ScrollView, Button } from "native-base";
import React, { useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";

import { RefreshControl } from "react-native";

import TaskList from "../../components/TasksList";
import TripInfo from "../../components/TripInfo";
import TripSchedule from "../../components/TripSchedule";
import PhotosGrid from "../../components/PhotosGrid";
import axios from "axios";
import LoadingScreen from "../../screens/LoadingScreen";
import { socket } from "../../utils/socket";
import { useContext } from "react";

const TripScreen = ({ navigation }: any) => {

  const { state, setTrip } = useAuth();
  const [loading, setLoading] = React.useState(false);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => {
            setLoading(true);
            axios
          .get(`http://192.168.1.24:3000/api/getTripStudent/${state.user._id}`)
          .then((res) => {
            if (res.data) {
              if (res.data.message === "Trip not found") {
                console.log("trip not found");
       
                
              } else {
                console.log(res.data);
                setTrip(res.data);
                setLoading(false);
              }
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
          
            navigation.navigate("Trip");

          }}
          style={{ flexGrow: 1 }}
        />
      }
    >
      <Box flex="1" safeAreaTop bgColor={"white"}>
        {loading ? <LoadingScreen /> :
        (state.trip === null ? (
          <Heading size={"sm"}>No current trip</Heading>
        ) : (
          <VStack space={8} px={8}>
          
            <TripInfo trip={state.trip} />
            <TripSchedule trip={state.trip} />
            <TaskList tasks={state.trip.tasks} />
            <PhotosGrid user={state.user} trip={state.trip} />
          </VStack>
        ))
        }
      </Box>
    </ScrollView>
  );
};

export default TripScreen;
