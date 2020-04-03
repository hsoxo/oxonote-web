import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Map } from 'immutable'
import { combineReducers } from 'redux-immutable'

const rootReducer = combineReducers({})

const initialState = Map()
const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

export default store
