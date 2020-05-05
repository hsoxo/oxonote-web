import {call, fork, put, take} from "redux-saga/effects";
import * as ACT from "./actions";
import {
  setBrowserDBConn, setGlobalLoading,
  setLoginStatus,
  setRemoteDBInfo, setSignUpStatus,
  setUserInfo
} from "./actions";
import PouchConn from "@/services/pouchdb";
import {getInfo, login, register} from "@/api/user";
import {getToken, removeToken, setToken} from "@/utils/auth";
import {RequestDone, RequestError, RequestProcessing} from "@/types/request";
import {push} from "connected-react-router";
import PouchDB from "pouchdb-browser";
import {action} from "@/store";
import {setDBSyncStatus} from "./actions";
PouchDB.plugin(require('pouchdb-find').default)
PouchDB.plugin(require('pouchdb-authentication').default)

const SAGA_ACTIONS = Object.entries(ACT).filter(x => x[0].startsWith('SAGA')).map(x => x[1])


function* globalSW() {
  while (true) {
    const action = yield take(SAGA_ACTIONS)

    switch (action.type) {
      case ACT.SAGA_LOAD_JOURNAL_LIST: {
        yield fork(loadJournalList); break; }
      case ACT.SAGA_LOGIN: {
        yield fork(sagaLogin, action.username, action.password); break; }
      case ACT.SAGA_LOGOUT: {
        yield fork(sagaLogout); break; }
      case ACT.SAGA_SIGN_UP: {
        yield fork(sagaSignUp, action.username, action.password, action.email); break; }
      case ACT.SAGA_LOAD_USER: {
        yield fork(loadUserInfo, action.payload); break; }
    }
  }
}

function* loadJournalList() {
  try {
    const value = yield call(PouchConn.journal.readAll)
    yield put(ACT.setJournals(value))
  } catch (e) {
    console.error(e)
  }
}

function* sagaLogin(username: string, password: string) {
  try {
    yield put(setLoginStatus(RequestProcessing))
    const token = yield call(login, username, password)
    setToken(token.data)
    yield put(setLoginStatus(RequestDone))
    yield put(push(`/welcome`))
    yield call(loadUserInfo, '')
  } catch (e) {
    yield put(setLoginStatus(RequestError))
    console.error(e)
  }
}

function* sagaLogout() {
  try {
    removeToken()
    yield put(push(`/login/`))
  } catch (e) {
    console.error(e)
  }
}

function* loadUserInfo(redirect: string | undefined) {
  try {
    const info = yield call(getInfo)
    yield put(setUserInfo(info.data))
    const cdbInfo = info.data.workspaces[0]
    yield put(setRemoteDBInfo(cdbInfo))
    const {user: pdbUser, database} = cdbInfo
    const pdb = new PouchDB(database)
    yield put(setGlobalLoading(true))
    const remote = new PouchDB(`${process.env.NOXO_COUCH_ADDRESS}/${database}`, {skip_setup: true,
      fetch: function (url, opts) {
        // @ts-ignore
        opts.headers.set('x-noxo-token', getToken());
        // @ts-ignore
        opts.headers.set('x-noxo-key', pdbUser)
        return PouchDB.fetch(url, opts)
      }})
    yield call(async () => {
      await pdb.sync(remote, {retry: true})
    })
    yield put(setBrowserDBConn(pdb))
    if (redirect !== '') yield put(push(redirect || `/o/`))
    yield put(setGlobalLoading(false))
  } catch (e) {
    removeToken()
    yield put(push(`/login`))
    console.error(e)
  }
}

function* sagaSignUp(username: string, password: string, email: string) {
  try {
    yield put(setSignUpStatus(RequestProcessing))
    yield call(register, username, password, email)
    yield put(setSignUpStatus(RequestDone))
    yield call(sagaLogin, username, password)
    yield put(push(`/welcome`))
  } catch (e) {
    // @ts-ignore
    yield put(setSignUpStatus(Number(e.message)))
    console.error(e)
  }
}

export default globalSW