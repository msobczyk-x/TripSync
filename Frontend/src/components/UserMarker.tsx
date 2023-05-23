import { View, Text } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'
import {getTimeElapsed} from '../utils/utils'

// check if time elapsed is more than 15 minutes
// if yes, blink the marker
// if no, don't blink the marker
const isTooLongFromLastUpdate = (lastUpdate: string) => {
  
    const date = new Date(lastUpdate);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
  
    const minute = 60 * 1000;

  
    if (diff < 15 * minute) {
      console.log("less")
      return false;
    }
    else {
      console.log("more")
      return true;
    }

}


const UserMarker = ({userData, markerColor, userTitle}:any) => {


  return (
    <Marker
    coordinate={{
      latitude: parseFloat(userData.location.latitude),
      longitude: parseFloat(userData.location.longitude),
    }}
    title={
        userData.first_name +
      " " +
      userData.last_name +
      (userTitle === undefined ?  "" :` - ${userTitle}`)
    }
    description={getTimeElapsed(
        userData.location.lastUpdate
    ).toString()}
    
    pinColor={  markerColor || "#AF0BB0" }
  />

  )
}

export default UserMarker