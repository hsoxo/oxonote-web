import { put, take, call, fork, throttle, select } from 'redux-saga/effects'
import PouchConn from '@/services/pouchdb'
import { push } from 'connected-react-router'

import * as actions from './actions'
import {NoteState} from '@/types/states'
import {JournalEnhancedObject} from "@/types/journal";
import {NoteObject} from "@/types/note";
import {UpdateAllPayload} from './actions'
export function* noteSaveSagaWatcher() {
  yield throttle(1000, actions.SAVE_TO_POUCH, saveToPouch)
}

function* noteSagaWatcher() {
  while (true) {
    const action = yield take(Object.values(actions.default))
    console.log(
      `%c Note Saga: ${action.type}: ${JSON.stringify(action)}`,
      'color: #f0c002'
    )
    switch (action.type) {
      case actions.default.SAGA_READ_ALL_JOURNALS: {
        yield fork(readAllJournals); break; }

      case actions.default.SAGA_CREATE_JOURNAL: {
        yield fork(createJournal); break; }

      case actions.default.SAGA_CREATE_NOTE: {
        yield fork(createNote, action.payload); break; }

      case actions.default.SAGA_READ_JOURNAL: {
        yield fork(readJournal, action.payload); break; }

      case actions.default.SAGA_READ_NOTE: {
        yield fork(readNote, action.payload); break; }

      case actions.default.SAGA_UPDATE_JOURNAL: {
        yield fork(updateJournal, action.payload)
        yield put({ type: actions.SAVE_TO_POUCH })
        break; }

      case actions.default.SAGA_UPDATE_NOTE: {
        yield fork(updateNote, action.payload)
        yield put({ type: actions.SAVE_TO_POUCH })
        break; }

      case actions.default.SAGA_UPDATE_ALL: {
        yield fork(updateAll, action.payload)
        yield put({ type: actions.SAVE_TO_POUCH })
        break; }

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
    yield put(actions.setAllJournals(value))
  } catch (e) {
    console.error(e)
  }
}
function* createJournal() {
  try {
    const value = yield call(PouchConn.journal.create)
    value.notes = []
    yield put(actions.setCurJournal(value))
    const { allJournals }: NoteState = yield select(state => state.get('note'))
    const newValue = allJournals.slice()
    newValue.push(value)
    yield put(push(`/o/journal/${value._id}`))
    yield put(actions.setAllJournals(newValue))
  } catch (e) {
    console.error(e)
  }
}

function* readJournal(jourId: string) {
  try {
    const value = yield call(PouchConn.journal.readOne, jourId)
    yield put(actions.setCurJournal(value))
  } catch (e) {
    if (e.status === 404) yield put(push(`/o`))
    console.error(e)
  }
}

function* readNote(noteId: string) {
  try {
    const value: NoteObject = yield call(PouchConn.note.readOne, noteId)
    const { curJournal }: NoteState = yield select(state => state.get('note'))
    if (value.journalId !== curJournal._id) yield call(readJournal, value.journalId)
    yield put(actions.setCurNote(value))
  } catch (e) {
    if (e.name === 'not_found') put(push(`/o`))
    console.error(e)
  }
}

function* updateJournal(payload: JournalEnhancedObject) {
  try {
    yield put(actions.setCurJournal(payload))
    if ('title' in payload || 'titleIcon' in payload) {
      const { allJournals, curJournal }: NoteState = yield select(state => state.get('note'))
      const newValue = allJournals.slice()
      const journalIndex = newValue.findIndex(x => x._id === curJournal._id)
      if ('title' in payload)
        newValue[journalIndex].title = payload.title
      if ('titleIcon' in payload)
        newValue[journalIndex].titleIcon = payload.titleIcon
      yield put(actions.setAllJournals(newValue))
    }
  } catch (e) {
    console.error(e)
  }
}

function* updateNote(payload: NoteObject) {
  try {
    yield put(actions.setCurNote(payload))
  } catch (e) {
    console.error(e)
  }
}

function* updateAll(payload: UpdateAllPayload) {
  try {
    yield put(actions.setCurAll(payload))
  } catch (e) {
    console.error(e)
  }
}

function* createNote(payload: string) {
  try {
    const value = yield call(PouchConn.note.create, payload)
    yield put({ type: actions.SET_CUR_NOTE, payload: value })
    yield put(push(`/o/editor/${value._id}`))
  } catch (e) {
    console.error(e)
  }
}
export default noteSagaWatcher
