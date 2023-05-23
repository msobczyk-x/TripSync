import { View, StyleSheet } from "react-native";
import MapView, { Region } from "react-native-maps";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { VStack, Text } from "native-base";
import { LatLng, Marker } from "react-native-maps";
import axios from "axios";
import { useAuth } from "../../providers/AuthProvider";
//@ts-ignore
import { OPENWEATHER_API_KEY } from "@env";
import {getLocationGeocoordinates} from "../../utils/utils";
import LocationMarker from "../../components/LocationMarker";
import UserMarker from "../../components/UserMarker";
import LoadingScreen from "../../screens/LoadingScreen";
import * as SecureStore from "expo-secure-store";


const LocationScreen = () => {
  const { state } = useAuth();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
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
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      SecureStore.getItemAsync("tripLocationStartGeocooridnates").then((startMarker) => {
        if (startMarker){
          setStartLocationMarker(JSON.parse(startMarker));
          SecureStore.getItemAsync("tripLocationEndGeocooridnates").then((endMarker) => {
            if (endMarker){
              setEndLocationMarker(JSON.parse(endMarker));
              setLoading(false);
            }
          })
        }
        else{
          Promise.all([
            getLocationGeocoordinates(state.trip.start_location, OPENWEATHER_API_KEY, "#00FF00", "Start Location"),
            getLocationGeocoordinates(state.trip.end_location, OPENWEATHER_API_KEY, "#0000FF", "End Location")
          ]).then(([startMarker, endMarker]) => {
            setStartLocationMarker(startMarker);
            setEndLocationMarker(endMarker);
            SecureStore.setItemAsync("tripLocationStartGeocooridnates", JSON.stringify(startMarker));
            SecureStore.setItemAsync("tripLocationEndGeocooridnates", JSON.stringify(endMarker));
            setLoading(false);
          }).catch((error) => {
            console.log(error);
          });
        }})
      axios
        .get(
          `http://192.168.1.24:3000/api/getTripTeacherLocalization/${state.trip._id}`
        )
        .then((response) => {
          setTeacherMarker(response.data);
          console.log(response.data);
          console.log(teacherMarker);
        })
        .catch((error) => {
          console.log(error);
        });
        
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

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <VStack style={styles.container}>
      {loading ? (
        <LoadingScreen/>
      ) : (
        <MapView
          style={styles.map}
          provider="google"
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          userLocationPriority="high"
          initialRegion={region}
          mapPadding={{ bottom: 0, top: 35, left: 0, right: 0 }}
        >
          {teacherMarker && (
           <UserMarker userData={teacherMarker} userTitle="Teacher"/>
          )}

          {startLocationMarker.latitude && (
            <LocationMarker markerData={startLocationMarker} />
          )}
          {endLocationMarker.latitude && (
            <LocationMarker markerData={endLocationMarker} />
          )}
        </MapView>
      )}
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default LocationScreen;
