import { Pressable, Heading, Flex, Box } from 'native-base'
import React, { useEffect, useState } from 'react'
import MapView, { Region } from 'react-native-maps'
import { StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import { BorderColor } from '@mui/icons-material'

const MapCard = ({navigation, state}:any) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [location]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <Pressable onPress={() => {
      navigation.navigate('Map')
    }}
    w="90%"
    rounded={10}
    minH={200}
    maxH={200}


    bg={"blue.200"}
    mb={20}
    style={{
      gap: 10,

    }}

    >
     <Heading style={{
      position: 'absolute',
      top: 20,
      left: 20,
     }} >Map</Heading> 
      <Box bg="blue.200" rounded={10} style={
      {
        height: '100%',
        width: '100%',
                zIndex: -1, 
                borderRadius: 10, 
                borderWidth: 1, 
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'transparent',
  
      }
      }>
        {loading ? (
          <Heading>Loading...</Heading>
        ) : (
          <MapView style={styles.map}
          provider='google'
            showsUserLocation={true}
            followsUserLocation={true}
            userLocationPriority='high'
            initialRegion={region}
            scrollEnabled={false}
          />
        )}
      </Box>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    flex: 1, borderRadius: 10
  },
});

export default MapCard