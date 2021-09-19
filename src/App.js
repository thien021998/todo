/* eslint-disable react-hooks/exhaustive-deps */

import './App.css';
import React from 'react'
import TodoRouter from './routes/TodoRouter';
import { AuthProvider } from './components/contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <TodoRouter />
    </AuthProvider>
  )
}

export default App;
