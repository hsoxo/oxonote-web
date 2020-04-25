import {AttributeRangeType, JournalAttribute, JournalEnhancedObject, JournalObject, JournalView} from "@/types/journal";
import {JournalState} from "@/types/states";
import {NoteObject} from "@/types/note";

export const SET_JOURNAL_ALL = 'JOURNAL/SET_ALL'
export const SET_JOURNAL_INFO = 'JOURNAL/SET_JOURNAL'
export const SET_JOURNAL_ATTRS = 'JOURNAL/SET_ATTRS'
export const SET_JOURNAL_VIEWS = 'JOURNAL/SET_VIEWS'
export const SET_JOURNAL_NOTES = 'JOURNAL/SET_NOTES'
export const SAVE_TO_POUCH = 'JOURNAL/SAVE_CHANGING_TO_POUCH'

interface PartialJournalState {
  journal?: JournalObject
  attrs?: Array<JournalAttribute>
  views?: Array<JournalView>
  notes?: Array<NoteObject>
}
type SetAllJournalInfo = { type: typeof SET_JOURNAL_ALL, payload: PartialJournalState }
export const setAllJournalInfo = (payload: PartialJournalState): JournalActions =>
  ({ type: SET_JOURNAL_ALL, payload })

type SetJournalInfo = { type: typeof SET_JOURNAL_INFO, payload: JournalObject }
export const setJournalInfo = (payload: JournalObject): JournalActions =>
  ({ type: SET_JOURNAL_INFO, payload })

type SetJournalAttrs = { type: typeof SET_JOURNAL_ATTRS, payload: Array<JournalAttribute> }
export const setJournalAttrs = (payload: Array<JournalAttribute>): JournalActions =>
  ({ type: SET_JOURNAL_ATTRS, payload })

type SetJournalViews = { type: typeof SET_JOURNAL_VIEWS, payload: Array<JournalView> }
export const setJournalViews = (payload: Array<JournalView>): JournalActions =>
  ({ type: SET_JOURNAL_VIEWS, payload })

type SetJournalNotes = { type: typeof SET_JOURNAL_NOTES, payload: Array<NoteObject> }
export const setJournalNotes = (payload: Array<NoteObject>): JournalActions =>
  ({ type: SET_JOURNAL_NOTES, payload })

export type JournalActions = SetAllJournalInfo | SetJournalInfo | SetJournalAttrs |
  SetJournalViews | SetJournalNotes


export const SAGA_JOURNAL_CREATE = 'SAGA/JOURNAL/CREATE_JOURNAL'
export const SAGA_JOURNAL_READ = 'SAGA/JOURNAL/READ_JOURNAL'
export const SAGA_UPDATE_INFO = 'SAGA/JOURNAL/UPDATE_JOURNAL'
export const SAGA_JOURNAL_DELETE = 'SAGA/JOURNAL/DELETE_JOURNAL'
export const SAGA_UPDATE_ATTR_RANGE = 'SAGA/JOURNAL/UPDATE_ATTR_RANGE'
export const SAGA_UPDATE_VIEW_ATTR_SETTING = 'SAGA/JOURNAL/SAGA_UPDATE_VIEW_ATTR_SETTING'



const JOURNAL_ACTIONS = {
  SAGA_JOURNAL_CREATE,
  SAGA_JOURNAL_READ,
  SAGA_UPDATE_INFO,
  SAGA_JOURNAL_DELETE,
  SAGA_UPDATE_ATTR_RANGE,
}

export default JOURNAL_ACTIONS