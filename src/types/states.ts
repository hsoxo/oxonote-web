import {JournalObject, JournalEnhancedObject, JournalView, JournalAttribute} from "@/types/journal";
import {NoteContent, NoteObject} from "@/types/note";

export interface NoteState {
    noteChanged: boolean
    note: NoteObject
    content: NoteContent
    journalAttrs: Array<JournalAttribute>

    allJournals: Array<JournalObject>
    journalChanged: boolean
    curJournal: JournalEnhancedObject
    curNote: NoteObject
}

export interface JournalState {
    journalChanged: boolean
    journal: JournalObject
    attrs: Array<JournalAttribute>
    views: Array<JournalView>
    notes: Array<NoteObject>
}

