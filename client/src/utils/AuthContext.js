import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext(undefined);

const initialState = {
  token: null,
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.payload,
      };
    case 'LOGOUT': {
      return {
        ...state,
        token: null,
        user: null,
      };
    }
    case 'CURRENT_USER': {
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const token = localStorage.getItem('auth');
  if (token) {
    const decodedToken = jwtDecode(token);
    decodedToken.exp * 1000 < Date.now()
      ? localStorage.removeItem('auth')
      : (initialState.token = token);
  }
  const [state, dispatch] = useReducer(authReducer, initialState);

  const logIn = data => {
    localStorage.setItem('auth', data.token);
    dispatch({
      type: 'LOGIN',
      payload: data,
    });
  };

  const logOut = () => {
    localStorage.removeItem('auth');
    dispatch({
      type: 'LOGOUT',
    });
  };

  const getUserData = data => {
    dispatch({
      type: 'CURRENT_USER',
      payload: data,
    });
  };

  return (
    <AuthContext.Provider value={{ state, logIn, logOut, getUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
