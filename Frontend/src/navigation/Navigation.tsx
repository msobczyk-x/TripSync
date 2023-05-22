import React, { useEffect, useId, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Auth from './AuthStack'
import AppTeacher from './AppTeacherStack'
import LoadingScreen from '../screens/LoadingScreen'
import AuthProvider from '../providers/AuthProvider'
import { useAuth } from '../providers/AuthProvider'
import { Text } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import AppStudent from './AppStudentStack'
import * as Location from 'expo-location';
import { LatLng } from 'react-native-maps'
import * as TaskManager from 'expo-task-manager';
import { LocationObject } from 'expo-location';
import useLocationChangeListener  from '../hooks/useLocationChangeListener';
import axios from 'axios';
import * as BackgroundFetch from 'expo-background-fetch';


const locationBackgroundTask = async () => {
  const user = await SecureStore.getItemAsync('user').then((value) => {
    if(value == null){
      return null;
    }else{
      return JSON.parse(value);
    }
  })
  
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status === 'granted') {
    const location = await Location.getCurrentPositionAsync({});
    const res = await axios.post('http://192.168.1.24:3000/api/updateStudentLocalization/'+ user._id , {
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        lastUpdate: new Date()
      }
    })
    console.log('Location (in background) changed to:', location);
  }
  else {
    console.log('Location permission not granted!');
  }
}

async function registerBackgroundTask() {
  await BackgroundFetch.registerTaskAsync('locationBackgroundTask', {
    minimumInterval: 60 * 15, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}
TaskManager.defineTask('locationBackgroundTask', locationBackgroundTask);

const Navigation = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const {state} = useAuth();
  const [user, setUser] = React.useState(null);
  const [locationAllowed, setLocationAllowed] = React.useState(false);
useEffect(() => {
  SecureStore.getItemAsync('isAuthenticated').then((value) => {
    if(value == null){
      state.isAuthenticated = false;
      setIsLoading(false);
    }else{
      state.isAuthenticated = JSON.parse(value);
      SecureStore.getItemAsync('role').then((value) => {
        if(value == null){
          state.role = '';
        }else{
          state.role = JSON.parse(value);
        }
      })
      SecureStore.getItemAsync('user').then((value) => {
        if(value == null){
          state.user = null;
        }else{
          state.user = JSON.parse(value);
          setIsLoading(false);
          setUser(state.user);
        }
      })
    }
    SecureStore.getItemAsync('trip').then((value) => {
      if(value == null){
        state.trip = null;
      }else{
        state.trip = JSON.parse(value);
      }
    }
    )
  })
  


}, [state])





useLocationChangeListener((coords: LatLng)=> {
  console.log('Location changed to:', coords);
  const res = axios.post(`http://192.168.1.24:3000/api/updateStudentLocalization/${state.user._id}` , {
    location: {
      latitude: coords.latitude,
      longitude: coords.longitude,
      lastUpdate: new Date()
    }
  })
}, state.role == "Student" && state.isAuthenticated);



useLocationChangeListener((coords: LatLng)=> {
  console.log('Location changed to:', coords);
  const res = axios.post(`http://192.168.1.24:3000/api/updateTeacherLocalization/${state.user._id}`, {
    location: {
      latitude: coords.latitude,
      longitude: coords.longitude,
      lastUpdate: new Date()
    }
  })
}, state.role == "Teacher" && state.isAuthenticated);


registerBackgroundTask();

  return (
    <NavigationContainer>

        {isLoading == true ? <LoadingScreen /> :
        state.isAuthenticated == true ? state.role == 'Student' ? <AppStudent/> : <AppTeacher/> : <Auth />
        
      }
    </NavigationContainer>
  )
    
}

export default Navigation