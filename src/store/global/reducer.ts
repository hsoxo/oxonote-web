import * as ACT from './actions'
import { GlobalState } from '@/types/states'
import {getToken} from "@/utils/auth";
import PouchDB from "pouchdb-browser";

const initialState: GlobalState = {
  title: 'Welcome to OxO Notes',
  globalLoading: false,
  loginStatus: '',
  signUpStatus: '',
  token: getToken(),
  userInfo: null,
  journals: [],
  dbSyncStatus: '',
  browserDBConn: null,
  remoteDBInfo: null,
}

function reducerGlobal(
  state = initialState,
  action: ACT.GlobalActionType
): GlobalState {
  switch (action.type) {
    case ACT.SET_TITLE:
      return { ...state, title: action.payload || 'Welcome to OxO Notes' }
    case ACT.SET_LOGIN_STATUS:
      return { ...state, loginStatus: action.payload }
    case ACT.SET_SIGN_UP_STATUS:
      return { ...state, signUpStatus: action.payload }
    case ACT.SET_USER_INFO:
      return { ...state, userInfo: action.payload }
    case ACT.SET_JOURNAL_LIST:
      return { ...state, journals: action.payload }
    case ACT.SET_DB_SYNC_STATUS:
      return { ...state, dbSyncStatus: action.payload }
    case ACT.SET_BROWSER_DB_CONN:
      return { ...state, browserDBConn: action.payload }
    case ACT.SET_REMOTE_DB_INFO:
        return { ...state, remoteDBInfo: action.payload }
    default:
      return state
  }
}

export default reducerGlobal