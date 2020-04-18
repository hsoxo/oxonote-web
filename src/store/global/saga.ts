import {call, fork, put, take} from "redux-saga/effects";
import * as ACT from "./actions";
import PouchConn from "@/services/pouchdb";

export function* sagaWatcherGlobal() {
  while (true) {
    const action = yield take(Object.values(ACT.default))
    console.log(
      `%c Global Saga: ${action.type}: ${JSON.stringify(action)}`,
      'color: #f0c002'
    )
    switch (action.type) {
      case ACT.default.SAGA_LOAD_JOURNAL_LIST: {
        yield fork(readAllJournals); break; }
    }
  }
}

function* readAllJournals() {
  try {
    const value = yield call(PouchConn.journal.readAll)
    yield put(ACT.setJournals(value))
  } catch (e) {
    console.error(e)
  }}

