import {JournalEnhancedObject, JournalObject} from "@/types/journal";
import {NoteObject} from "@/types/note";

export const SET_ALL_JOURNALS = 'NOTES/SET_ALL_JOURNALS'
export const SET_CUR_JOURNAL = 'NOTES/SET_CUR_JOURNAL'
export const SET_CUR_NOTE = 'NOTES/SET_CUR_NOTE'
export const SET_CUR_BOTH = 'NOTES/SET_CUR_BOTH'
export const SAVE_TO_POUCH = 'NOTES/SAVE_CHANGING_TO_POUCH'

interface SetAllJournals {
    type: typeof SET_ALL_JOURNALS
    payload: Array<JournalObject>
}
export const setAllJournals = (payload: Array<JournalObject>): NoteActionTypes =>
  ({ type: SET_ALL_JOURNALS, payload })

interface SetCurJournal {
    type: typeof SET_CUR_JOURNAL
    payload: JournalEnhancedObject
}
export const setCurJournal = (payload: JournalEnhancedObject): NoteActionTypes =>
  ({ type: SET_CUR_JOURNAL, payload })

interface SetCurNote {
    type: typeof SET_CUR_NOTE
    payload: NoteObject
}
export const setCurNote = (payload: NoteObject): NoteActionTypes =>
  ({ type: SET_CUR_NOTE, payload })

export interface UpdateAllPayload {
    journal: JournalEnhancedObject
    note: NoteObject
}
interface SetCurAll {
    type: typeof SET_CUR_BOTH
    payload: UpdateAllPayload
}
export const setCurAll = (payload: UpdateAllPayload): NoteActionTypes =>
  ({ type: SET_CUR_BOTH, payload })


export type NoteActionTypes = SetAllJournals | SetCurJournal | SetCurNote | SetCurAll


const NOTE_ACT = {
  SAGA_READ_ALL_JOURNALS: 'SAGA/NOTES/READ_ALL_JOURNALS',
  SAGA_CREATE_JOURNAL: 'SAGA/NOTES/CREATE_JOURNAL',
  SAGA_READ_JOURNAL: 'SAGA/NOTES/READ_JOURNAL',
  SAGA_UPDATE_JOURNAL: 'SAGA/NOTES/UPDATE_JOURNAL',
  SAGA_DELETE_JOURNAL: 'SAGA/NOTES/DELETE_JOURNAL',
  SAGA_CREATE_NOTE: 'SAGA/NOTES/CREATE_NOTE',
  SAGA_READ_NOTE: 'SAGA/NOTES/READ_NOTE',
  SAGA_UPDATE_NOTE: 'SAGA/NOTES/UPDATE_NOTE',
  SAGA_DELETE_NOTE: 'SAGA/NOTES/DELETE_NOTE',
  SAGA_UPDATE_ALL: 'SAGA/NOTES/UPDATE_ALL',
}

export default NOTE_ACT