import { View, Text } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'
import {getTimeElapsed} from '../utils/utils'

// check if time elapsed is more than 15 minutes
// if yes, blink the marker
// if no, don't blink the marker



const UserMarker = ({userData, markerColor, userTitle}:any) => {

  const [blink, setBlink] = React.useState<boolean>(false)


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
    pinColor={blink ? "#FF0000": "FFFFFF" ||  markerColor || "#0000FF"}
  />
  )
}

export default UserMarker