import { Route, Redirect } from 'react-router-dom'

function PublicRoute({children, isAuthenticated, ...res }){
  return (
    <Route
      {...res}
      render = {
        ({location}) => (
          !isAuthenticated ? (
            children
          ) : (
            <Redirect
              to = {{
                pathname : '/',
                state : {from : location}
              }}
            />
          ))
      }
    >
    </Route>
  )
}

export default PublicRoute
