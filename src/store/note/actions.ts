import {
    SET_ALL_JOURNALS,
    SET_CUR_JOURNAL,
    SET_CUR_NOTE,
} from "./action-declares";
import {
    NoteActionTypes
} from "./types";
import {JournalEnhancedType, JournalType} from "@/types/journal";
import {NoteType} from "@/types/note";

export function setAllJournals(payload: Array<JournalType>): NoteActionTypes {
    return {
        type: SET_ALL_JOURNALS,
        payload
    }
}

export function setCurJournal(payload: JournalEnhancedType): NoteActionTypes {
    return {
        type: SET_CUR_JOURNAL,
        payload
    }
}

export function setCurNote(payload: NoteType): NoteActionTypes {
    return {
        type: SET_CUR_NOTE,
        payload
    }
}

export function setCurBoth(payload: NoteType): NoteActionTypes {
    return {
        type: SET_CUR_NOTE,
        payload
    }
}
