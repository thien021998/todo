
import './App.css';
import TodoList from './TodoList'
import React from 'react'
import Login from './login'
import {BrowserRouter as Router , Route  } from 'react-router-dom'
class App extends React.Component {
  render(){
    return (
      <Router>
      <div className="App container">
        <Route path = "/" exact component = {TodoList}>
        </Route>
        <Route path = "/login" component ={Login}>
          {/* <Login /> */}
        </Route>
      </div>
      </Router>
    );
  }
}

export default App;
