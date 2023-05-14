
import { Box, Heading, Text } from 'native-base'
import React from 'react'
import { useAuth } from '../../providers/AuthProvider'
const TripScreen = () => {
  const {state} = useAuth();
  return (
   <Box flex="1" safeAreaTop>
      {state.trip === null ? <Heading size={"sm"} >No current trip</Heading> :
              <Box>
              <Heading size={"sm"}  >{state.trip.trip_name} </Heading>
              <Text fontSize={15} fontWeight={700} pb="2" >{state.trip.trip_description}</Text>
              </Box>
  
}
</Box>
  )
}

export default TripScreen