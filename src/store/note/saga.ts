import { put, take, call, fork, throttle, select } from 'redux-saga/effects'
import PouchConn from '@/services/pouchdb'
import { push } from 'connected-react-router'

import * as act from './action-declares'
import { RootStateType } from '@/store'
import {NoteState, UpdateAllPayload} from '@/store/note/types'
import {JournalEnhancedType} from "@/types/journal";
import {NoteType} from "@/types/note";

export function* noteSaveSagaWatcher() {
  yield throttle(1000, act.SAVE_TO_POUCH, saveToPouch)
}

function* noteSagaWatcher() {
  while (true) {
    const action = yield take(Object.values(act.default))
    console.log(
      `%c Note Saga: ${action.type}: ${JSON.stringify(action)}`,
      'color: #f0c002'
    )
    switch (action.type) {
      case act.default.SAGA_READ_ALL_JOURNALS: {
        yield fork(readAllJournals)
        break
      }
      case act.default.SAGA_CREATE_JOURNAL: {
        yield fork(createJournal)
        break
      }
      case act.default.SAGA_CREATE_NOTE: {
        yield fork(createNote, action.payload)
        break
      }
      case act.default.SAGA_READ_JOURNAL: {
        yield fork(readJournal, action.payload)
        break
      }
      case act.default.SAGA_READ_NOTE: {
        yield fork(readNote, action.payload)
        break
      }
      case act.default.SAGA_UPDATE_JOURNAL: {
        yield fork(updateJournal, action.payload)
        yield put({ type: act.SAVE_TO_POUCH })
        break
      }
      case act.default.SAGA_UPDATE_NOTE: {
        yield fork(updateNote, action.payload)
        yield put({ type: act.SAVE_TO_POUCH })
        break
      }
      case act.default.SAGA_UPDATE_ALL: {
        yield fork(updateAll, action.payload)
        yield put({ type: act.SAVE_TO_POUCH })
        break
      }
    }
  }
}

function* saveToPouch() {
  try {
    const {
      journalChanged,
      curJournal,
      noteChanged,
      curNote
    }: NoteState = yield select(state => state.get('note'))
    if (journalChanged) {
      const copy = Object.assign({} ,curJournal)
      delete copy.notes
      yield fork(PouchConn.journal.update, copy._id, copy)
    }
    if (noteChanged) {
      yield fork(PouchConn.note.update, curNote._id, curNote)
    }
  } catch (e) {
    console.log(e)
  }
}

function* readAllJournals() {
  try {
    const value = yield call(PouchConn.journal.readAll)
    yield put({ type: act.SET_ALL_JOURNALS, payload: value })
  } catch (e) {
    console.error(e)
  }
}
function* createJournal() {
  try {
    const value = yield call(PouchConn.journal.create)
    value.notes = []
    yield put({ type: act.SET_CUR_JOURNAL, payload: value })
    const { allJournals }: NoteState = yield select(state => state.get('note'))
    const newValue = allJournals.slice()
    newValue.push(value)
    yield put(push(`/o/journal/${value._id}`))
    yield put({ type: act.SET_ALL_JOURNALS, payload: newValue })
  } catch (e) {
    console.error(e)
  }
}

function* readJournal(jourId: string) {
  try {
    const value = yield call(PouchConn.journal.readOne, jourId)
    yield put({ type: act.SET_CUR_JOURNAL, payload: value })
  } catch (e) {
    if (e.status === 404) yield put(push(`/o`))
    console.error(e)
  }
}

function* readNote(noteId: string) {
  try {
    const value: NoteType = yield call(PouchConn.note.readOne, noteId)
    const { curJournal }: NoteState = yield select(state => state.get('note'))
    if (value.journalId !== curJournal._id) 
      yield call(readJournal, value.journalId)
    yield put({ type: act.SET_CUR_NOTE, payload: value })
  } catch (e) {
    if (e.name === 'not_found') put(push(`/o`))
    console.error(e)
  }
}

function* updateJournal(payload: JournalEnhancedType) {
  try {
    yield put({ type: act.SET_CUR_JOURNAL, payload })
    if ('title' in payload || 'titleIcon' in payload) {
      const { allJournals, curJournal }: NoteState = yield select(state => state.get('note'))
      const newValue = allJournals.slice()
      const journalIndex = newValue.findIndex(x => x._id === curJournal._id)
      if ('title' in payload)
        newValue[journalIndex].title = payload.title
      if ('titleIcon' in payload)
        newValue[journalIndex].titleIcon = payload.titleIcon
      yield put({ type: act.SET_ALL_JOURNALS, payload: newValue })
    }
  } catch (e) {
    console.error(e)
  }
}

function* updateNote(payload: JournalEnhancedType) {
  try {
    yield put({ type: act.SET_CUR_NOTE, payload })
  } catch (e) {
    console.error(e)
  }
}

function* updateAll(payload: UpdateAllPayload) {
  try {
    yield put({ type: act.SET_CUR_BOTH, payload })
  } catch (e) {
    console.error(e)
  }
}

function* createNote(payload: string) {
  try {
    const value = yield call(PouchConn.note.create, payload)
    yield put({ type: act.SET_CUR_NOTE, payload: value })
    yield put(push(`/o/editor/${value._id}`))
  } catch (e) {
    console.error(e)
  }
}
export default noteSagaWatcher
