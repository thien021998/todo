/* eslint-disable react-hooks/exhaustive-deps */

import './App.css';
import React from 'react'
import TodoRouter from './TodoRouter';
import { AuthProvider } from './AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <TodoRouter />
    </AuthProvider>
  )
}

export default App;
