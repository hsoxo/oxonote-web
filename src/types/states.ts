import { JournalObject, JournalEnhancedObject } from "@/types/journal";
import { NoteObject } from "@/types/note";

export interface NoteState {
    allJournals: Array<JournalObject>
    journalChanged: boolean
    curJournal: JournalEnhancedObject
    noteChanged: boolean
    curNote: NoteObject
}

