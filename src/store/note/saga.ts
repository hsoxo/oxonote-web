import {call, fork, put, select, take, throttle} from 'redux-saga/effects'
import PouchConn from '@/services/pouchdb'
import {push} from 'connected-react-router'

import * as ACT from './actions'
import {NoteState} from '@/types/states'
import {NoteContent} from "@/types/note";
import {setAllJournalInfo} from "@/store/journal/actions";

const SAGA_ACTIONS = Object.entries(ACT).filter(x => x[0].startsWith('SAGA')).map(x => x[1])

export function* noteSaveSW() {
  yield throttle(1000, ACT.SAVE_TO_POUCH, saveToPouch)
}

function* noteSW() {
  while (true) {
    const action: NoteSagaAction = yield take(SAGA_ACTIONS)
    console.log(
      `%c Note Saga: ${action.type}: ${JSON.stringify(action)}`,
      'color: #f0c002'
    )
    switch (action.type) {
      case ACT.SAGA_CREATE_NOTE: {
        yield fork(createNote, action.journalId); break;
      }
      case ACT.SAGA_READ_NOTE: {
        yield fork(readNote, action.noteId); break;
      }
      case ACT.SAGA_UPDATE_INFO: {
        yield fork(updateNoteInfo, action.payload); break;
      }
      case ACT.SAGA_UPDATE_CONTENT: {
        yield fork(updateNoteContent, action.content); break;
      }
      case ACT.SAGA_CREATE_ATTRIBUTE: {
        yield fork(createNoteAttribute, action.noteId, action.attrType, action.label); break;
      }
      case ACT.SAGA_UPDATE_ATTRIBUTE_TYPE: {
        yield fork(updateNoteAttributeType, action.attrId, action.newType); break;
      }
      case ACT.SAGA_UPDATE_ATTRIBUTE_TITLE: {
        yield fork(updateNoteAttributeTitle, action.attrId, action.newTitle); break;
      }
      case ACT.SAGA_UPDATE_ATTRIBUTE_VALUE: {
        yield fork(updateNoteAttributeValue, action.noteId, action.attrId, action.newValue); break;
      }
      case ACT.SAGA_UPDATE_ATTRIBUTE_SELECT_RANGE: {
        yield fork(updateNoteAttributeSelectRange, action.attrId, action.newRange); break;
      }
      case ACT.SAGA_REMOVE_ATTRIBUTE: {
        yield fork(removeNoteAttribute, action.attrId); break;
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

type CreateNote = { type: typeof ACT.SAGA_CREATE_NOTE, journalId: string }
function* createNote(journalId: string) {
  try {
    const value = yield call(PouchConn.note.create, journalId)
    yield put(push(`/o/editor/${value._id}`))
  } catch (e) {
    console.error(e)
  }
}

type ReadNote = { type: typeof ACT.SAGA_READ_NOTE, noteId: string }
function* readNote(noteId: string) {
  try {
    const value = yield call(PouchConn.note.readOne, noteId)
    yield put(ACT.setNoteAll(value))
  } catch (e) {
    if (e.name === 'not_found') put(push(`/o`))
    console.error(e)
  }
}

interface PartialNoteObject {
  journalId?: string
  title?: string
  titleIcon?: string
  bannerImg?: string
  createdTime?: number
  createdUser?: string
  modifiedTime?: number
  modifiedUser?: string
}
type UpdateNoteInfo = { type: typeof ACT.SAGA_UPDATE_INFO, payload: PartialNoteObject }
function* updateNoteInfo(payload: PartialNoteObject) {
  try {
    const { note: { _id } } = yield select(state => state.get('note'))
    yield call(PouchConn.note.update, _id, payload)
    yield put(ACT.setNoteInfo(payload))
  } catch (e) {
    console.error(e)
  }
}

type UpdateNoteContent = { type: typeof ACT.SAGA_UPDATE_CONTENT, content: NoteContent }
function* updateNoteContent(content: any) {
  try {
    const { note: { _id } } = yield select(state => state.get('note'))
    yield call(PouchConn.note.content.update, _id, content)
  } catch (e) {
    console.error(e)
  }
}

type CreateNoteAttribute = { type: typeof ACT.SAGA_CREATE_ATTRIBUTE, noteId: string, attrType: string, label: string }
function* createNoteAttribute(noteId: string, attrType: string, label: string) {
  try {
    yield call(PouchConn.note.attribute.create, noteId, attrType, label)
    yield call(refreshNote)
  } catch (e) {
    console.error(e)
  }
}

type UpdateNoteAttributeType = { type: typeof ACT.SAGA_UPDATE_ATTRIBUTE_TYPE, attrId: string, newType: string }
function* updateNoteAttributeType(attrId: string, newType: string) {
  try {
    yield call(PouchConn.journal.attr.update, attrId, 'type', newType)
    yield call(refreshNote)
  } catch (e) {
    console.error(e)
  }
}

type UpdateNoteAttributeTitle = { type: typeof ACT.SAGA_UPDATE_ATTRIBUTE_TITLE, attrId: string, newTitle: string }
function* updateNoteAttributeTitle(attrId: string, newTitle: string) {
  try {
    yield call(PouchConn.journal.attr.update, attrId, 'title', newTitle)
    yield call(refreshNote)
  } catch (e) {
    console.error(e)
  }
}

type UpdateNoteAttributeValue = { type: typeof ACT.SAGA_UPDATE_ATTRIBUTE_VALUE, noteId: string, attrId: string, newValue: any }
function* updateNoteAttributeValue(noteId: string, attrId: string, newValue: any) {
  try {
    yield call(PouchConn.note.attribute.updateValue, noteId, attrId, newValue)
    yield call(refreshNote)
  } catch (e) {
    console.error(e)
  }
}

type UpdateNoteAttributeSelectRange = { type: typeof ACT.SAGA_UPDATE_ATTRIBUTE_SELECT_RANGE, attrId: string, newRange: any }
function* updateNoteAttributeSelectRange(attrId: string, newRange: any) {
  try {
    yield call(PouchConn.journal.attr.update, attrId, 'range', newRange)
    yield call(refreshNote)
  } catch (e) {
    console.error(e)
  }
}

type RemoveNoteAttribute = { type: typeof ACT.SAGA_REMOVE_ATTRIBUTE, attrId: string }
function* removeNoteAttribute(attrId: string) {
  try {
    yield call(PouchConn.journal.attr.remove, attrId)
    yield call(refreshNote)
  } catch (e) {
    console.error(e)
  }
}

export type NoteSagaAction = CreateNote | ReadNote | UpdateNoteInfo | UpdateNoteContent | CreateNoteAttribute | UpdateNoteAttributeType |
  UpdateNoteAttributeTitle | UpdateNoteAttributeValue | UpdateNoteAttributeSelectRange | RemoveNoteAttribute

function* refreshNote() {
  try {
    const { note: { _id } } = yield select(state => state.get('note'))
    if (_id) {
      const value = yield call(PouchConn.note.readOne, _id)
      yield put(ACT.setNoteAll(value))
    }
    const { journal: { _id: jid } } = yield select(state => state.get('journal'))
    if (jid) {
      const value = yield call(PouchConn.journal.readOne, jid)
      yield put(setAllJournalInfo(value))
    }
  } catch (e) {
    if (e.name === 'not_found') put(push(`/o`))
    console.error(e)
  }
}

export default noteSW
