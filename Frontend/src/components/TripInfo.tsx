import {Flex, Heading, Text} from 'native-base'
import React from 'react'
import {MaterialCommunityIcons} from '@expo/vector-icons'

const TripInfo = ({trip}:any) => {
  return (
    <Flex style={{gap:24}} marginTop={8}>

  
    <Flex style={{ gap: 10 }}>
    <Heading>{trip.trip_name} </Heading>
    <Text fontSize={15} fontWeight={400}>
      {trip.trip_description
        ? trip.trip_description
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
      <Text color={"white"}>{trip.start_location}</Text>

      <MaterialCommunityIcons
        name="navigation"
        size={24}
        color="white"
        style={{
          transform: [{ rotate: `90deg` }],
        }}
      />

      <Text color={"white"}>{trip.end_location}</Text>
    </Flex>
  </Flex>
  </Flex>
  )
}

export default TripInfo