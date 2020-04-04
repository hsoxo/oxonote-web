import { dbNote, dbJournal } from './config'

import { defaultJournal } from "@/constants/data-structure/journal";
import { JournalType, JournalEnhancedType } from "@/types/journal";
import { NoteShortType } from "@/types/note";

export const create = async () => {
  const nb = await defaultJournal()
  console.log(nb)
  // @ts-ignore
  await dbJournal.put(nb)
  return nb
}

export const readAll = async () => {
  const docs = await dbJournal.find({
    selector: {},
  })
  return docs.docs
}

export const readOne = async (jourId: string) => {
  let docs: JournalEnhancedType = await dbJournal.get(jourId)
  const notes = await dbNote.find({
    selector: { journalId: jourId },
    fields: ['_id', 'title', 'titleIcon', 'createdTime', 'createdUser', 'modifiedTime', 'modifiedUser', 'attributes'],
  })
  // @ts-ignore
  docs.notes = notes.docs
  return docs
}

export const find = dbJournal.find

export const update = async (dbId: string, value: object) => {
  const doc = await dbJournal.get(dbId)
  const newDoc = {
    ...doc,
    ...value,
    _id: dbId,
    _rev: doc._rev,
  }
  await dbJournal.put(newDoc)
  return newDoc
}
