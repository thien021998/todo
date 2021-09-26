/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import './style.css'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import {login,signup} from 'redux/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { AuthContext } from '../contexts/AuthContext';

const LoginRedux = () => {
  const history = useHistory()
  const { updateToken } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const userState  = useSelector(state=>state.user)

  const onSubmit = useCallback(
    async (data) => {
      let user = {}
      user.username = data.username
      user.password = data.password

      if (data.status === "login") {
        try {
          const actionResult = await dispatch(login(user));
          const currentUser = unwrapResult(actionResult);
          if (currentUser.data.id) {
            localStorage.setItem("token",currentUser.data.token)
            updateToken()
            history.push("/")
          } else {
            toast.warning(currentUser.data.message)
          }
        }
        catch (err) {
          toast.error(err.message)
        }
      } else {
        try {
          const actionResult = await dispatch(signup(user));
          const currentUser = unwrapResult(actionResult);
          if (currentUser.data.id) {
            toast.success("Đăng ký thành công! Hãy nhấn đăng nhập")
          } else {
            userState.loading = false
            toast.warning(currentUser.data.message)
          }
        }
        catch (err) {
          toast.error(err.message)
        }
      }
    }, [dispatch])

  return (
    <div className="form">
      <div className="align">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-label text-start d-block">Username :</label>
          <input className="form-control" {...register("username",{ required: true })} placeholder="First name" />
          {errors.username && <p className="textError text-start">This field is required</p>}
          <label className="form-label  text-start d-block">Password :</label>
          <input className="form-control" {...register("password", { required: true })} placeholder="Last name" />
          {errors.password && <p className="textError text-start">This field is required</p>}
          <label className="form-label  text-start d-block">Trạng Thái</label>
          <select className="form-control" {...register("status")}>
            <option value="login">Login</option>
            <option value="register">Signup</option>
          </select>
          <input className="btn btn-info align" type="submit" value={userState.loading ? 'Loading...' : 'Submit'} />
        </form>
      </div>
    </div>
  );
}

export default LoginRedux;
