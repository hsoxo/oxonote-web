import { dbNote, dbJournal } from './config'
import { defaultNote } from "@/types/defaults/note";
import { JournalObject } from "@/types/journal";
import { NoteObject } from "@/types/note";

export const create = async (jourId: string) => {
  let journal: JournalObject = await dbJournal.get(jourId)
  let note: NoteObject = await defaultNote(journal.jourAttrs)
  note.journalId = jourId
  await dbNote.put(note)
  return note
}


export const readOne = async (noteId: string) => {
  const nInfo: NoteObject = await dbNote.get(noteId)
  return nInfo
}

export const update = async (noteId: string, data: object) => {
  dbNote.get(noteId)
    .then(doc => {
      dbNote.put({
        ...doc,
        ...data,
        _id: noteId,
        _rev: doc._rev,
      })
    })
    .then(() => Promise.resolve())
    .catch(e => console.error(e))
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

