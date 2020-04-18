import { put, take, call, fork, throttle, select } from 'redux-saga/effects'
import PouchConn from '@/services/pouchdb'
import { push } from 'connected-react-router'
import action from "@/store";
import * as GlobalACT from '@/store/global/actions'
import * as ACT from './actions'
import {JournalState, NoteState} from '@/types/states'
import {JournalEnhancedObject} from "@/types/journal";

export function* journalSaveSW() {
  yield throttle(1000, ACT.SAVE_TO_POUCH, saveToPouch)
}

function* journalSW() {
  while (true) {
    const action = yield take(Object.values(ACT.default))
    console.log(
      `%c Journal Saga: ${action.type}: ${JSON.stringify(action)}`,
      'color: #f0c002'
    )
    switch (action.type) {
      case ACT.default.SAGA_JOURNAL_CREATE: {
        yield fork(createJournal); break; }

      case ACT.default.SAGA_JOURNAL_READ: {
        yield fork(readJournal, action.payload); break; }

    }
  }
}

function* saveToPouch() {
  try {
    const {
      journalChanged,
      journal
    }: JournalState = yield select(state => state.get('journal'))
    if (journalChanged) {
      const copy = Object.assign({}, journal)
      yield fork(PouchConn.journal.update, copy._id, copy)
    }
  } catch (e) {
    console.log(e)
  }
}

function* createJournal() {
  try {
    const journalDoc = yield call(PouchConn.journal.create)
    action(GlobalACT.default.SAGA_LOAD_JOURNAL_LIST)
    yield put(push(`/o/journal/${journalDoc._id}`))
  } catch (e) {
    console.error(e)
  }
}

function* readJournal(journalId: string) {
  try {
    const value = yield call(PouchConn.journal.readOne, journalId)
    yield put(ACT.setAllJournalInfo(value))
  } catch (e) {
    if (e.status === 404) yield put(push(`/o`))
    console.error(e)
  }
}


export default journalSW
