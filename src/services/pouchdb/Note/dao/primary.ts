import {NoteObject} from "@/types/note";
import {newNote, newNoteContent} from "@/services/pouchdb/Note/default";
import {JournalAttribute} from "@/types/journal";
import notePropTypes from "@/types/constants/note-attributes";
import getConn from "@/services/pouchdb/config";
const journalService = require('../../Journal/index')

export const create = async (journalId: string) => {
  const PDB = getConn()
  let journalDocs = await journalService.readOne(journalId)
  if (journalDocs) {
    let note: NoteObject = await newNote(journalDocs.journal, journalDocs.attrs)
    let noteContent = await newNoteContent(note._id)
    await PDB.bulkDocs([note, noteContent])
    return note
  }
}

export const readOne = async (noteId: string) => {
  const PDB = getConn()
  const noteDoc: NoteObject = await PDB.get(noteId)
  const noteContent = await PDB.get(`${noteId}-C`)
  const journalId = noteDoc.journalId
  const journalDoc = await PDB.get(journalId)
  const journalAttrDocs = await PDB.allDocs({
    include_docs: true,
    startkey: `${journalId}-A-`,
    endkey: `${journalId}-A-\ufff0`,
  })
  const journalAttrs = journalAttrDocs.rows.map(x => x.doc) as unknown as Array<JournalAttribute>

  const oriLength = noteDoc.attributes.length
  let attrModified = false
  journalAttrs.forEach(jAttr => {
    const noteAttr = noteDoc.attributes.find(x => x.attrId === jAttr._id)
    if (!noteAttr) {
      noteDoc.attributes.push({
        attrId: jAttr._id,
        value: notePropTypes[jAttr.type].defaultValue()
      })
      attrModified = true
    }
  })
  noteDoc.attributes = noteDoc.attributes
    .filter(x => journalAttrs.some(y => y._id === x.attrId))

  if (attrModified || noteDoc.attributes.length !== oriLength) await PDB.put(noteDoc)

  if (noteDoc && noteContent)
    return {
      note: noteDoc,
      content: noteContent,
      journal: journalDoc,
      journalAttrs
    }
}

export const update = async (noteId: string, data: object) => {
  const PDB = getConn()
  const doc = await PDB.get(noteId)
  await PDB.put({
    ...doc,
    ...data,
    _rev: doc._rev
  })
}