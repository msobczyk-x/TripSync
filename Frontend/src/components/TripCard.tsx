
import React from 'react'
import { Box, Heading, Text, Pressable, Flex, Progress, VStack, HStack } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
const TripCard = ({navigation, trip}:any) => {
    const [progress, setProgress] = React.useState(0)
    const calculateProgress = () => {
        const startDate = new Date(trip.start_date);
        const endDate = new Date(trip.end_date);
        const currentTime = new Date();
        const totalDuration = endDate.getTime() - startDate.getTime();

        const elapsedDuration = currentTime.getTime() - startDate.getTime();
        const progress = Math.min(1, elapsedDuration / totalDuration);
        setProgress(progress);

      }

        React.useEffect(() => { 
    if(trip != null)
            calculateProgress()
         
                
           
        },[trip])


  return (
    <Pressable onPress={() => {
        navigation.navigate('Trip')
      }}
      w="90%"
      bg="blue.300"
      rounded={10}
      minH={200}
      maxH={250}

      p={5}
      

      >
        <VStack>

        
        <Heading>Trip</Heading>
        
          {
              trip === null ? <Heading size={"md"} color={"white"} >No current trip</Heading> :
              <Flex direction='column' h={"85%"} style={{
                gap: 24
              }}>
              <Heading size={"md"} color={"white"} mt={4} >{trip.trip_name} </Heading>
             <HStack>
              
                
             
              <Flex w={"100%"} alignItems={"center"} justifyContent={"space-between"} direction='row' >
              <Text color={"white"}>{trip.start_location}</Text>
          

    <MaterialCommunityIcons name="navigation" size={24} color="white" style={{
                transform: [{ rotate: `90deg` }]
              }} />
           
              <Text color={"white"}>{trip.end_location}</Text>
              </Flex>
      
             </HStack>
              <Flex direction="column" position={"absolute"} bottom={0} width={"100%"}>
        <Text fontSize={15} fontWeight={700} pb="2" >Current trip progress:</Text>
          <Progress value={progress*100} w="100%" colorScheme={"emerald"} />


        </Flex>
        </Flex>
          }

  
</VStack>
      </Pressable>
  )
}

export default TripCard