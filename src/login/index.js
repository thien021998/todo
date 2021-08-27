import React, { useState } from 'react';
import './style.css'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const apiSignUp = async (data) => {
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }

  const signUP = async () => {
    try {
      let data = {}
      data.username = username
      data.password = password
      const res = await apiSignUp(data)
      if (res.id) {
        alert("Đăng ký thành công! Hãy nhấn đăng nhập")
      } else {
        alert(res.message)
      }
    }
    catch {
      alert("Đăng ký thất bại")
    }
  }

  const apiLogIn = async (data) => {
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }

  const logIn = async () => {
    let data = {}
    data.username = username
    data.password = password
    try {
      const res = await apiLogIn(data)
      console.log(res)
      if (res.id) {
        props.history.push('/');
        localStorage.setItem("token", res.token)
      } else {
        alert(res.message)
      }
    } catch {
      alert("Đăng nhập thất bại !")
    }
  }

  const handleChange = (event) => {
    if(event.target.name === 'username'){
      setUsername( event.target.value)
    } else if (event.target.name === 'password') {
      setPassword( event.target.value)
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
        <button type="submit" className="btn btn-info align" onClick={signUP}><b>Sign up</b></button>
        <button type="submit" className="btn btn-primary align" onClick={logIn}><b>Log In</b></button>
      </div>
    );
}

export default Login;
