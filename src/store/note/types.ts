import { JournalType, JournalEnhancedType } from "@/types/journal";
import { NoteType } from "@/types/note";
import {
    SET_CUR_JOURNAL,
    SET_CUR_NOTE,
    SET_ALL_JOURNALS, SET_CUR_BOTH
} from "./action-declares";

export interface NoteState {
    allJournals: Array<JournalType>
    journalChanged: boolean
    curJournal: JournalEnhancedType
    noteChanged: boolean
    curNote: NoteType
}

interface SetAllJournals {
    type: typeof SET_ALL_JOURNALS
    payload: Array<JournalType>
}
interface SetCurJournal {
    type: typeof SET_CUR_JOURNAL
    payload: JournalEnhancedType
}
interface SetCurNote {
    type: typeof SET_CUR_NOTE
    payload: NoteType
}

export interface UpdateAllPayload {
    journal: JournalEnhancedType
    note: NoteType
}

interface SetCurAll {
    type: typeof SET_CUR_BOTH
    payload: UpdateAllPayload
}

export type NoteActionTypes = SetAllJournals | SetCurJournal | SetCurNote | SetCurAll