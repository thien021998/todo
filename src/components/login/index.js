/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import { useLogin, useSignup } from 'hooks';
import { useForm } from 'react-hook-form';
import './style.css'
import { toast } from 'react-toastify';

const Login = () => {
  const history = useHistory()
  const { updateToken } = useContext(AuthContext)
  const { login, loadingLogin } = useLogin()
  const { signup, LoadingRegis } = useSignup()
  const { register, handleSubmit } = useForm()

  const onSubmit = useCallback(
    async (data) => {
      let user = {}
      user.username = data.username
      user.password = data.password
      if (data.status === "login") {
        try {
          const res = await login(user)
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
      } else {
        try {
          const res = await signup(user)
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
      }
    }, [])

  return (
    <div className="form">
      <div className="align">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-label text-start d-block">Username :</label>
          <input className="form-control" {...register("username")} placeholder="First name" />
          <label className="form-label  text-start d-block">Password :</label>
          <input className="form-control" {...register("password")} placeholder="Last name" />
          <label className="form-label  text-start d-block">Trạng Thái</label>
          <select className="form-control" {...register("status")}>
            <option value="login">Login</option>
            <option value="register">Signup</option>
          </select>
          <input className="btn btn-info align" type="submit" value={LoadingRegis || loadingLogin ? 'Loading...' : 'Submit'} />
        </form>
      </div>
    </div>
  );
}

export default Login;
