import { JournalType, JournalEnhancedType } from "@/types/journal";
import { NoteType } from "@/types/note";
import {
    SET_CUR_JOURNAL,
    SET_CUR_NOTE,
    SET_ALL_JOURNALS
} from "./action-declares";

export interface NoteState {
    allJournals: Array<JournalType>
    curJournal: JournalEnhancedType
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

export type NoteActionTypes = SetAllJournals | SetCurJournal | SetCurNote