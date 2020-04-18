import {NoteContent, NoteObject} from "@/types/note";

export const SAVE_TO_POUCH = 'NOTE/SAVE_CHANGING_TO_POUCH'
export const SET_NOTE_ALL = 'JOURNAL/SET_ALL'
export const SET_NOTE_INFO = 'JOURNAL/SET_JOURNAL'
export const SET_NOTE_CONTENT = 'JOURNAL/SET_ATTRS'

interface PartialNoteState {
  note?: NoteObject
  content?: NoteContent
}
type SetNoteAll = { type: typeof SET_NOTE_ALL, payload: PartialNoteState }
export const setNoteAll = (payload: PartialNoteState): NoteActionTypes =>
  ({ type: SET_NOTE_ALL, payload })

type SetNoteInfo = { type: typeof SET_NOTE_INFO, payload: NoteObject }
export const setNoteInfo = (payload: NoteObject): NoteActionTypes =>
  ({ type: SET_NOTE_INFO, payload })

type SetNoteContent = { type: typeof SET_NOTE_CONTENT, payload: NoteContent }
export const setNoteContent = (payload: NoteContent): NoteActionTypes =>
  ({ type: SET_NOTE_CONTENT, payload })

export type NoteActionTypes = SetNoteAll | SetNoteInfo | SetNoteContent


const NOTE_ACT = {
  SAGA_READ_NOTE: 'SAGA/NOTE/READ_NOTE',
  SAGA_UPDATE_CONTENT: 'SAGA/NOTE/UPDATE_CONTENT',
  SAGA_UPDATE_NOTE_INFO: 'SAGA/NOTE/UPDATE_NOTE_INFO',
  SAGA_UPDATE_NOTE_ATTRIBUTE: 'SAGA/NOTE/UPDATE_NOTE_ATTRIBUTE',

  SAGA_READ_ALL_JOURNALS: 'SAGA/NOTE/READ_ALL_JOURNALS',
  SAGA_CREATE_JOURNAL: 'SAGA/NOTE/CREATE_JOURNAL',
  SAGA_READ_JOURNAL: 'SAGA/NOTE/READ_JOURNAL',
  SAGA_UPDATE_JOURNAL: 'SAGA/NOTE/UPDATE_JOURNAL',
  SAGA_DELETE_JOURNAL: 'SAGA/NOTE/DELETE_JOURNAL',
  SAGA_CREATE_NOTE: 'SAGA/NOTE/CREATE_NOTE',
  SAGA_UPDATE_NOTE: 'SAGA/NOTE/UPDATE_NOTE',
  SAGA_DELETE_NOTE: 'SAGA/NOTE/DELETE_NOTE',
  SAGA_UPDATE_ALL: 'SAGA/NOTE/UPDATE_ALL',
}

export default NOTE_ACT