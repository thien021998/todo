import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({children, isAuthenticated, ...res }){
  return (
    <Route
      {...res}
      render = {
        ({location}) => (
          isAuthenticated ? (
            children
          ) : (
            <Redirect
              to = {{
                pathname : '/login',
                state : {from : location}
              }}
            />
          ))
      }
    >
    </Route>
  )
}

export default PrivateRoute
