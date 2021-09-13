import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import AuthContext from './AuthContext'
import TodoList from './TodoList'
import Login from './login'

const TodoRouter = () => {
  const {token} = useContext(AuthContext)

  return (
    <Router>
      <div className="App container">
        <Route exact path="/">
          {token === null ? <Redirect to="/login" /> : <TodoList />}
        </Route>
        <Route path="/login" component={Login}>
        </Route>
      </div>
    </Router>
  )
}

export default TodoRouter
