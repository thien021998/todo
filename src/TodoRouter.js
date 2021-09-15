import React, { lazy, useContext, Suspense } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'

const TodoList = lazy(() => import('./TodoList'))
const Login = lazy(() => import('./login'))

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
