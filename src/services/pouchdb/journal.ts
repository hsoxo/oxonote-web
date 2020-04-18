import PDB, { dbNote, dbJournal } from './config'

import { JournalObject, JournalEnhancedObject, JournalAttribute, JournalView } from "@/types/journal";
import {NoteAttribute, NoteObject, NoteSummaryObject} from "@/types/note";
import { newJournal, newJournalAttribute, newJournalView } from "@/services/pouchdb/Journal/default";
import notePropTypes from "@/types/constants/note-attributes";

export const create = async () => {
  const journalDoc = await newJournal()
  const viewDoc = await newJournalView(journalDoc._id)
  const attrsDocs = [
    await newJournalAttribute(journalDoc._id, '1', '创建时间'),
    await newJournalAttribute(journalDoc._id, '2', '最后修改时间'),
    await newJournalAttribute(journalDoc._id, '3', '创建人'),
    await newJournalAttribute(journalDoc._id, '4', '最后修改人'),
  ]
  // @ts-ignore
  await PDB.bulkDocs([journalDoc, viewDoc, ...attrsDocs])
  return journalDoc
}

export const readAll = async () => {
  const docs = await PDB.allDocs({
    include_docs: true,
    startkey: 'D-',
    endkey: 'D-\ufff0'
  })
  const journals = docs.rows.filter(x => x.id.match(/^D-.{10}$/)).map(x => x.doc) as unknown as Array<JournalObject>
  for (const journal of journals) {
    const curJournalRelations = docs.rows.filter(x => x.id.startsWith(journal._id))

    journal.jourAttrs = curJournalRelations
      .filter(x => x.id.startsWith(`${journal._id}-A-`))
      .map(x => x.doc) as unknown as Array<JournalAttribute>

    journal.views = curJournalRelations
      .filter(x => x.id.startsWith(`${journal._id}-V-`))
      .map(x => x.doc) as unknown as Array<JournalView>
  }
  return journals
}

interface ReadOneResult {
  journal: JournalObject
  attrs: Array<JournalAttribute>
  views: Array<JournalView>
  notes: Array<NoteObject>
}
export const readOne = async (jourId: string) => {
  const docs = await PDB.allDocs({
    include_docs: true,
    startkey: jourId,
    endkey: `${jourId}\ufff0`,
  })
  let journalDoc = docs.rows.find(x => x.id === jourId)
  if (journalDoc) {
    const journal = journalDoc.doc as unknown as JournalObject
    const result: ReadOneResult = {
      journal,
      attrs: docs.rows
        .filter(x => x.id.startsWith(`${journal._id}-A-`))
        .map(x => x.doc) as unknown as Array<JournalAttribute>,
      views: docs.rows
        .filter(x => x.id.startsWith(`${journal._id}-V-`))
        .map(x => x.doc) as unknown as Array<JournalView>,
      notes: docs.rows
        .filter(x => x.id.startsWith(`${journal._id}-N-`))
        .map(x => x.doc) as unknown as Array<NoteObject>,
    }
    return result
  }
  return
}

export const find = PDB.find


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
    const curJourAttrs: { [attrId:string]: JournalAttribute } = jourAttrs.reduce((acc: any, cur: JournalAttribute) => {
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

export const journalAttr = {
  create: async () => {

  },
  update: async () => {

  },
  delete: async () => {

  }
}

export const journalView = {
  create: async (journalId: string) => {
    const viewDoc = await newJournalView(journalId)
    // @ts-ignore
    await PDB.put(viewDoc)
    return viewDoc
  },
  update: async () => {

  },
  delete: async () => {

  }
}