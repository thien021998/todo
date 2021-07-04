import React, { Component } from 'react';
import './style.css'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  apiSignUp = async (data) => {
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }

  signUP = async () => {
    try {
      let data = {}
      data.username = this.state.username
      data.password = this.state.password
      const res = await this.apiSignUp(data)
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

  apiLogIn = async (data) => {
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }

  logIn = async () => {
    let data = {}
    data.username = this.state.username
    data.password = this.state.password
    try {
      const res = await this.apiLogIn(data)
      if (res.id) {
        this.props.history.push("/");
        localStorage.setItem("token", res.token)
      } else {
        alert(res.message)
      }
    } catch {
      alert("Đăng nhập thất bại !")
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="form">
        <form className="align">

          <div className="mb-3">
            <label className="form-label text-start d-block">Username :</label>
            <input name="username" type="text" className="form-control" value={this.state.username} onChange={this.handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label  text-start d-block">Password :</label>
            <input name="password" type="password" className="form-control" value={this.state.password} onChange={this.handleChange} />
          </div>

        </form>
        <button type="submit" className="btn btn-info align" onClick={this.signUP}><b>Sign up</b></button>
        <button type="submit" className="btn btn-primary align" onClick={this.logIn}><b>Log In</b></button>
      </div>
    );
  }
}

export default Login;
