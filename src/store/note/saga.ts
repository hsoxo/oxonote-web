import { put, take, call, fork, throttle, select } from 'redux-saga/effects'
import PouchConn from '@/services/pouchdb'
import { push } from 'connected-react-router'

import * as actions from './actions'
import {NoteState} from '@/types/states'
import {NoteObject} from "@/types/note";
import * as ACT from "./actions";

export function* noteSaveSW() {
  yield throttle(1000, actions.SAVE_TO_POUCH, saveToPouch)
}

function* noteSW() {
  while (true) {
    const action = yield take(Object.values(actions.default))
    console.log(
      `%c Note Saga: ${action.type}: ${JSON.stringify(action)}`,
      'color: #f0c002'
    )
    switch (action.type) {
      case actions.default.SAGA_CREATE_NOTE: {
        yield fork(createNote, action.payload); break; }

      case actions.default.SAGA_READ_NOTE: {
        yield fork(readNote, action.payload); break; }

      case actions.default.SAGA_UPDATE_NOTE_INFO: {
        yield fork(updateNote, action.payload)
        yield put({ type: actions.SAVE_TO_POUCH })
        break;
      }

    }
  }
}

function* saveToPouch() {
  try {
    const {
      note
    }: NoteState = yield select(state => state.get('note'))
    yield fork(PouchConn.note.update, note._id, note)
  } catch (e) {
    console.log(e)
  }
}

function* createNote(journalId: string) {
  try {
    const value = yield call(PouchConn.note.create, journalId)
    yield put(push(`/o/editor/${value._id}`))
  } catch (e) {
    console.error(e)
  }
}

function* readNote(noteId: string) {
  try {
    const value = yield call(PouchConn.note.readOne, noteId)
    yield put(ACT.setNoteAll(value))
  } catch (e) {
    if (e.name === 'not_found') put(push(`/o`))
    console.error(e)
  }
}

function* updateNote(payload: NoteObject) {
  try {
    yield put(actions.setNoteInfo(payload))
  } catch (e) {
    console.error(e)
  }
}

export default noteSW
