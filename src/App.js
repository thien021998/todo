/* eslint-disable react-hooks/exhaustive-deps */

import './App.css';
import React, { useCallback, useState }  from 'react'
import TodoRouter from './TodoRouter';
import AuthContext from './AuthContext';

const App = () =>{
  const [token ,setToken] = useState(localStorage.getItem("token"))

  const updateToken = useCallback(
    () => {
      setToken(localStorage.getItem("token"))
    },[token]
  )
  const value = {token,updateToken}

    return (
      <AuthContext.Provider value = {value}>
        <TodoRouter/>
      </AuthContext.Provider>
    )
  }

export default App;
