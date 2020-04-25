import {NoteContent, NoteObject} from "@/types/note";

export const SAVE_TO_POUCH = 'NOTE/SAVE_CHANGING_TO_POUCH'
export const SET_NOTE_ALL = 'NOTE/SET_ALL'
export const SET_NOTE_INFO = 'NOTE/SET_JOURNAL'
export const SET_NOTE_CONTENT = 'NOTE/SET_ATTRS'

interface PartialNoteState {
  note?: NoteObject
  content?: NoteContent
}
type SetNoteAll = { type: typeof SET_NOTE_ALL, payload: PartialNoteState }
export const setNoteAll = (payload: PartialNoteState): NoteActionTypes =>
  ({ type: SET_NOTE_ALL, payload })

type SetNoteInfo = { type: typeof SET_NOTE_INFO, payload: any }
export const setNoteInfo = (payload: any): NoteActionTypes =>
  ({ type: SET_NOTE_INFO, payload })

type SetNoteContent = { type: typeof SET_NOTE_CONTENT, payload: NoteContent }
export const setNoteContent = (payload: NoteContent): NoteActionTypes =>
  ({ type: SET_NOTE_CONTENT, payload })

export type NoteActionTypes = SetNoteAll | SetNoteInfo | SetNoteContent

export const SAGA_CREATE_NOTE = 'SAGA/NOTE/CREATE_NOTE'
export const SAGA_READ_NOTE = 'SAGA/NOTE/READ_NOTE'
export const SAGA_UPDATE_CONTENT = 'SAGA/NOTE/UPDATE_CONTENT'
export const SAGA_UPDATE_INFO = 'SAGA/NOTE/UPDATE_INFO'
export const SAGA_CREATE_ATTRIBUTE = 'SAGA/NOTE/CREATE_ATTRIBUTE'
export const SAGA_UPDATE_ATTRIBUTE_VALUE = 'SAGA/NOTE/UPDATE_ATTRIBUTE_VALUE'
export const SAGA_UPDATE_ATTRIBUTE_TITLE = 'SAGA/NOTE/UPDATE_ATTRIBUTE_TITLE'
export const SAGA_UPDATE_ATTRIBUTE_TYPE = 'SAGA/NOTE/UPDATE_ATTRIBUTE_TYPE'
export const SAGA_UPDATE_ATTRIBUTE_SELECT_RANGE = 'SAGA/NOTE/SAGA_UPDATE_ATTRIBUTE_SELECT_RANGE'
export const SAGA_REMOVE_ATTRIBUTE = 'SAGA/NOTE/export const SAGA_REMOVE_ATTRIBUTE'



