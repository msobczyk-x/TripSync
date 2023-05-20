import React, { useState, useEffect } from "react";
import { View, Text, Button, Box } from "native-base";
import { useAuth } from "../providers/AuthProvider";
import * as Location from "expo-location";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/student/HomeScreen";
import ProfileScreen from "../screens/student/ProfileScreen";
import LocationScreen from "../screens/student/LocationScreen";
import TripScreen from "../screens/student/TripScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import LoadingScreen from "../screens/LoadingScreen";
import * as SecureStore from "expo-secure-store";
import { color } from "native-base/lib/typescript/theme/styled-system";
const Tab = createBottomTabNavigator();

const AppStudent = () => {
  const { state, setTrip, setTeacherPhoneNumber } = useAuth();
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState(null || "");
  const [loading, setLoading] = useState(true);
  const [tripStatus, setTripStatus] = useState(null || "");
  const [teacherPhoneNumber2, setTeacherPhoneNumber2] = useState(null || "");
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  useEffect(() => {
    SecureStore.getItemAsync("trip").then((value) => {
      if (!value) {
        axios
          .get(`http://172.20.10.2:3000/api/getTripStudent/${state.user._id}`)
          .then((res) => {
            if (res.data) {
              if (res.data.message === "Trip not found") {
                setTrip(null);
                setLoading(false);
                setTripStatus("No trip in progress");
              } else {
                setTrip(res.data);
                setLoading(false);
                setTripStatus("In progress");
              }
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        setLoading(false);
        setTripStatus("In progress");

        setTrip(JSON.parse(value));
      }
    });
  }, []);

  useEffect(() => {
    if (tripStatus === "In progress") {
      axios.get(`http://172.20.10.2:3000/api/getTeacherPhoneNumber/${state.trip.teacher_id}`).then((res) => {
        if (res.data) {
          if (res.data.message !== "Invalid id")
          {
            console.log(res.data)
            setTeacherPhoneNumber2(res.data);
            SecureStore.setItemAsync("teacherPhoneNumber", res.data);
         
            setTeacherPhoneNumber(res.data);
      
          }
        }
    }).catch((err) => {
      console.log(err.message);
    });
      ;
  }
  }, [tripStatus]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: "transparent",
          borderTopWidth: 0,

          height: 60,
          paddingBottom: 5,
          paddingTop: 5,

          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          shadowOffset: {
            width: 0,
            height: 24,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 32,
          borderTopLeftRadius: 21,
          borderTopRightRadius: 21,
          backgroundColor: "#000025",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Trip"
        component={TripScreen}
        options={{
          tabBarLabel: "Trip",
          headerShown: true,
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="passport" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={LocationScreen}
        options={{
          tabBarLabel: "Map",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStudent;
