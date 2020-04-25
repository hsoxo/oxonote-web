import {call, fork, put, take} from "redux-saga/effects";
import * as ACT from "./actions";
import {
  setBrowserDBConn,
  setLoginStatus,
  setRemoteDBInfo,
  setUserInfo
} from "./actions";
import PouchConn from "@/services/pouchdb";
import {getInfo, login} from "@/api/user";
import {removeToken, setToken} from "@/utils/auth";
import {RequestDone, RequestError, RequestProcessing} from "@/types/request";
import {push} from "connected-react-router";
import PouchDB from "pouchdb-browser";
PouchDB.plugin(require('pouchdb-find').default)

const SAGA_ACTIONS = Object.entries(ACT).filter(x => x[0].startsWith('SAGA')).map(x => x[1])


function* globalSW() {
  while (true) {
    const action = yield take(SAGA_ACTIONS)
    console.log(
      `%c Global Saga: ${action.type}: ${JSON.stringify(action)}`,
      'color: #f0c002'
    )
    switch (action.type) {
      case ACT.SAGA_LOAD_JOURNAL_LIST: {
        yield fork(loadJournalList); break; }
      case ACT.SAGA_LOGIN: {
        yield fork(sagaLogin, action.username, action.password); break; }
      case ACT.SAGA_LOAD_USER: {
        yield fork(loadUserInfo); break; }
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
    yield call(loadUserInfo)
  } catch (e) {
    yield put(setLoginStatus(RequestError))
    console.error(e)
  }
}

function* loadUserInfo() {
  try {
    const info = yield call(getInfo)
    yield put(setUserInfo(info.data))
    const cdbInfo = info.data.workspaces[0]
    yield put(setRemoteDBInfo(cdbInfo))
    const {database} = cdbInfo
    const pdb = new PouchDB(database)
    yield put(setBrowserDBConn(pdb))
    yield put(setLoginStatus(RequestDone))
    yield put(push(`/o/`))
  } catch (e) {
    removeToken()
    yield put(push(`/login`))
    console.error(e)
  }
}

export default globalSW