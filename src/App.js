/* eslint-disable react-hooks/exhaustive-deps */

import './App.css';
import React from 'react'
import TodoRouter from './routes/TodoRouter';
import  AuthProvider  from './components/providers/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <AuthProvider>
      <TodoRouter />
      <ToastContainer position="top-center" autoClose={2000} />
    </AuthProvider>
  )
}

export default App;
