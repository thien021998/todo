import React, { useState } from 'react';
import { AuthContext } from 'components/contexts/AuthContext';

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
export default AuthProvider
