import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { privateRoutes, publicRoutes } from './routes'
import { getToken } from '@/utils/auth'
import sagaAction from '@/store'
import { SAGA_LOAD_USER } from '@/store/global/actions'
import { LinearProgress } from '@material-ui/core'
import '@/styles/base.css'

export default function App() {
  return (
    <Switch>
      {publicRoutes.map((route, i) => (
        <PublicRouteWithSubRoutes key={i} {...route} />
      ))}
      {privateRoutes.map((route, i) => (
        <PrivateRouteWithSubRoutes key={i} {...route} />
      ))}
      <Route
        exact
        path={['/']}
        component={() => <Redirect from="/" to="/login" />}
      />
    </Switch>
  )
}

function PrivateRouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      exact={false}
      render={props =>
        // pass the sub-routes down to keep nesting
        getToken() ? (
          <route.component
            {...props}
            routes={route.routes}
            exact={route.exact}
            isSub={route.isSub}
          />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

function PublicRouteWithSubRoutes(route: any) {
  if ((route.path === '/login' || route.path === '/register') && getToken()) {
    sagaAction({ type: SAGA_LOAD_USER, payload: '/o' })
    return <LinearProgress color="secondary" />
  }
  return (
    <Route
      path={route.path}
      exact={false}
      render={props => (
        <route.component {...props} routes={route.routes} exact={route.exact} />
      )}
    />
  )
}
