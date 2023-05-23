
import { Box, Heading, Text, VStack, Flex, Button } from 'native-base'
import React from 'react'
import { useAuth } from '../../providers/AuthProvider'
import TaskList from '../../components/TasksList'
import TripInfo from '../../components/TripInfo'
import TripSchedule from '../../components/TripSchedule'
import PhotosGrid from '../../components/PhotosGrid'
import { ScrollView } from 'react-native'
import { RefreshControl } from 'react-native'
import PhonesList from '../../components/PhonesList'
import axios from 'axios'
import LoadingScreen from '../../screens/LoadingScreen'
const TripScreen = ({navigation}:any) => {
  const {state, setTrip} = useAuth();
  const [loading, setLoading] = React.useState(false);
  return (
    <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    refreshControl={
      <RefreshControl
        refreshing={false}
        onRefresh={() => {
          setLoading(true);
          axios.get(`http://192.168.1.24:3000/api/getTripInProgressTeacher/${state.user._id}`).then((res) => {

      if(res.data)
      {
        if (res.data.message === "Trip not found") {
        console.log("trip not found")

        }
        else {
          setTrip(res.data)
          setLoading(false)
        }
       
      }
    }
    ).catch((err) => {
      console.log(err.message)
    }
    )
          navigation.navigate("Trip");
        }}
        style={{ flexGrow: 1 }}
      />
    }
  >
    <Box flex="1" safeAreaTop bgColor={"white"}>
      {loading ? <LoadingScreen/> :
      
      (state.trip === null ? (
        <Heading size={"sm"}>No current trip</Heading>
      ) : (
        <VStack space={8} px={8}>
          <TripInfo trip={state.trip} />
          <TripSchedule trip={state.trip} />
          <PhonesList tripId={state.trip._id}/>
          <TaskList tasks={state.trip.tasks} userRole={state.role} tripId={state.trip._id}/>
          <PhotosGrid user={state.user} trip={state.trip} role={state.role}/>
          
        </VStack>
      ))}
    </Box>
  </ScrollView>
  )
}

export default TripScreen