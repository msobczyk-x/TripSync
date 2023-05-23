import { View, HStack, Spinner, Heading, Image, Text, Box } from 'native-base'
import React from 'react'


const LoadingScreen = () => {
  return (
    <Box flex={"1"} >
        <Image source={require('../../assets/Logo.png')} style={{width:300, height:300, alignSelf:"center"}} alt="TripSync logo"/>
      <HStack space={2} justifyContent="center" alignItems={"center"}>
      <Spinner accessibilityLabel="Loading posts" size={"lg"} />
      <Heading color="primary.500" fontSize="lg">
      Loading
      </Heading>
    </HStack>
    </Box>
  )
}

export default LoadingScreen