import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux'
import { combineReducers } from 'redux-immutable'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory, History } from 'history'
import { Map } from "immutable";

import rootSaga from "@/store/rootSaga";
import globalReducer from "@/store/global/reducer";
import { globalSagaAction } from './global/actions'
import noteReducer from "@/store/note/reducer";
import { NoteSagaAction } from './note/saga'
import journalReducer from "@/store/journal/reducer";
import { JournalSagaActions } from './journal/saga'
import {util} from "prismjs";
import type = util.type;

const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    global: globalReducer,
    journal: journalReducer,
    note: noteReducer,
})
export const history = createBrowserHistory()

const rootReducer = createRootReducer(history)

interface StateMap<T> extends Map<string, any> {
    get<K extends keyof T>(key: string): T[K];
}

export type RootStateType = StateMap<typeof rootReducer>


export const useSelector: TypedUseSelectorHook<RootStateType> = useReduxSelector

const saga = createSagaMiddleware();

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(applyMiddleware(routerMiddleware(history), saga));

// @ts-ignore
export const store = createStore(rootReducer, Map(), enhancer)

saga.run(rootSaga)


const action = (x: globalSagaAction | JournalSagaActions | NoteSagaAction) => store.dispatch(x)

export default action