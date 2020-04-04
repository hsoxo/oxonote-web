import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { ConnectedRouter } from 'connected-react-router/immutable'

import App from './App'
import { store, history } from '@/store/index'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ED2553'
    }
  }
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <ConnectedRouter history={history} noInitialPop>
          <App />
        </ConnectedRouter>
      </Provider>
    </SnackbarProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
