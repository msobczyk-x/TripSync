import React, {useEffect, useState} from 'react'
import { View, Text, Button, Box, Modal, Heading } from 'native-base'
import { useAuth } from '../providers/AuthProvider'
import * as Location from 'expo-location';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/teacher/HomeScreen';
import TripScreen from '../screens/teacher/TripScreen';
import LocationScreen from '../screens/teacher/LocationScreen';
import SettingsScreen from '../screens/teacher/SettingsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import LoadingScreen from '../screens/LoadingScreen';
import * as SecureStore from 'expo-secure-store';
import {socket } from '../utils/socket';

const Tab = createBottomTabNavigator();
const AppTeacher = () => {
  const {state,logout, setTrip} = useAuth()
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState(null||'');  
  const [loading, setLoading] = useState(true)
  const [tripStatus, setTripStatus] = useState(null || '')
  const [teacherAlertModal, setTeacherAlertModal] = useState(false)
  const [teacherAlertMsg, setTeacherAlertMsg] = useState({} as any)
  const [token, setToken] = useState<any>(null || "")
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    SecureStore.getItemAsync("expoPushToken").then((value) => {
      if (value) {
        setToken(value);
        console.log (`expoPushToken: ${value}`)
      }
    }
    );
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  useEffect(() => {
    SecureStore.getItemAsync('trip').then((value) => {
  
      if(!value){
 
    axios.get(`http://192.168.1.24:3000/api/getTripInProgressTeacher/${state.user._id}`).then((res) => {

      if(res.data)
      {
        if (res.data.message === "Trip not found") {
          setTrip(null)
          setLoading(false)
          setTripStatus("No trip in progress")
        }
        else {
          setTrip(res.data)
          setLoading(false)
        }
       
      }
    }
    ).catch((err) => {
      console.log(err.message)
    }
    )
  }
  else {
    setLoading(false)
    setTripStatus("In progress")
  
        setTrip(JSON.parse(value))

     
  
    
  }
})

  }, [])


  useEffect(() => {
    if (state.trip){
        socket.auth = { 
        userId: state.user._id,
        tripId: state.trip._id,
        role: "student",
        teacherId: state.trip.teacher_id,
        pushToken: token
      };
      socket.connect()
      socket.on("connect", () => {
        console.log("Connected to socket.io server");
      }
      )
      socket.on("alertTeacher", msg => {
        console.log("alerted")
        setTeacherAlertModal(true)
        setTeacherAlertMsg(msg)
      })
      console.log("socket useEffect")
      return () => {

        socket.off("connect");
        socket.disconnect();
      }
    }


    },[state.trip])


  return (
    <>
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
        <Tab.Screen name="Home" component={HomeScreen} 
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),}

        }
        />
        <Tab.Screen name="Trip" component={TripScreen} 
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Trip',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="passport" color={color} size={size} />
          ),}

        }
        />
        <Tab.Screen name="Map" component={LocationScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          ),}

        }
        />

        <Tab.Screen name="Settings" component={SettingsScreen} options={{
          tabBarLabel: 'Settings',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),}}
/>
</Tab.Navigator>
    <Modal isOpen={teacherAlertModal} closeOnOverlayClick={true} size={"xl"}>
    <Modal.Content>
      <Modal.Header>Student alerted</Modal.Header>
      <Modal.Body>
        <Heading size={"md"}>
          {teacherAlertMsg&& teacherAlertMsg.first_name} {teacherAlertMsg&& teacherAlertMsg.last_name} has alerted you
        </Heading>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group variant="solid" space={2}>
          <Button
            onPress={() => {
              setTeacherAlertModal(false);
            }}
            colorScheme="blue"
          >
            Ok
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
  </>
  )
}

export default AppTeacher