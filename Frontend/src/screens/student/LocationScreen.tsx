import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import React from 'react'

const LocationScreen = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        userLocationPriority='high'
       />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default LocationScreen