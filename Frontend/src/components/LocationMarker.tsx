import { View, Text } from 'react-native'
import { Marker } from 'react-native-maps'
import React from 'react'

const LocationMarker = ({markerData}:any) => {
  return (
    <Marker
              coordinate={{
                latitude: parseFloat(markerData.latitude),
                longitude: parseFloat(markerData.longitude),
              }}
              title={markerData.title}
              pinColor={markerData.color}
            />
  )
}

export default LocationMarker