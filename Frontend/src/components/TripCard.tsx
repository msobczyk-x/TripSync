
import React from 'react'
import { Box, Heading, Text, Pressable, Flex, Progress } from 'native-base'

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
      shadow={5}
      p={5}
      
      justifyContent={"space-between"}
      >
        <Heading>Trip</Heading>
        
          {
              trip === null ? <Heading size={"sm"} color={"white"} >No current trip</Heading> :
              <Box>
              <Heading size={"sm"} color={"white"} >{trip.trip_name} </Heading>
              <Flex direction="column" justifyContent="space-between">
        <Text fontSize={15} fontWeight={700} pb="2" >Current trip progress:</Text>
          <Progress value={progress*100} w="100%" colorScheme={"emerald"} />


        </Flex>
        </Box>
          }

  
        
       
      </Pressable>
  )
}

export default TripCard