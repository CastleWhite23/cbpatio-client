// PrivateRoute.js
import { Alert } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const token = localStorage.getItem("token")
    
  return token ? children : <Alert backgroundColor={"#B72D24"} color={"white"} borderRadius={"10px"}>Voce precisa fazer login para acessar este recurso!</Alert>

};

export {PrivateRoute};