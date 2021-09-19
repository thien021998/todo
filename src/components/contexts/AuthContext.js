/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';

const AuthContext = React.createContext();

function useToken() {
  const [token, setToken] = useState(localStorage.getItem("token"))

  const updateToken = () => {
    setToken(localStorage.getItem("token"))
  }

  return {
    token,
    updateToken
  }
}
const AuthProvider = ({ children }) => {

  const value = useToken()
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
export { AuthContext, AuthProvider };
