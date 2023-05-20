import React, {useEffect, useState} from 'react'
import { View, Text, Button, Box } from 'native-base'
import { useAuth } from '../providers/AuthProvider'
import * as Location from 'expo-location';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/teacher/HomeScreen';
import TripScreen from '../screens/teacher/TripScreen';
import LocationScreen from '../screens/teacher/LocationScreen';
import ProfileScreen from '../screens/teacher/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import LoadingScreen from '../screens/LoadingScreen';
import * as SecureStore from 'expo-secure-store';

const Tab = createBottomTabNavigator();
const AppTeacher = () => {
  const {state,logout, setTrip} = useAuth()
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState(null||'');  
  const [loading, setLoading] = useState(true)
  const [tripStatus, setTripStatus] = useState(null || '')

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





  return (

<Tab.Navigator>
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

        <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarLabel: 'Profile',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),}}
/>
</Tab.Navigator>
  )
}

export default AppTeacher