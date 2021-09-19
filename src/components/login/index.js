/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import {AuthContext} from '../contexts/AuthContext';
import { useLogin, useRegister } from 'hooks';
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const {updateToken} = useContext(AuthContext)
  const {login, loadingLogin} = useLogin()
  const {register, LoadingRegis} = useRegister()

  const signUP = useCallback(
    async () => {
      try {
        let data = {}
        data.username = username
        data.password = password
        const res = await register(data)
        console.log(res)
        if (res.id) {
          toast.success("Đăng ký thành công! Hãy nhấn đăng nhập")
        } else {
          toast.warning(res.message)
        }
      }
      catch {
        toast.error("Đăng ký thất bại")
      }
    }, [username, password])

  const logIn = useCallback(
    async () => {
      let data = {}
      data.username = username
      data.password = password
      try {
        const res = await login(data)
        console.log(res)
        if (res.id) {
          localStorage.setItem("token", res.token)
          updateToken()
          history.push('/');
        } else {
          toast.warning(res.message)
        }
      } catch {
        toast.error("Đăng nhập thất bại !")
      }
    }, [username, password])

  const handleChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value)
    } else if (event.target.name === 'password') {
      setPassword(event.target.value)
    }
  }

  return (
    <div className="form">
      <div className="align">
        <div className="mb-3">
          <label className="form-label text-start d-block">Username :</label>
          <input name="username" type="text" className="form-control" value={username} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label  text-start d-block">Password :</label>
          <input name="password" type="password" className="form-control" value={password} onChange={handleChange} />
        </div>
      </div>
      <button type="submit" className="btn btn-info align" onClick={signUP}><b>{LoadingRegis ? LoadingRegis : 'Sigup'}</b></button>
      <button type="submit" className="btn btn-primary align" onClick={logIn}><b>{loadingLogin ? loadingLogin : 'Login'}</b></button>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Login;
