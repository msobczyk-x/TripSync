import { Flex, Heading, Pressable } from 'native-base'
import React from 'react'

const ProfileCard = ({navigation, state}:any) => {
  return (
    <Pressable
    onPress={() => {
      
    }}
    w="90%"
    bg="primary.700"
    rounded={10}
    minH={150}
    maxH={200}

    p={5}
    justifyContent={"space-between"}
  >
    <Flex>
      <Heading color={"white"}>
        {state.user.first_name} 
      </Heading>
      <Heading color={"white"}>
        {state.user.last_name}
      </Heading>
      
      <Heading size={"sm"} color={"white"}>
        {state.user.school}
      </Heading>
    </Flex>
    <Heading size={"sm"} color={"white"}>
      {state.role}{" "}
    </Heading>
  </Pressable>
  )
}

export default ProfileCard