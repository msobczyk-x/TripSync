import { View, StyleSheet } from 'react-native'
import MapView, { Region } from 'react-native-maps'
import React, {useState, useEffect} from 'react'
import * as Location from 'expo-location'
import { VStack, Text } from 'native-base'
import { LatLng, Marker } from 'react-native-maps'
import axios from 'axios'
import { useAuth } from '../../providers/AuthProvider'
import {OPENWEATHER_API_KEY} from '@env';

function getTimeElapsed(dateString:any) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) {
    return 'just now';
  } else if (diff < 2 * minute) {
    return '1 minute ago';
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)} minutes ago`;
  } else if (diff < 2 * hour) {
    return '1 hour ago';
  } else if (diff < day) {
    return `${Math.floor(diff / hour)} hours ago`;
  } else {
    return `${Math.floor(diff / day)} days ago`;
  }
}

const LocationScreen = () => {
  const {state} = useAuth();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [startLocationMarker, setStartLocationMarker] = useState<any>(null);
  const [endLocationMarker, setEndLocationMarker] = useState<any>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [teacherMarker, setTeacherMarker] = useState<any>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
      axios.get(`http://192.168.1.24:3000/api/getTripTeacherLocalization/${state.trip._id}`).then((response) => {
        setTeacherMarker( response.data);
        console.log(response.data);
        console.log(teacherMarker);
      }).catch((error) => {
        console.log(error);
      });
      axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${state.trip.start_location}&appid=${OPENWEATHER_API_KEY}`).then((response) => {
        setStartLocationMarker({
          latitude: response.data[0].lat,
          longitude: response.data[0].lon,
          title: state.trip.start_location + " - Start location",
          color: "#00FF00"
        })
        console.log(response.data);

        
      }).catch((error) => {
        console.log(error);
      });

      axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${state.trip.end_location}&appid=${OPENWEATHER_API_KEY}`).then((response) => {
          setEndLocationMarker({
            latitude: response.data[0].lat,
            longitude: response.data[0].lon,
            title: state.trip.end_location + " - End location",
            color: "#FF0000"
          })
          console.log(response.data);
        }).catch((error) => {
          console.log(error);
        });

      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 2.0,
        longitudeDelta: 2.0,
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
    
    <VStack style={styles.container}
    
    >
      {loading ? (
        <Text textAlign={"center"} fontWeight={700} fontSize={24} justifyContent={"center"}>Loading...</Text>
      ) : (
        <MapView style={styles.map}
        provider='google'
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          userLocationPriority='high'
          initialRegion={region}
          mapPadding={{ bottom: 0, top:35, left: 0, right: 0 }}
        >
          {teacherMarker && (
            <Marker
              coordinate={{
                latitude: parseFloat(teacherMarker.location.latitude),
                longitude: parseFloat(teacherMarker.location.longitude),
              }}
              title={teacherMarker.first_name + " " + teacherMarker.last_name + " - Teacher"} 
                description={getTimeElapsed(teacherMarker.location.lastUpdate).toString()}
                pinColor={"#0000FF"}
              
            />
          )


              
      }

          {startLocationMarker && (
            <Marker

              coordinate={{
                latitude: parseFloat(startLocationMarker.latitude),
                longitude: parseFloat(startLocationMarker.longitude),
              }}
              title={startLocationMarker.title}
              pinColor={startLocationMarker.color}
            />
          )}
          {endLocationMarker && (
            <Marker

              coordinate={{
                latitude: parseFloat(endLocationMarker.latitude),
                longitude: parseFloat(endLocationMarker.longitude),
              }}
              title={endLocationMarker.title}
              pinColor={endLocationMarker.color}
            />
          )}
       
          </MapView>
      )}
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    
  },
});

export default LocationScreen