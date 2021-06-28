import React, { Component } from 'react';
import './style.css'
class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password:''
    }
  }

  signUP =()=> {
    let data = {}
    data.username = this.state.username
    data.password = this.state.password
     data = JSON.stringify(data)
    fetch('https://todo-mvc-api-typeorm.herokuapp.com/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:data
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if(!data.message) {
          alert("Đăng ký thành công! Hãy nhấn đăng nhập")
        this.props.history.push("/");
        } else alert("Đăng ký thất bại ! Username đã tồn tại")

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  signIn =()=> {
    let data = {}
    data.username = this.state.username
    data.password = this.state.password
     data = JSON.stringify(data)
    fetch('https://todo-mvc-api-typeorm.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:data
    })
      .then(response => {
        let res = response
        if(res.status === 201 || res.status === 200) {
          localStorage.setItem("username" , this.state.username)
        this.props.history.push("/");
        } else alert("Đăng nhập thất bại !")
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
          <input name = "username" type="text" className="form-control" value={this.state.username} onChange={this.handleChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label  text-start d-block">Password :</label>
          <input name="password" type="password" className="form-control" value={this.state.password} onChange={this.handleChange}/>
        </div>

      </form>
      <button type="submit" className="btn btn-primary align" onClick={this.signUP}>Sign up</button>
      <button type="submit" className="btn btn-primary align" onClick={this.signIn}>Sign in</button>
      </div>
    );
  }
}

export default Login;
