import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import  AuthProvider  from './src/providers/AuthProvider';
import Navigation from './src/navigation/Navigation';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import axios from 'axios';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Crypto from 'expo-crypto';
const LOCATION_TRACKING = 'location-tracking';
const BACKGROUND_FETCH_TASK = 'background-fetch-location';




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
      }else if(role == 'Teacher'){
        axios.post(`http://192.168.1.24:3000/api/updateTeacherLocalization/${user._id}`, {
    location: {
      latitude: locations[0].coords.latitude,
      longitude: locations[0].coords.longitude,
      lastUpdate: new Date()
    }
  })
      }

      let l1 = lat;
      let l2 = long;

      console.log(
          `${new Date(Date.now()).toLocaleString()}: ${lat},${long} (Foreground) ${role}`
      );
      }


});

/* TaskManager.defineTask('background-fetch-location', async ({data,error}) => {
  const location = await Location.getCurrentPositionAsync({});
  const user = await SecureStore.getItemAsync('user');
  console.log(`user: ${user} BACKGROUND FETCH`)

  const role = await SecureStore.getItemAsync('role');
  console.log (`role: ${role} BACKGROUND FETCH`)
  if (error) {
      console.log('LOCATION_TRACKING task ERROR:', error);
      return;
  }
  if (location && user && role) {
      const userData = JSON.parse(user);
      const { locations }:any = data;
      let lat = locations[0].coords.latitude;
      let long = locations[0].coords.longitude;

      if (role == 'Student') {
        axios.post(`http://192.168.1.24:3000/api/updateStudentLocalization/${userData._id}` , {
    location: {
      latitude: locations[0].coords.latitude,
      longitude: locations[0].coords.longitude,
      lastUpdate: new Date()
    }
  })
      }else if(role == 'Teacher'){
        axios.post(`http://192.168.1.24:3000/api/updateTeacherLocalization/${userData._id}`, {
    location: {
      latitude: locations[0].coords.latitude,
      longitude: locations[0].coords.longitude,
      lastUpdate: new Date()
    }
  })
      }

      l1 = lat;
      l2 = long;

      console.log(
          `${new Date(Date.now()).toLocaleString()}: ${lat},${long} (Background)`
      );
      }
      return BackgroundFetch.BackgroundFetchResult.NewData;

}); */

/* async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 15, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
} */


export default function App() {
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
      });
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
