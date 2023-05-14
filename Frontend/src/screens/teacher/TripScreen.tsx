
import { Box, Heading, Text, VStack, Flex, Button } from 'native-base'
import React from 'react'
import { useAuth } from '../../providers/AuthProvider'
import { MaterialCommunityIcons } from '@expo/vector-icons'
const TripScreen = () => {
  const {state} = useAuth();
  return (
   <Box flex="1" safeAreaTop bgColor={"white"}>
      {state.trip === null ? <Heading size={"sm"} >No current trip</Heading> :
              <VStack space={10} p="8">
              <Heading textAlign={"center"}  >{state.trip.trip_name} </Heading>
              <Text fontSize={15} fontWeight={700}  >{state.trip.trip_description}</Text>

              <Flex w={"100%"} alignItems={"center"} justifyContent={"space-between"} direction='row' bgColor={"blue.400"} p={10} rounded={"full"} >
              <Text color={"white"}>{state.trip.start_location}</Text>
          

    <MaterialCommunityIcons name="navigation" size={24} color="white" style={{
                transform: [{ rotate: `90deg` }]
              }} />
           
              <Text color={"white"}>{state.trip.end_location}</Text>
              </Flex>
              <Flex direction='row' alignItems={"center"} justifyContent={"space-between"}>
             <Heading>
              Photos 
             </Heading>
             <Button>
                Add
              </Button>
             </Flex>
              <Flex>
              <Text textAlign={"center"}>No photos</Text>
              </Flex>

              </VStack>
  
}
</Box>
  )
}

export default TripScreen