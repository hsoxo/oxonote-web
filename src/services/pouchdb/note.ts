import PDB, { dbNote, dbJournal } from './config'
import { JournalAttribute, JournalEnhancedObject, JournalObject, JournalView } from "@/types/journal";
import { NoteContent, NoteObject, NoteSummaryObject } from "@/types/note";
import { newNote, newNoteContent } from "./Note/default";

export const create = async (journalId: string) => {
  let journal: JournalObject = await PDB.get(journalId)
  let note: NoteObject = await newNote(journal)
  let noteContent = await newNoteContent(note._id)
  await PDB.bulkDocs([note, noteContent])
  return note
}

export const readOne = async (noteId: string) => {
  const noteDoc = await PDB.get(noteId)
  const noteContent = await PDB.get(`${noteId}-C`)
  const jourId = noteId.slice(0, 12)
  const journalAttrs = await PDB.allDocs({
    include_docs: true,
    startkey: `${jourId}-A-`,
    endkey: `${jourId}-A-\ufff0`,
  })
  if (noteDoc && noteContent)
    return {
      note: noteDoc,
      content: noteContent,
      journalAttrs: journalAttrs.rows.map(x => x.doc)
    }
}

export const update = async (noteId: string, data: object) => {
  const doc = await PDB.get(noteId)
  await PDB.put({
    ...doc,
    ...data,
    _rev: doc._rev
  })
}

export const remove = async (noteId:string) => {
  dbNote.get(noteId)
    .then(doc => {
      dbNote.put({
        ...doc,
        deleted: 1,
        _id: noteId,
        _rev: doc._rev,
      })
    })
    .then(() => Promise.resolve())
    .catch(e => console.error(e))
}

