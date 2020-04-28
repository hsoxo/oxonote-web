import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { StylesProvider } from '@material-ui/core/styles';

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
    <StylesProvider injectFirst>
      <SnackbarProvider maxSnack={3} anchorOrigin={{horizontal: 'right', vertical: 'top'}} autoHideDuration={3000}>
        <Provider store={store}>
          <ConnectedRouter history={history} noInitialPop>
            <App />
          </ConnectedRouter>
        </Provider>
      </SnackbarProvider>
    </StylesProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
