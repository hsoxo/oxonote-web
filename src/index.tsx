import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { StoreContext } from 'redux-react-hook'
import { SnackbarProvider } from 'notistack'

import App from './App'
import store from '@/store/index'

ReactDOM.render(
	<SnackbarProvider maxSnack={3}>
		<StoreContext.Provider value={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</StoreContext.Provider>
	</SnackbarProvider>,
	document.getElementById('root')
)
