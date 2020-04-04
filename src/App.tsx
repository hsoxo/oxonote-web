import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import routes from './routes'


export default function App() {
  return (
    <Router>
      <Switch>
        {routes.map((r, key) => {
          return (
              <Route
                  render={(props) =>
                      <r.component {...props} routes={r.routes || []} />}
                  exact={false}
                  key={r.path + key}
                  path={r.path}
              />
          )
        })}
      </Switch>
    </Router>
  )
}
