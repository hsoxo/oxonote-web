import { dbNote, dbJournal } from './config'

import { defaultJournal } from "@/constants/data-structure/journal";
import {JournalType, JournalEnhancedType, JournalAttributeObject} from "@/types/journal";
import {NoteAttribute, NoteShortType, NoteType} from "@/types/note";
import notePropTypes from "@/constants/note-attributes";
import FindResponse = PouchDB.Find.FindResponse;

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
  let docs = await dbJournal.get<JournalEnhancedType>(jourId)
  const notes = await dbNote.find({
    selector: { journalId: jourId },
    fields: ['_id', 'title', 'titleIcon', 'createdTime', 'createdUser', 'modifiedTime', 'modifiedUser', 'attributes'],
  })
  // @ts-ignore
  docs.notes = notes.docs
  return docs
}

export const find = dbJournal.find


export const update = async (jourId: string, value: object) => {
  const doc = await dbJournal.get(jourId)
  const newDoc = {
    ...doc,
    ...value,
    _id: jourId,
    _rev: doc._rev,
  }
  await dbJournal.put(newDoc)
  if ('jourAttrs' in value) {
    // @ts-ignore
    const { jourAttrs } = value
    const curJourAttrs: { [attrId:string]: JournalAttributeObject } = jourAttrs.reduce((acc: any, cur: JournalAttributeObject) => {
      acc[cur.attrId] = cur
      return acc
    }, {})
    const notes = await dbNote.find({
      selector: { journalId: jourId },
      fields: ['_id', 'attributes'],
    })
    const noteDocs = <Array<{ _id: string, attributes: Array<NoteAttribute>}>><unknown>notes.docs
    for (const { _id: noteId, attributes } of noteDocs) {
      const newAttributes: Array<NoteAttribute> = []
      Object.entries(curJourAttrs).forEach(([attrId, attrJourInfo]) => {
        const curNoteAttrIndex = attributes.findIndex(x => x.attrId === attrId)
        if (curNoteAttrIndex >= 0) {
          newAttributes.push({
            attrId: attrId,
            value: attributes[curNoteAttrIndex].value
          })
        } else {
          newAttributes.push({
            attrId: attrId,
            value: notePropTypes[attrJourInfo.type].defaultValue()
          })
        }
      })
      newAttributes.sort((a, b) =>
        Object.keys(curJourAttrs).indexOf(a.attrId) - Object.keys(curJourAttrs).indexOf(b.attrId))
      const noteDoc = await dbNote.get(noteId)
      const newNoteDoc = {
        ...noteDoc,
        attributes: newAttributes,
        _id: noteId,
        _rev: noteDoc._rev,
      }
      await dbNote.put(newNoteDoc)
    }
  }
  return newDoc
}
