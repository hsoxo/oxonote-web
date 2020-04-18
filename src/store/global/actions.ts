import {JournalObject} from "@/types/journal";

export const SET_TITLE = 'SET_TITLE'
export const SET_JOURNAL_LIST = 'READ_JOURNAL_LIST'

type SetTitle = { type: typeof SET_TITLE, payload: string}
export const setTitle = (title: string) => ({ type: SET_TITLE, title })

type SetJournals = { type: typeof SET_JOURNAL_LIST, payload: Array<JournalObject>}
export const setJournals = (payload: Array<JournalObject>) => ({ type: SET_JOURNAL_LIST, payload })


export type GlobalActionType = SetTitle | SetJournals

const GLOBAL_ACTIONS = {
  SAGA_LOAD_JOURNAL_LIST: 'SAGA/LOAD_JOURNAL_LIST'
}

export default GLOBAL_ACTIONS