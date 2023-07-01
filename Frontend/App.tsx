import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import  AuthProvider  from './src/providers/AuthProvider';
import Navigation from './src/navigation/Navigation';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import axios from 'axios';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Crypto from 'expo-crypto';
const LOCATION_TRACKING = 'location-tracking';
/* const BACKGROUND_FETCH_TASK = 'background-fetch-location'; */
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import {applicationId} from "expo-application"
import {socket} from './src/utils/socket'
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  })
});


TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {

  const user = await SecureStore.getItemAsync('user').then((res)=> res && JSON.parse(res));
  const role = await SecureStore.getItemAsync('role').then((res)=> res && JSON.parse(res));
  if (error) {
      console.log('LOCATION_TRACKING task ERROR:', error);
      return;
  }
  if (data && user && role) {
      const { locations }:any = data;
      let lat = locations[0].coords.latitude;
      let long = locations[0].coords.longitude;

      if (role == 'Student') {
        axios.post(`http://192.168.1.24:3000/api/updateStudentLocalization/${user._id}` , {
    location: {
      latitude: locations[0].coords.latitude,
      longitude: locations[0].coords.longitude,
      lastUpdate: new Date()
    }
  })
  socket.emit('studentLocationUpdated', {userId: user._id, lastUpdate: new Date(), latitude: locations[0].coords.latitude, longitude: locations[0].coords.longitude})
      }else if(role == 'Teacher'){
        axios.post(`http://192.168.1.24:3000/api/updateTeacherLocalization/${user._id}`, {
    location: {
      latitude: locations[0].coords.latitude,
      longitude: locations[0].coords.longitude,
      lastUpdate: new Date()
    }
  })
  socket.emit('teacherLocationUpdated', {userId: user._id, lastUpdate: new Date(), latitude: locations[0].coords.latitude, longitude: locations[0].coords.longitude})
      }

      let l1 = lat;
      let l2 = long;

      console.log(
          `${new Date(Date.now()).toLocaleString()}: ${lat},${long} (Foreground) ${role}`
      );
      }
      


});


async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: "00ebcfcf-4552-417f-b7c1-7d9fef5a0590",
    })).data;
    console.log(token);
    SecureStore.setItemAsync('expoPushToken', token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    }).catch((err) => console.log(err));
  }

  return token;
}


export default function App() {

  const [expoPushToken, setExpoPushToken] = React.useState<any>('');
  const notificationListener = React.useRef<any>();
  const responseListener = React.useRef<any>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      console.log(token);
      if (token)
      {
        SecureStore.setItemAsync('expoPushToken', token);
        setExpoPushToken(token)
      }
      }).catch((err) => console.log(err));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  const [locationStarted, setLocationStarted] = React.useState(false);
   
    

  const startLocationTracking = async () => {
      await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 10000,
          distanceInterval: 0,
          foregroundService: {
              notificationTitle: 'Location Tracking',
              notificationBody: 'Used to track location in the background',
          },
      }).catch((err) => console.log(err));
      const hasStarted = await Location.hasStartedLocationUpdatesAsync(
          LOCATION_TRACKING,
          
      );
      setLocationStarted(hasStarted);
      console.log('tracking started?', hasStarted);
  };

  React.useEffect(() => {
    const config = async () => {
        let resf = await Location.requestForegroundPermissionsAsync();
        let resb = await Location.requestBackgroundPermissionsAsync();
        if (resf.status != 'granted' && resb.status !== 'granted') {
            console.log('Permission to access location was denied');
        } else {
            console.log('Permission to access location granted');
        }
    };
    config();
    startLocationTracking();
    /* registerBackgroundFetchAsync(); */
    
}, []);


  return (
    <NativeBaseProvider>
      <AuthProvider>
          <Navigation />
      </AuthProvider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
