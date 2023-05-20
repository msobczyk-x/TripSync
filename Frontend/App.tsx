import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import  AuthProvider  from './src/providers/AuthProvider';
import Navigation from './src/navigation/Navigation';


export default function App() {
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
