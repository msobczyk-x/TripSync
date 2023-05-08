import React, { createContext, useReducer, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
const initialState = {
    user: null,
    isAuthenticated: false,
    role: ''
    // Add more properties if needed
  };

  const authReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          isAuthenticated: false,
        };
      // Add more cases for other actions if needed
      default:
        return state;
    }
  };


export const AuthContext = createContext({});

export const useAuth = () => {
  const [state, dispatch]:any = useContext(AuthContext);

  const login = (user) => {
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    SecureStore.deleteItemAsync('user');
    SecureStore.deleteItemAsync('isAuthenticated');
  };

  // Add more methods if needed

  return {
    state,
    login,
    logout,
    // Return additional methods as needed
  };
};



const AuthProvider = ({ children }) => {
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
  