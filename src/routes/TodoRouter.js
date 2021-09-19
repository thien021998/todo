import React, { lazy, useContext, Suspense } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { AuthContext } from '../components/contexts/AuthContext'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const TodoList = lazy(() => import('../components/todo/TodoList'))
const Login = lazy(() => import('../components/login'))

const TodoRouter = () => {
  const { token } = useContext(AuthContext)

  return (
    <Router>
      <div className="App container">
        <Suspense fallback={<div>Loading ...</div>}>
          <Switch>
            <PublicRoute
              path='/login'
              isAuthenticated={token}
            >
              <Login />
            </PublicRoute>
            <PrivateRoute
              path='/'
              isAuthenticated={token}
            >
              <TodoList />
            </PrivateRoute>
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}

export default TodoRouter
