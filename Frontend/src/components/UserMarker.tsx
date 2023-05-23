import { View, Text } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'
import {getTimeElapsed} from '../utils/utils'


const isTooLongFromLastUpdate = (lastUpdate: string) => {
  
    const date = new Date(lastUpdate);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
  
    const minute = 60 * 1000;

  
    if (diff < 15 * minute) {
      console.log("not too long")
      return false;
    }
   
    console.log("too long")
      return true;
    

}


const UserMarker = ({userData, markerColor, userTitle}:any) => {
  const [blink, setBlink] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isTooLongFromLastUpdate(userData.location.lastUpdate)) {
      return;
    }
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, [userData.location.lastUpdate]);

  return (
    <Marker
    key={`${userData.first_name}-${userData.last_name}-${blink ? 'blink' : 'no-blink'}-${userData.location.lastUpdate}}`}
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
    
    pinColor={ markerColor || blink ? "#FF0000" : "#FFFF00"  }
  />

  )
}

export default UserMarker