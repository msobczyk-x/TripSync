import { View, StyleSheet } from "react-native";
import MapView, { Region } from "react-native-maps";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { VStack, Text } from "native-base";
import { LatLng, Marker } from "react-native-maps";
import axios from "axios";
import { useAuth } from "../../providers/AuthProvider";
import { OPENWEATHER_API_KEY } from "@env";
import {getLocationGeocoordinates} from "../../utils/utils";
import LocationMarker from "../../components/LocationMarker";
import UserMarker from "../../components/UserMarker";


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
  const [studentsMarkers, setStudentsMarkers] = useState<any>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      axios
        .get(
          `http://192.168.1.24:3000/api/getTripStudentsLocalization/${state.trip._id}`
        )
        .then((response) => {
          setStudentsMarkers(response.data);
          console.log(response.data);
          console.log(studentsMarkers);
        })
        .catch((error) => {
          console.log(error);
        });
        Promise.all([
          getLocationGeocoordinates(state.trip.start_location, OPENWEATHER_API_KEY, "#00FF00", "Start Location"),
          getLocationGeocoordinates(state.trip.end_location, OPENWEATHER_API_KEY, "#FF0000", "End Location")
        ]).then(([startMarker, endMarker]) => {
          setStartLocationMarker(startMarker);
          setEndLocationMarker(endMarker);
          setLoading(false);
        }).catch((error) => {
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
        <Text
          textAlign={"center"}
          fontWeight={700}
          fontSize={24}
          justifyContent={"center"}
        >
          Loading...
        </Text>
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
          {studentsMarkers && studentsMarkers.map((marker: any, index:number) => (
            <UserMarker key={index} userData={marker} />
          ))}

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
