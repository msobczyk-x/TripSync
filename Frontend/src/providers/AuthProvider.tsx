import React, { createContext, useReducer, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
const initialState = {
    user: null,
    isAuthenticated: false,
    role: '',
    trip: null
    // Add more properties if needed
  };

  const authReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          user: action.payload.user,
          role: action.payload.role,
          isAuthenticated: true,
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          role: '',
          isAuthenticated: false,
          trip: null
        };
      case 'SET_TRIP':
        return {
          ...state,
          trip: action.payload.trip
        };
      // Add more cases for other actions if needed
      default:
        return state;
    }
  };


export const AuthContext = createContext({});

export const useAuth = () => {
  const [state, dispatch]:any = useContext(AuthContext);

  const login = (user: any, role:any) => {

    dispatch({ type: 'LOGIN', payload: {user, role} });
    SecureStore.setItemAsync('user', JSON.stringify(user));
    SecureStore.setItemAsync('isAuthenticated', JSON.stringify(true));
    SecureStore.setItemAsync('role', JSON.stringify(role));

  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    SecureStore.deleteItemAsync('user');
    SecureStore.deleteItemAsync('isAuthenticated');
    SecureStore.deleteItemAsync('role');
    SecureStore.deleteItemAsync('userEmail');
    SecureStore.deleteItemAsync('trip');
  };

  const setTrip = (trip: any) => {
    dispatch({ type: 'SET_TRIP', payload: {trip} });
    SecureStore.setItemAsync('trip', JSON.stringify(trip));
  };

  // Add more methods if needed

  return {
    state,
    login,
    logout,
    setTrip
    // Return additional methods as needed
  };
};



const AuthProvider = ({ children }:any) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
  
    // Perform any necessary initialization or side effects here, such as checking local storage for persisted authentication state
  
    useEffect(() => {
      // Example: Check local storage for persisted authentication state
console.log(state)
    }, []);
  
    return (
      <AuthContext.Provider value={[state, dispatch]}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthProvider;
  