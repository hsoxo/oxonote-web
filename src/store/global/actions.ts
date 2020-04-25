import {JournalObject} from "@/types/journal";
import {GlobalState, RemoteDBInfo, UserInfo} from "@/types/states";
import {RequestStatus} from "@/types/request";
import PouchDB from "pouchdb-browser";

export const SET_TITLE = 'SET_TITLE'
export const SET_JOURNAL_LIST = 'READ_JOURNAL_LIST'
export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS'
export const SET_USER_INFO = 'SET_USER_INFO'
export const SET_DB_SYNC_STATUS = 'SET_DB_SYNC_STATUS'
export const SET_BROWSER_DB_CONN = 'SET_BROWSER_DB_CONN'
export const SET_REMOTE_DB_INFO = 'SET_REMOTE_DB_INFO'


type SetTitle = { type: typeof SET_TITLE, payload: string}
export const setTitle = (title: string) => ({ type: SET_TITLE, title })

type SetJournals = { type: typeof SET_JOURNAL_LIST, payload: Array<JournalObject>}
export const setJournals = (payload: Array<JournalObject>) => ({ type: SET_JOURNAL_LIST, payload })

type SetLoginStatus = { type: typeof SET_LOGIN_STATUS, payload: RequestStatus}
export const setLoginStatus = (payload: RequestStatus) => ({ type: SET_LOGIN_STATUS, payload })

type SetUserInfo = { type: typeof SET_USER_INFO, payload: UserInfo}
export const setUserInfo = (payload: UserInfo) => ({ type: SET_USER_INFO, payload })

type SetDBSyncStatus = { type: typeof SET_DB_SYNC_STATUS, payload: string}
export const setDBSyncStatus = (payload: string): SetDBSyncStatus => ({ type: SET_DB_SYNC_STATUS, payload })

type SetBrowserDBConn = { type: typeof SET_BROWSER_DB_CONN, payload: PouchDB.Database}
export const setBrowserDBConn = (payload: PouchDB.Database) => ({ type: SET_BROWSER_DB_CONN, payload })

type SetRemoteDBInfo = { type: typeof SET_REMOTE_DB_INFO, payload: RemoteDBInfo}
export const setRemoteDBInfo = (payload: RemoteDBInfo) => ({ type: SET_REMOTE_DB_INFO, payload })

export type GlobalActionType = SetTitle | SetJournals | SetLoginStatus | SetUserInfo | SetBrowserDBConn |
  SetRemoteDBInfo | SetDBSyncStatus

export const SAGA_LOAD_JOURNAL_LIST = 'SAGA/LOAD_JOURNAL_LIST'
interface LoadJournalList {
  type: typeof SAGA_LOAD_JOURNAL_LIST
}

export const SAGA_LOGIN = 'SAGA/SAGA_LOGIN'
interface Login {
  type: typeof SAGA_LOGIN
  username: string
  password: string
}

export const SAGA_LOAD_USER = 'SAGA/SAGA_LOAD_USER'
interface LoadUser {
  type: typeof SAGA_LOAD_USER
}

export type globalSagaAction = LoadJournalList | Login | LoadUser

