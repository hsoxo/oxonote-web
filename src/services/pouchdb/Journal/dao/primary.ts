import {
  newJournal,
  newJournalAttribute,
  newJournalView
} from '@/services/pouchdb/Journal/default'
import {
  CREATED_TIME,
  CREATED_USER,
  UPDATED_TIME,
  UPDATED_USER
} from '@/types/constants/note-attributes'
import { JournalAttribute, JournalObject, JournalView } from '@/types/journal'
import { NoteObject } from '@/types/note'
import getConn from '@/services/pouchdb/config'

export const create = async () => {
  const PDB = getConn()
  const journalDoc = await newJournal()
  const viewDoc = await newJournalView(journalDoc._id)
  const attrsDocs = [
    await newJournalAttribute(journalDoc._id, CREATED_TIME, '创建时间'),
    await newJournalAttribute(journalDoc._id, UPDATED_TIME, '最后修改时间'),
    await newJournalAttribute(journalDoc._id, CREATED_USER, '创建人'),
    await newJournalAttribute(journalDoc._id, UPDATED_USER, '最后修改人')
  ]
  journalDoc.attrIds = attrsDocs.map(x => x._id)
  journalDoc.viewIds = [viewDoc._id]
  // @ts-ignore
  await PDB.bulkDocs([journalDoc, viewDoc, ...attrsDocs])
  return journalDoc
}

export const readAll = async () => {
  const PDB = getConn()
  if (!PDB) return []
  const docs = await PDB.allDocs({
    include_docs: true,
    startkey: 'D-',
    endkey: 'D-\ufff0'
  })
  const journals = (docs.rows
    .filter(x => x.id.match(/^D-.{10}$/))
    .map(x => x.doc) as unknown) as Array<JournalObject>
  for (const journal of journals) {
    const curJournalRelations = docs.rows.filter(x =>
      x.id.startsWith(journal._id)
    )

    journal.views = (curJournalRelations
      .filter(x => x.id.startsWith(`${journal._id}-V-`))
      .map(x => x.doc) as unknown) as Array<JournalView>
    journal.views.sort(
      (a, b) => journal.viewIds.indexOf(a._id) - journal.viewIds.indexOf(b._id)
    )
  }
  return journals
}

interface ReadOneJournalResult {
  journal: JournalObject
  attrs: Array<JournalAttribute>
  views: Array<JournalView>
  notes: Array<NoteObject>
}
export const readOne = async (jourId: string) => {
  const PDB = getConn()
  const docs = await PDB.allDocs({
    include_docs: true,
    startkey: jourId,
    endkey: `${jourId}\ufff0`
  })
  let journalDoc = docs.rows.find(x => x.id === jourId)

  if (journalDoc) {
    const journal = (journalDoc.doc as unknown) as JournalObject
    const noteDocs = await PDB.find({
      selector: { journalId: journal._id }
    })
    const result: ReadOneJournalResult = {
      journal,
      attrs: (docs.rows
        .filter(x => x.id.startsWith(`${journal._id}-A-`))
        .map(x => x.doc) as unknown) as Array<JournalAttribute>,
      views: (docs.rows
        .filter(x => x.id.startsWith(`${journal._id}-V-`))
        .map(x => x.doc) as unknown) as Array<JournalView>,
      notes: (noteDocs.docs as unknown) as Array<NoteObject>
    }
    return result
  }
  return
}

export const update = async (jourId: string, value: object) => {
  const PDB = getConn()
  const doc = await PDB.get(jourId)
  const newDoc = {
    ...doc,
    ...value,
    _rev: doc._rev
  }
  await PDB.put(newDoc)
  return newDoc
}
